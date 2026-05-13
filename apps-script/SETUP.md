# Setup — Apps Script Campus Timechamber 2026

## ⚠️ Importante: dónde viven las inscripciones

Las inscripciones formales del campus van a **JotForm EU** (form id `260962500106347`, URL pública `https://eu.jotform.com/260962500106347`) — viven en el **dashboard de JotForm**. Este backend NO procesa inscripciones formales hoy.

Lo que SÍ procesa este Apps Script:

**Mini-form "Habla con Ana por WhatsApp"** (custom React, en la web del Campus y disparado desde el email viral):
- Guarda en Sheet pestaña **"WhatsApp Leads"**
- Crea/actualiza contact en Brevo lista **`BREVO_LIST_WHATSAPP`**
- Email a Ana con datos del lead
- Devuelve `wa.me` precargado para que el navegador abra WhatsApp con el chat ya escrito

---

## ⏱️ Pasos manuales (10 min) — los hace Ana

### 1) Crea el Google Sheet de backup
1. [sheets.google.com](https://sheets.google.com) → "Crear hoja en blanco".
2. Renómbralo a **"Campus Timechamber 2026 — Backups"**.
3. La pestaña "WhatsApp Leads" se crea sola al primer envío.
4. Copia el `SHEET_ID` de la URL (entre `/d/` y `/edit`).

### 2) Crea la lista en Brevo
1. Brevo → Contacts → Lists → "+ New list".
2. Nombre: **"Campus Timechamber 2026 — Leads WhatsApp"**. Crear.
3. Anota el ID numérico → `BREVO_LIST_WHATSAPP`.

### 3) Genera la API key de Brevo
1. Brevo → SMTP & API → API keys → "+ Generate a new API key".
2. Nombre: "Campus Timechamber Apps Script". Generar.
3. Copia la key (`xkeysib-...`). → `BREVO_API_KEY` (Brevo no la muestra otra vez).

### 4) Crea el Apps Script y pega el código
1. [script.google.com](https://script.google.com) → "Nuevo proyecto".
2. Nombre: **"Campus Timechamber Backend"**.
3. Borra `function myFunction()`.
4. Abre `apps-script/Code.gs` → copia TODO → pega en el editor.
5. Project Settings → marca "Show appsscript.json manifest file" → pega el contenido de `appsscript.json`.
6. `Cmd+S`.

### 5) Configura Script Properties
Apps Script → ⚙️ **Project Settings** → **Script properties** → "Add script property".

| Property | Value |
|---|---|
| `SHEET_ID` | el ID del paso 1 |
| `BREVO_API_KEY` | la API key del paso 3 |
| `BREVO_LIST_WHATSAPP` | list ID del paso 2 |
| `NOTIFY_EMAIL` | `voluntarisgrupbarna@gmail.com` |
| `ANA_WHATSAPP` | `34698425153` |
| `SHARED_SECRET` | string aleatorio largo, ej. `tch26-x9k2pq-secret`. Para que solo la web pueda llamar al webhook. |

> No necesitas configurar `BREVO_LIST_INSCRIPCIONES` hoy (no entra ningún payload de "inscripción" porque las inscripciones van a JotForm directamente). El campo existe en `Code.gs` pero queda inactivo.

### 6) Test desde el editor
En el editor selecciona en el dropdown:
- **`testWhatsapp`** → Run → autoriza permisos la primera vez.

Comprueba:
- Sheet pestaña "WhatsApp Leads" tiene una fila con datos de "Anna Test".
- Llega email **"💬 Lead WhatsApp Campus — Anna Test"** a `voluntarisgrupbarna@gmail.com`.
- Brevo: contact `anna.test@example.com` está en lista Leads WhatsApp.

Si los 3 funcionan, el backend está listo.

### 7) Despliega como Web App
1. Editor → **Deploy** → "New deployment" → ⚙️ → Type: **Web app**.
2. Description: "v1 mini-form WhatsApp".
3. Execute as: **Me (tu email)**.
4. Who has access: **Anyone**.
5. **Deploy** → Authorize → copia la **Web app URL** (acaba en `/exec`).
6. Esta es tu `WEBHOOK_URL`.

### 8) Conecta la web del Campus al Apps Script
La web (`/Users/ana/CAMPUS TIMECHAMBER`) usa un componente `WhatsAppCTA` que postea al Apps Script. Necesita 3 env vars en GitHub Actions Secrets (Settings → Secrets and variables → Actions del repo `campustimechamber-grupbarna`):

| Secret | Value |
|---|---|
| `VITE_GOOGLE_SHEET_WEBHOOK` | la `WEBHOOK_URL` del paso 7 |
| `VITE_WEBHOOK_SECRET` | el `SHARED_SECRET` del paso 5 |
| `VITE_ANA_WHATSAPP` | `34698425153` |

Después haz un commit cualquiera a `main` para forzar el redeploy. La web pública volverá a construirse con esos secrets dentro del bundle.

> ⚠️ **NUNCA** pongas `BREVO_API_KEY` aquí — esa va solo en Apps Script Properties (server-side).

### 9) Test end-to-end
1. Abre la web pública del Campus.
2. Pulsa botón flotante "💬 HABLA CON ANA".
3. Rellena con datos de prueba → "ABRIR WHATSAPP CON ANA".
4. Verifica:
   - Sheet pestaña "WhatsApp Leads" tiene fila nueva.
   - Email a `voluntarisgrupbarna@gmail.com`.
   - Se abre WhatsApp con el mensaje precargado dirigido a `+34 698 425 153`.

---

## 🧱 Estructura de datos

### Sheet pestaña "WhatsApp Leads"
```
timestamp · nombre_tutor · telefono · email · edad_jugador
· semana_interes · como_nos_conociste · motivo · origen
· brevo_status · wa_url · raw_payload
```

### Brevo attributes
`NOMBRE`, `SMS`, `WHATSAPP`, `EDAD_JUGADOR`, `SEMANAS_CAMPUS`, `COMO_NOS_CONOCISTE`, `MOTIVO_CONTACTO`, `ORIGEN`, `FECHA_INSCRIPCION`. Brevo los crea automáticamente la primera vez si tu plan lo permite. Si no, créalos a mano: Brevo → Contacts → Settings → Contact attributes.

---

## 🧪 Tests rápidos
- Apps Script editor → run `testWhatsapp` cuando quieras simular un envío.
- Navegador → `WEBHOOK_URL` (sin `?secret`) → te devuelve `{ok:true, whatsapp_leads:N}`.

---

## 🆘 Troubleshooting
- **No llega email**: verifica `NOTIFY_EMAIL=voluntarisgrupbarna@gmail.com`. La primera vez que un script usa `MailApp.sendEmail` Google te pide autorizar — hazlo.
- **Brevo error 401**: API key mal copiada o con espacios.
- **Brevo error 400 sobre attributes**: créalos a mano en Brevo → Contacts → Settings → Contact attributes.
- **Webhook 401 unauthorized**: el `?secret=` no coincide con `SHARED_SECRET`.
- **Mini-form de la web no postea**: revisa consola del navegador (F12). Si error CORS, verifica que el Apps Script está desplegado con "Anyone" access. Apps Script no permite cabeceras CORS custom — por eso usamos `Content-Type: text/plain` que evita el preflight.

---

## 🔮 Futuro (opcional, cuando tengas tiempo)
Si quieres que las inscripciones formales (hoy en JotForm) se sincronicen automáticamente con Sheet + Brevo, hay dos vías:

**Opción A — webhook desde JotForm:** en JotForm → Settings → Integrations → Webhooks añadir la URL del Apps Script (`?secret=...&type=inscripcion`). El parser ya acepta `type: 'inscripcion'`.

**Opción B — form custom propio:** sustituir el iframe por un `<InscripcionForm />` React que postee directo al Apps Script.

Coste cero, control total cuando quieras.
