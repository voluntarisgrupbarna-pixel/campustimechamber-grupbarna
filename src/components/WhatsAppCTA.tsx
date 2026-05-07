import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK || '';
const SHARED_SECRET = import.meta.env.VITE_WEBHOOK_SECRET || '';
// Fallback: número WhatsApp de Ana (también está en Apps Script ANA_WHATSAPP)
const ANA_WHATSAPP_FALLBACK = import.meta.env.VITE_ANA_WHATSAPP || '34688265230';

const SEMANAS = [
  { id: 'S1', label: 'S1 · 23–27 JUN · Flow Camp', estado: 'completa' },
  { id: 'S2', label: 'S2 · 30 JUN – 4 JUL · Basics', estado: 'ultimas' },
  { id: 'S3', label: 'S3 · 7–11 JUL · Shooting ⭐', estado: 'lista-espera' },
  { id: 'S4', label: 'S4 · 14–18 JUL · One on One', estado: 'ultimas' },
  { id: 'S5', label: 'S5 · 21–25 JUL · Ballhandling', estado: 'pocas' },
  { id: 'S6', label: 'S6 · 28 JUL – 1 AGO · Skills Lab', estado: 'disponible' },
  { id: 'no-se', label: 'No lo sé aún · cuéntame', estado: 'info' }
];

const COMO = ['Instagram', 'Un amig@', 'Web del club', 'Búsqueda Google', 'Otro'];

type FormState = {
  nombre: string;
  telefono: string;
  email: string;
  edadJugador: string;
  semana: string;
  como: string;
  motivo: string;
};

const EMPTY: FormState = {
  nombre: '', telefono: '', email: '',
  edadJugador: '', semana: '', como: '', motivo: ''
};

type Props = { origin?: string };

export default function WhatsAppCTA({ origin = 'web' }: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);

  // Abrir el modal vía hash #whatsapp (para que el botón del email lo dispare)
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#whatsapp') setOpen(true);
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  function close() {
    setOpen(false);
    if (window.location.hash === '#whatsapp') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.nombre.trim() || !form.telefono.trim()) {
      setError('Pon al menos nombre y teléfono.');
      return;
    }

    setSubmitting(true);

    let waUrl = '';
    try {
      if (WEBHOOK_URL) {
        const url = SHARED_SECRET
          ? `${WEBHOOK_URL}?secret=${encodeURIComponent(SHARED_SECRET)}`
          : WEBHOOK_URL;
        // text/plain evita preflight CORS — Apps Script no soporta cabeceras CORS custom
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ type: 'whatsapp', origen: origin, ...form })
        });
        const data = await res.json().catch(() => ({}));
        if (data && data.waUrl) waUrl = data.waUrl;
        if (!res.ok && !data.ok) {
          // Si el backend falla, NO bloqueamos al usuario — abrimos WhatsApp igual con fallback.
          console.warn('Webhook respondió no-OK pero abrimos WhatsApp igual', data);
        }
      }
    } catch (err) {
      console.warn('Webhook error, fallback al wa.me directo', err);
    }

    if (!waUrl) {
      const txt = [
        `Hola Ana 👋 soy ${form.nombre}.`,
        'Quiero info del Campus Timechamber 2026.',
        form.edadJugador ? `Mi hij@ tiene ${form.edadJugador} años.` : '',
        form.semana ? `Me interesa la semana ${form.semana}.` : '',
        form.motivo
      ].filter(Boolean).join(' ');
      waUrl = `https://wa.me/${ANA_WHATSAPP_FALLBACK}?text=${encodeURIComponent(txt)}`;
    }

    setSubmitting(false);
    setForm(EMPTY);
    close();
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      {/* Botón flotante (sticky, abajo derecha) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Habla con Ana por WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 font-display text-sm tracking-widest text-white shadow-2xl shadow-black/40 transition hover:scale-105 hover:shadow-[#25d366]/40 md:bottom-8 md:right-8 md:text-base"
      >
        <span className="text-lg">💬</span>
        <span className="hidden sm:inline">HABLA CON ANA</span>
        <span className="sm:hidden">CHAT</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm md:items-center md:p-4"
            onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              className="w-full max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl bg-zinc-900 p-6 shadow-2xl ring-1 ring-white/10 md:rounded-3xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#25d366]">
                    💬 WhatsApp directo
                  </p>
                  <h3 className="font-display mt-1 text-2xl tracking-wider text-white">
                    Habla con <span className="text-gradient-gold">Ana</span>
                  </h3>
                </div>
                <button
                  onClick={close}
                  aria-label="Cerrar"
                  className="rounded-full p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>

              <p className="mb-5 text-sm text-white/70">
                Cuéntame 4 cosas y te abro WhatsApp con todo precargado. Te contesto yo personalmente.
              </p>

              <form onSubmit={submit} className="space-y-3">
                <Field label="Tu nombre *" required>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) => update('nombre', e.target.value)}
                    autoFocus
                    autoComplete="name"
                    className="wa-input"
                  />
                </Field>

                <Field label="Teléfono (WhatsApp) *" required>
                  <input
                    type="tel"
                    value={form.telefono}
                    onChange={(e) => update('telefono', e.target.value)}
                    placeholder="+34 ..."
                    autoComplete="tel"
                    className="wa-input"
                  />
                </Field>

                <Field label="Email (opcional)">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    autoComplete="email"
                    className="wa-input"
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Edad jugador/a">
                    <input
                      type="number"
                      min={5}
                      max={20}
                      value={form.edadJugador}
                      onChange={(e) => update('edadJugador', e.target.value)}
                      className="wa-input"
                    />
                  </Field>
                  <Field label="¿Cómo nos conociste?">
                    <select
                      value={form.como}
                      onChange={(e) => update('como', e.target.value)}
                      className="wa-input"
                    >
                      <option value="">—</option>
                      {COMO.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Semana de interés">
                  <select
                    value={form.semana}
                    onChange={(e) => update('semana', e.target.value)}
                    className="wa-input"
                  >
                    <option value="">—</option>
                    {SEMANAS.map(s => (
                      <option key={s.id} value={s.label}>{s.label}</option>
                    ))}
                  </select>
                </Field>

                <Field label="¿Qué quieres preguntarme? (opcional)">
                  <textarea
                    value={form.motivo}
                    onChange={(e) => update('motivo', e.target.value)}
                    rows={3}
                    className="wa-input resize-none"
                    placeholder="Plazas, descuentos, nivel, fechas, lo que sea..."
                  />
                </Field>

                {error && (
                  <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300 ring-1 ring-red-500/30">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-3 font-display text-sm tracking-widest text-white shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? 'ENVIANDO...'
                    : <>💬 ABRIR WHATSAPP CON ANA</>}
                </button>

                <p className="text-center text-[11px] leading-snug text-white/40">
                  Al enviar, tus datos se guardan para que Ana pueda contestarte.
                  No los compartimos con terceros.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/60">
        {label}{required && <span className="text-[#25d366]"> ●</span>}
      </span>
      {children}
    </label>
  );
}
