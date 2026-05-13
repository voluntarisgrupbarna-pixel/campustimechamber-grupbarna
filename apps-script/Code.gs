/**
 * Campus Timechamber 2026 — Backend Apps Script
 *
 * NOTA: Las inscripciones formales del campus se gestionan en Fillout (plan
 * gratuito hasta 1000 envíos/mes) y viven en el dashboard de Fillout. Este
 * Apps Script SOLO procesa el flujo del mini-form "Habla con Ana por WhatsApp".
 * El handler doPost también acepta payloads tipo `inscripcion` por si en el
 * futuro migramos a un form custom propio (sin terceros).
 *
 * FLUJO ACTIVO — MINI-FORM "Habla con Ana por WhatsApp" (custom React, en la web/email)
 *   → registra en Sheet pestaña "WhatsApp Leads"
 *   → crea/actualiza contact en Brevo en lista BREVO_LIST_WHATSAPP
 *   → email a Ana con resumen del lead
 *   → devuelve {ok:true, waUrl:"https://wa.me/..."} para que el frontend abra WhatsApp
 *
 * Patrón: Apps Script + Sheet (backup) + Brevo (CRM) + email a Ana.
 *
 * Script Properties que hay que configurar:
 *   SHEET_ID                      — Google Sheet de backup
 *   BREVO_API_KEY                 — API key de Brevo
 *   BREVO_LIST_INSCRIPCIONES      — list ID de "Campus Timechamber 2026 — Inscritos"
 *   BREVO_LIST_WHATSAPP           — list ID de "Campus Timechamber 2026 — Leads WhatsApp"
 *   NOTIFY_EMAIL                  — email Ana donde llegan avisos
 *   ANA_WHATSAPP                  — teléfono Ana (formato: 34698425153, sin +)
 *   SHARED_SECRET                 — string secreto. Debe ir en query param ?secret=...
 *   ALLOWED_ORIGINS               — orígenes permitidos para CORS, separados por coma
 *                                   (ej: "https://timechamber.skywork.website,http://localhost:5173")
 */

const SHEET_INSCRIPCIONES = 'Inscripciones';
const SHEET_WHATSAPP = 'WhatsApp Leads';

const HEADERS_INSCRIPCIONES = [
  'timestamp', 'jotform_submission_id',
  'nombre_jugador', 'apellidos', 'fecha_nac', 'edad', 'genero',
  'semanas', 'email_tutor', 'nombre_tutor', 'telefono_tutor',
  'nivel', 'talla', 'notas', 'acepta_imagen', 'acepta_condiciones',
  'brevo_status', 'raw_payload'
];

const HEADERS_WHATSAPP = [
  'timestamp', 'nombre_tutor', 'telefono', 'email',
  'edad_jugador', 'semana_interes', 'como_nos_conociste', 'motivo',
  'origen', 'brevo_status', 'wa_url', 'raw_payload'
];

/* ───────────────────── doGet (health + counter) ───────────────────── */
function doGet(e) {
  try {
    const inscritos = countRows_(SHEET_INSCRIPCIONES);
    const leads = countRows_(SHEET_WHATSAPP);
    return jsonResponse_({
      ok: true,
      inscritos: inscritos,
      whatsapp_leads: leads,
      ts: new Date().toISOString()
    });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

/* ───────────────────── doPost (router por type) ───────────────────── */
function doPost(e) {
  try {
    if (!checkSecret_(e)) return jsonResponse_({ ok: false, error: 'unauthorized' });

    // Detectar formato: JSON body vs form-encoded (JotForm webhook nativo).
    // Apps Script POST desde fetch() suele venir con Content-Type=text/plain para evitar
    // preflight CORS — siempre intentamos parsear postData.contents como JSON primero.
    let body = {};
    if (e.postData && e.postData.contents) {
      const trimmed = e.postData.contents.trim();
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        body = safeJson_(trimmed) || {};
      }
    }
    if (!body || Object.keys(body).length === 0) {
      body = e.parameter || {};
    }

    // Discriminar tipo de flujo:
    //   type=whatsapp explícito (mini-form)
    //   formID o rawRequest presente → JotForm webhook
    //   default: JotForm
    const type = (body.type || (e.parameter && e.parameter.type) || '').toLowerCase();
    if (type === 'whatsapp') return handleWhatsapp_(body);
    if (type === 'jotform' || body.formID || body.rawRequest) return handleJotform_(body, e);

    // Fallback: si no sabemos qué es, lo guardamos en JotForm flow para no perder data
    return handleJotform_(body, e);
  } catch (err) {
    console.error('doPost error:', err, err.stack);
    notifyError_(err);
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

/* ───────────────────── flow 1: JotForm webhook ───────────────────── */
function handleJotform_(body, e) {
  const lead = parseJotformPayload_(body, e);
  const sheet = getOrCreateSheet_(SHEET_INSCRIPCIONES, HEADERS_INSCRIPCIONES);
  sheet.appendRow([
    new Date(),
    lead.submissionId || '',
    lead.nombreJugador || '',
    lead.apellidos || '',
    lead.fechaNac || '',
    lead.edad || '',
    lead.genero || '',
    (lead.semanas || []).join(', '),
    lead.emailTutor || '',
    lead.nombreTutor || '',
    lead.telefonoTutor || '',
    lead.nivel || '',
    lead.talla || '',
    lead.notas || '',
    lead.aceptaImagen ? 'sí' : '',
    lead.aceptaCondiciones ? 'sí' : '',
    '',
    JSON.stringify(body).slice(0, 49000)
  ]);
  const row = sheet.getLastRow();

  const brevoStatus = pushBrevo_({
    email: lead.emailTutor,
    listId: getProp_('BREVO_LIST_INSCRIPCIONES'),
    attributes: {
      NOMBRE: lead.nombreTutor,
      APELLIDOS: lead.apellidos,
      SMS: lead.telefonoTutor,
      WHATSAPP: lead.telefonoTutor,
      NOMBRE_JUGADOR: lead.nombreJugador,
      EDAD_JUGADOR: lead.edad,
      SEMANAS_CAMPUS: (lead.semanas || []).join(', '),
      NIVEL: lead.nivel,
      ORIGEN: 'JotForm — Inscripción formal',
      FECHA_INSCRIPCION: today_()
    }
  });
  sheet.getRange(row, HEADERS_INSCRIPCIONES.indexOf('brevo_status') + 1).setValue(brevoStatus);

  notifyAna_({
    subject: '🏀 Inscripción Campus — ' + (lead.nombreJugador || '?') + ' ' + (lead.apellidos || ''),
    lines: [
      '🆕 Inscripción formal recibida (JotForm)',
      '',
      'Jugador/a: ' + (lead.nombreJugador || '?') + ' ' + (lead.apellidos || ''),
      'Edad: ' + (lead.edad || '?'),
      'Semanas: ' + ((lead.semanas || []).join(', ') || '—'),
      '',
      'Tutor: ' + (lead.nombreTutor || '—'),
      'Email: ' + (lead.emailTutor || '—'),
      'Teléfono: ' + (lead.telefonoTutor || '—'),
      '',
      'Notas: ' + (lead.notas || '—'),
      'Brevo: ' + brevoStatus
    ]
  });

  return jsonResponse_({ ok: true, flow: 'jotform', row: row, brevo: brevoStatus });
}

/* ───────────────────── flow 2: WhatsApp mini-form ───────────────────── */
function handleWhatsapp_(body) {
  const lead = {
    nombre: String(body.nombre || '').trim(),
    telefono: String(body.telefono || '').trim(),
    email: String(body.email || '').trim(),
    edadJugador: String(body.edadJugador || body.edad || '').trim(),
    semana: String(body.semana || body.semanaInteres || '').trim(),
    como: String(body.como || body.comoNosConociste || '').trim(),
    motivo: String(body.motivo || '').trim(),
    origen: String(body.origen || 'web').trim()
  };

  if (!lead.nombre || !lead.telefono) {
    return jsonResponse_({ ok: false, error: 'nombre y teléfono son obligatorios' });
  }

  const waUrl = buildWhatsAppUrl_(lead);

  const sheet = getOrCreateSheet_(SHEET_WHATSAPP, HEADERS_WHATSAPP);
  sheet.appendRow([
    new Date(),
    lead.nombre,
    lead.telefono,
    lead.email,
    lead.edadJugador,
    lead.semana,
    lead.como,
    lead.motivo,
    lead.origen,
    '',
    waUrl,
    JSON.stringify(body).slice(0, 49000)
  ]);
  const row = sheet.getLastRow();

  const brevoStatus = pushBrevo_({
    email: lead.email || (lead.telefono + '@no-email.local'),
    listId: getProp_('BREVO_LIST_WHATSAPP'),
    attributes: {
      NOMBRE: lead.nombre,
      SMS: lead.telefono,
      WHATSAPP: lead.telefono,
      EDAD_JUGADOR: lead.edadJugador,
      SEMANAS_CAMPUS: lead.semana,
      COMO_NOS_CONOCISTE: lead.como,
      MOTIVO_CONTACTO: lead.motivo,
      ORIGEN: 'WhatsApp lead — ' + lead.origen,
      FECHA_INSCRIPCION: today_()
    }
  });
  sheet.getRange(row, HEADERS_WHATSAPP.indexOf('brevo_status') + 1).setValue(brevoStatus);

  notifyAna_({
    subject: '💬 Lead WhatsApp Campus — ' + lead.nombre,
    lines: [
      '🆕 Alguien quiere hablarte por WhatsApp',
      '',
      'Nombre: ' + lead.nombre,
      'Teléfono: ' + lead.telefono,
      'Email: ' + (lead.email || '—'),
      'Edad jugador/a: ' + (lead.edadJugador || '—'),
      'Semana interés: ' + (lead.semana || '—'),
      'Cómo nos conoció: ' + (lead.como || '—'),
      '',
      'Motivo:',
      lead.motivo || '—',
      '',
      'Origen: ' + lead.origen,
      'Brevo: ' + brevoStatus,
      '',
      '👉 Ya le abrió WhatsApp para escribirte. Puede que ya tengas mensaje.'
    ]
  });

  return jsonResponseWithCors_({ ok: true, flow: 'whatsapp', row: row, waUrl: waUrl, brevo: brevoStatus });
}

/* ───────────────────── parsing JotForm ───────────────────── */
function parseJotformPayload_(body, e) {
  // JotForm puede llegar de varias formas:
  //  a) Form-encoded clásico: e.parameter tiene q3_nombre, q4_email, ...
  //  b) JSON con rawRequest (string) que contiene los q3_, q4_, etc.
  //  c) JSON estructurado custom (mini-form) — ya manejado en handleWhatsapp_
  let raw = body;

  if (typeof body.rawRequest === 'string') {
    const r = safeJson_(body.rawRequest);
    if (r) raw = Object.assign({}, body, r);
  }
  if (e && e.parameter && Object.keys(e.parameter).length) {
    raw = Object.assign({}, raw, e.parameter);
  }

  // Heurística por keyword en nombre del campo (q3_nombreDel, q4_email, etc.)
  function find(keywords) {
    for (const kw of keywords) {
      for (const k of Object.keys(raw)) {
        if (k.toLowerCase().includes(kw)) {
          const v = raw[k];
          if (v && typeof v === 'object' && !Array.isArray(v)) {
            // JotForm a veces manda objetos {first:"", last:""}
            return [v.first, v.last, v.full, v.area, v.phone].filter(Boolean).join(' ').trim() || JSON.stringify(v);
          }
          return v;
        }
      }
    }
    return undefined;
  }

  const fechaNac = find(['fechanac', 'fechadenac', 'birth', 'naixement']);
  return {
    submissionId: raw.submissionID || raw.submission_id || '',
    nombreJugador: find(['nombrejugador', 'nombredeljugador', 'nomdeljugador', 'nombre']) || '',
    apellidos: find(['apellido', 'cognoms']) || '',
    fechaNac: fechaNac || '',
    edad: computeAge_(fechaNac),
    genero: find(['genero', 'género', 'genere', 'sexo']) || '',
    semanas: normalizeWeeks_(find(['semana', 'setmana', 'week'])),
    emailTutor: find(['email', 'correo', 'mail']) || '',
    nombreTutor: find(['nombretutor', 'nombredeltutor', 'tutor', 'padre', 'madre']) || '',
    telefonoTutor: find(['telefono', 'teléfono', 'mobile', 'movil', 'phone']) || '',
    nivel: find(['nivel', 'nivell', 'experiencia']) || '',
    talla: find(['talla', 'size']) || '',
    notas: find(['nota', 'comentario', 'observac']) || '',
    aceptaImagen: !!find(['imagen', 'imatge', 'foto']),
    aceptaCondiciones: !!find(['condicion', 'términos', 'rgpd', 'privac'])
  };
}

function normalizeWeeks_(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  return String(value).split(/[,;\n]+/).map(s => s.trim()).filter(Boolean);
}

function computeAge_(birth) {
  if (!birth) return '';
  const d = new Date(birth);
  if (isNaN(d.getTime())) return '';
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

/* ───────────────────── WhatsApp URL builder ───────────────────── */
function buildWhatsAppUrl_(lead) {
  const ana = String(getProp_('ANA_WHATSAPP') || '').replace(/[^\d]/g, '');
  if (!ana) return '';
  const txt = [
    'Hola Ana 👋 soy ' + lead.nombre + '.',
    'Quiero info del Campus Timechamber 2026.',
    lead.edadJugador ? ('Mi hij@ tiene ' + lead.edadJugador + ' años.') : '',
    lead.semana ? ('Me interesa la semana ' + lead.semana + '.') : '',
    lead.motivo ? '' : '',
    lead.motivo
  ].filter(Boolean).join(' ');
  return 'https://wa.me/' + ana + '?text=' + encodeURIComponent(txt);
}

/* ───────────────────── Brevo push ───────────────────── */
function pushBrevo_(spec) {
  const apiKey = getProp_('BREVO_API_KEY');
  if (!apiKey) return 'skipped: no BREVO_API_KEY';
  if (!spec.email) return 'skipped: no email';

  const body = {
    email: spec.email,
    updateEnabled: true,
    attributes: spec.attributes || {}
  };
  if (spec.listId) {
    const n = parseInt(spec.listId, 10);
    if (!isNaN(n)) body.listIds = [n];
  }

  const res = UrlFetchApp.fetch('https://api.brevo.com/v3/contacts', {
    method: 'post',
    contentType: 'application/json',
    headers: { 'api-key': apiKey, 'accept': 'application/json' },
    payload: JSON.stringify(body),
    muteHttpExceptions: true
  });
  const code = res.getResponseCode();
  if (code === 201) return 'created';
  if (code === 204) return 'updated';
  return 'error ' + code + ': ' + res.getContentText().slice(0, 180);
}

/* ───────────────────── email a Ana ───────────────────── */
function notifyAna_(spec) {
  const to = getProp_('NOTIFY_EMAIL');
  if (!to) return;
  MailApp.sendEmail({ to: to, subject: spec.subject, body: spec.lines.join('\n') });
}

function notifyError_(err) {
  try {
    const to = getProp_('NOTIFY_EMAIL');
    if (!to) return;
    MailApp.sendEmail({
      to: to,
      subject: '[Timechamber] ⚠️ Error en webhook',
      body: 'Error: ' + err + '\n\nStack:\n' + (err && err.stack || 'n/a')
    });
  } catch (_) {}
}

/* ───────────────────── helpers ───────────────────── */
function getProp_(k) {
  return PropertiesService.getScriptProperties().getProperty(k) || '';
}

function getSheetBook_() {
  const id = getProp_('SHEET_ID');
  if (!id) throw new Error('Falta Script Property SHEET_ID');
  return SpreadsheetApp.openById(id);
}

function getOrCreateSheet_(name, headers) {
  const ss = getSheetBook_();
  let s = ss.getSheetByName(name);
  if (!s) {
    s = ss.insertSheet(name);
    s.appendRow(headers);
    s.setFrozenRows(1);
    s.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  } else if (s.getLastRow() === 0) {
    s.appendRow(headers);
    s.setFrozenRows(1);
    s.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return s;
}

function countRows_(name) {
  const ss = getSheetBook_();
  const s = ss.getSheetByName(name);
  if (!s) return 0;
  return Math.max(0, s.getLastRow() - 1);
}

function checkSecret_(e) {
  const expected = getProp_('SHARED_SECRET');
  if (!expected) return true; // si no hay secret configurado, no se valida
  const got = (e && e.parameter && e.parameter.secret) || '';
  return got === expected;
}

function safeJson_(s) {
  try { return JSON.parse(s || '{}'); } catch (_) { return {}; }
}

function today_() {
  return new Date().toISOString().slice(0, 10);
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Para el mini-form, el frontend hace fetch desde el navegador → usar text/plain
// para evitar el preflight CORS (Apps Script no permite cabeceras CORS custom).
function jsonResponseWithCors_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ───────────────────── tests manuales ───────────────────── */

function testJotform() {
  const fake = {
    formID: '260962500106347',
    submissionID: 'TEST-J-' + Date.now(),
    rawRequest: JSON.stringify({
      q3_nombredeljugador: { first: 'Marc', last: 'Test' },
      q4_apellidos: 'García',
      q5_fechadenac: '2014-08-15',
      q6_email: 'tutor@example.com',
      q7_telefono: { full: '+34698425153' },
      q8_semana: ['S5 · 21–25 JUL', 'S6 · 28 JUL – 1 AGO'],
      q9_nivel: 'Intermedio',
      q10_talla: 'M',
      q11_notas: 'Primera vez',
      q12_aceptoImagen: 'Sí',
      q13_aceptoCondiciones: 'Sí'
    })
  };
  const e = {
    postData: { type: 'application/json', contents: JSON.stringify(fake) },
    parameter: { secret: getProp_('SHARED_SECRET') }
  };
  const res = doPost(e);
  console.log('JotForm result:', res.getContent());
}

function testWhatsapp() {
  const fake = {
    type: 'whatsapp',
    nombre: 'Anna Test',
    telefono: '+34666777888',
    email: 'anna.test@example.com',
    edadJugador: '11',
    semana: 'S2 · 30 JUN – 4 JUL',
    como: 'Instagram',
    motivo: 'Quiero saber si quedan plazas para infantil',
    origen: 'web'
  };
  const e = {
    postData: { type: 'application/json', contents: JSON.stringify(fake) },
    parameter: { secret: getProp_('SHARED_SECRET') }
  };
  const res = doPost(e);
  console.log('WhatsApp result:', res.getContent());
}
