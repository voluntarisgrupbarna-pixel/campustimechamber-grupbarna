# Setup — Apps Script Campus Timechamber 2026 (dual-flow)

Este backend recibe **DOS tipos de POST** distintos:

1. **Webhook JotForm** (`260962500106347`) — inscripción formal del campus.
   - Guarda en Sheet pestaña **"Inscripciones"**.
   - Crea/actualiza contact en Brevo lista **`BREVO_LIST_INSCRIPCIONES`**.
   - Email a Ana con resumen.

2. **Mini-form "Habla con Ana por WhatsApp"** (custom, embebido en la web del Campus y disparado también desde el email viral).
   - Guarda en Sheet pestaña **"WhatsApp Leads"**.
   - Crea/actualiza contact en Brevo lista **`BREVO_LIST_WHATSAPP`**.
   - Email a Ana con datos del lead.
   - Devuelve la URL `wa.me` precargada para que el navegador abra WhatsApp con el chat ya escrito.

Patrón de arquitectura: Apps Script + Sheet (backup) + Brevo (CRM) + email a Ana + form externo (JotForm).

---

## ⚠️ Pasos manuales (15 min) — los hace Ana

Yo no puedo hacer estos pasos por ti porque requieren tu cuenta Google + Brevo + JotForm. Sigue en orden.

### 1) Crea el Google Sheet de backup
1. [sheets.google.com](https://sheets.google.com) → "Crear hoja en blanco".
2. Renómbralo a **"Campus Timechamber 2026 — Backups"**.
3. (Las dos pestañas "Inscripciones" y "WhatsApp Leads" se crean solas la primera vez que entra un POST.)
4. Copia el `SHEET_ID` de la URL (entre `/d/` y `/edit`).

### 2) Crea DOS listas en Brevo
1. Brevo → Contacts → Lists → "+ New list".
2. Crea **"Campus Timechamber 2026 — Inscritos"** → anota su ID numérico → `BREVO_LIST_INSCRIPCIONES`.
3. Crea **"Campus Timechamber 2026 — Leads WhatsApp"** → anota su ID → `BREVO_LIST_WHATSAPP`.

### 3) Genera la API key de Brevo
1. Brevo → SMTP & API → API keys → "+ Generate a new API key".
2. Nombre: "Campus Timechamber Apps Script". Generar.
3. Copia la key (`xkeysib-...`) — Brevo no la muestra otra vez. → `BREVO_API_KEY`.

### 4) Crea el Apps Script y pega el código
1. [script.google.com](https://script.google.com) → "Nuevo proyecto".
2. Nombre: **"Campus Timechamber Backend"**.
3. Borra `function myFunction()` por defecto.
4. Abre `apps-script/Code.gs` (este repo) → copia TODO → pega en el editor.
5. Project Settings → marca "Show appsscript.json manifest file" → pega también el contenido de `appsscript.json`.
6. `Cmd+S`.

### 5) Configura Script Properties
Apps Script → ⚙️ **Project Settings** → **Script properties** → "Add script property".

| Property | Value |
|---|---|
| `SHEET_ID` | el ID del paso 1 |
| `BREVO_API_KEY` | la API key del paso 3 |
| `BREVO_LIST_INSCRIPCIONES` | list ID del paso 2 (Inscritos) |
| `BREVO_LIST_WHATSAPP` | list ID del paso 2 (Leads WhatsApp) |
| `NOTIFY_EMAIL` | tu email donde quieres recibir avisos |
| `ANA_WHATSAPP` | tu teléfono sin `+` ni espacios. Ej: `34698425153` |
| `SHARED_SECRET` | string aleatorio largo, ej. `tch26-x9k2pq-secret`. Para que solo tú/JotForm/la web puedan llamar al webhook. |

### 6) Test desde el editor
En el editor selecciona en el dropdown:

- **`testJotform`** → Run → autoriza permisos la primera vez. Comprueba:
  - Sheet pestaña "Inscripciones" tiene una fila con datos de Marc Test.
  - Llega email "🏀 Inscripción Campus — Marc Test García".
  - Brevo: contact `tutor@example.com` está en lista Inscritos.

- **`testWhatsapp`** → Run. Comprueba:
  - Sheet pestaña "WhatsApp Leads" tiene una fila con datos de Anna Test.
  - Llega email "💬 Lead WhatsApp Campus — Anna Test".
  - Brevo: contact `anna.test@example.com` está en lista Leads WhatsApp.

Si los 2 tests funcionan, el backend está listo.

### 7) Despliega como Web App
1. Editor → **Deploy** → "New deployment" → ⚙️ → Type: **Web app**.
2. Description: "v1 dual-flow".
3. Execute as: **Me (tu email)**.
4. Who has access: **Anyone**.
5. **Deploy** → Authorize → copia la **Web app URL** (acaba en `/exec`).
6. Esta es tu `WEBHOOK_URL`.

### 8) Configura el webhook en JotForm (flujo 1)
1. JotForm → form `260962500106347` → **Settings** → **Integrations** → busca "Webhooks".
2. Add webhook:
   - URL: `WEBHOOK_URL` + `?secret=<tu SHARED_SECRET>`. Ejemplo:
     `https://script.google.com/macros/s/AKfycbx.../exec?secret=tch26-x9k2pq-secret`
   - Save.
3. JotForm → tu form → "Test webhook" o haz un envío real → verifica fila nueva en Sheet "Inscripciones".

### 9) Configura las env vars de la web (flujo 2)
La web del Campus (`/Users/ana/CAMPUS TIMECHAMBER`) usa un componente `WhatsAppCTA` que postea al mismo Apps Script. Crea `.env` en la raíz del proyecto:

```bash
VITE_GOOGLE_SHEET_WEBHOOK=https://script.google.com/macros/s/.../exec
VITE_WEBHOOK_SECRET=tch26-x9k2pq-secret
VITE_ANA_WHATSAPP=34698425153
```

Y para el deploy en GitHub Pages, añade los mismos valores como **secrets** del repo (Settings → Secrets and variables → Actions). El workflow CI los pasará al build.

> ⚠️ **No pongas `BREVO_API_KEY` en el frontend** — esa va solo en Apps Script Properties (server-side). El frontend solo conoce la URL del webhook + el secret.

### 10) Test end-to-end del mini-form
1. `npm run dev` en `/Users/ana/CAMPUS TIMECHAMBER`.
2. Abre `http://localhost:5173`.
3. Verás el botón flotante verde "💬 HABLA CON ANA" abajo a la derecha.
4. Pulsa → modal → rellena datos prueba → "ABRIR WHATSAPP CON ANA".
5. Verifica:
   - Sheet pestaña "WhatsApp Leads" tiene fila nueva.
   - Email a `NOTIFY_EMAIL`.
   - Se abre WhatsApp web/app con el mensaje precargado dirigido a `ANA_WHATSAPP`.

---

## 🧱 Estructura de datos

### Sheet pestaña "Inscripciones" (JotForm)
`timestamp · jotform_submission_id · nombre_jugador · apellidos · fecha_nac · edad · genero · semanas · email_tutor · nombre_tutor · telefono_tutor · nivel · talla · notas · acepta_imagen · acepta_condiciones · brevo_status · raw_payload`

### Sheet pestaña "WhatsApp Leads" (mini-form)
`timestamp · nombre_tutor · telefono · email · edad_jugador · semana_interes · como_nos_conociste · motivo · origen · brevo_status · wa_url · raw_payload`

### Brevo attributes que se rellenan
`NOMBRE`, `APELLIDOS`, `SMS`, `WHATSAPP`, `NOMBRE_JUGADOR`, `EDAD_JUGADOR`, `SEMANAS_CAMPUS`, `NIVEL`, `COMO_NOS_CONOCISTE`, `MOTIVO_CONTACTO`, `ORIGEN`, `FECHA_INSCRIPCION`.

> Si Brevo no los crea automáticamente al primer push (depende de tu plan), créalos a mano en Brevo → Contacts → Settings → Contact attributes (todos como Text excepto `EDAD_JUGADOR` que puede ser Number y `FECHA_INSCRIPCION` Date).

---

## 🔄 Cuando llegue el primer envío real de JotForm

Pásame el `raw_payload` que aparezca en la pestaña "Inscripciones" (o en logs de Apps Script). Con eso ajusto el mapping de `parseJotformPayload_()` en `Code.gs` para usar los IDs de campo exactos (`q3_xxx`, `q4_xxx`...) en vez de la heurística por keywords actual. Esto es una pasada de 5 minutos.

---

## 🧪 Test rápido sin esperar leads
- Apps Script editor → run `testJotform` o `testWhatsapp`.
- Navegador → `WEBHOOK_URL` (sin `?secret`) → te devuelve `{ok:true, inscritos:N, whatsapp_leads:M}`. Útil para mostrar el contador en la web.

---

## 🆘 Troubleshooting
- **No llega email**: verifica `NOTIFY_EMAIL` en Script Properties. La primera vez que un script usa `MailApp.sendEmail` Google te pide autorizar — hazlo.
- **Brevo error 401**: API key mal copiada o la copiaste con espacios.
- **Brevo error 400 sobre attributes**: créalos a mano (ver más arriba).
- **Webhook 401 unauthorized**: el `?secret=...` no coincide con `SHARED_SECRET` en Script Properties. Asegúrate de URL-encodear si tiene caracteres raros.
- **JotForm no envía webhook**: en plan free a veces no soportan webhooks. Plan B: Zapier free `JotForm New Submission → Webhook → tu Apps Script`.
- **El mini-form de la web no postea**: revisa la consola del navegador (F12). Si hay error CORS, asegúrate de que el Apps Script está desplegado con "Anyone" access. Apps Script no permite cabeceras CORS custom — por eso usamos `Content-Type: text/plain`, evita el preflight.
- **Quiero ver qué exactamente envía JotForm**: en Code.gs, `raw_payload` (última columna del Sheet) tiene el JSON completo. Cópialo y mándamelo cuando entre el primer envío real.
