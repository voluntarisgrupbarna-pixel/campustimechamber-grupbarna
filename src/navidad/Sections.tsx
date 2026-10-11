import { motion } from 'framer-motion';
import { Check, Trophy, Gift, Zap, Users, MapPin, ExternalLink, MessageCircle } from 'lucide-react';
import { TURNOS, JOTFORM_FORM_ID } from './config';

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function Heading({ tag, children, text }: { tag: string; children: React.ReactNode; text?: string }) {
  return (
    <motion.div {...reveal} className="text-center max-w-2xl mx-auto">
      <span className="tag">{tag}</span>
      <h2 className="font-display mt-5 text-4xl md:text-6xl tracking-wider">{children}</h2>
      {text && <p className="mt-5 text-muted">{text}</p>}
    </motion.div>
  );
}

const stats = [
  { value: '3', label: 'Turnos navideños' },
  { value: 'NBA', label: 'Metodología' },
  { value: '1965', label: 'Club del Clot' },
  { value: '🎁', label: 'Sorpresas de Navidad' },
];

export function Stats() {
  return (
    <section id="stats" className="py-20 md:py-24 bg-surface">
      <div className="container mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card-surface p-6 text-center"
          >
            <div className="font-display text-5xl md:text-6xl text-gradient-gold leading-none">{s.value}</div>
            <div className="mt-3 text-xs md:text-sm uppercase tracking-widest text-muted font-bold">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const pillars = [
  { icon: Trophy, title: 'Metodología NBA', text: 'Entrenamientos con técnicas y referencias del baloncesto profesional americano.' },
  { icon: Zap, title: 'Intensidad con sonrisa', text: 'Sesiones de alto ritmo adaptadas por edad. Esfuerzo, mejora y diversión.' },
  { icon: Gift, title: 'Espíritu navideño', text: 'Concursos de triples, retos por equipos, chocolatada y sorpresas durante el campus.' },
  { icon: Users, title: 'Staff Timechamber', text: 'Entrenadores del club y del equipo Timechamber, con grupos por edad y nivel.' },
];

export function Methodology() {
  return (
    <section id="metodologia" className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <Heading
          tag="Excelencia"
          text="Lo mejor del campus de verano, con la magia de las fiestas: aprender baloncesto de verdad mientras se disfruta la Navidad."
        >
          Baloncesto <span className="text-gradient-gold">en modo Navidad</span>
        </Heading>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-surface p-6 flex items-start gap-4"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-xmas/20 border border-xmas/50 flex items-center justify-center">
                <p.icon className="text-xmas-soft" size={22} />
              </div>
              <div>
                <h3 className="font-black uppercase tracking-wider text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Turnos() {
  return (
    <section id="turnos" className="py-20 md:py-28 bg-surface">
      <div className="container mx-auto max-w-6xl px-4">
        <Heading tag="Programa" text="Cada turno tiene identidad propia. Apúntate a uno o vive todas las Navidades en pista.">
          3 turnos, <span className="text-gradient-gold">3 regalos</span>
        </Heading>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TURNOS.map((t, i) => (
            <motion.article
              key={t.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.08 * i }}
              className="card-surface p-6 overflow-hidden"
            >
              <span className="absolute -top-px right-6 h-10 w-3 bg-xmas" aria-hidden />
              <span className="font-display text-6xl text-gradient-xmas leading-none">{String(t.n).padStart(2, '0')}</span>
              <h3 className="mt-3 font-black uppercase tracking-wider text-lg">{t.name}</h3>
              <p className="text-xs font-mono text-gold mt-1">{t.dates}</p>
              <p className="mt-4 text-sm text-muted leading-relaxed">{t.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const tiers = [
  {
    name: 'Día Completo',
    desc: 'Jornada completa de campus con almuerzo y actividades navideñas.',
    features: ['Servicio de acogida', 'Almuerzo incluido', 'Chocolatada y regalo sorpresa', 'Material oficial Timechamber'],
    highlight: true,
  },
  {
    name: 'Media Jornada',
    desc: 'Sesión de mañana intensiva, sin servicio de comedor.',
    features: ['Entrenamiento técnico', 'Material oficial Timechamber', 'Apto para iniciación'],
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="precios" className="py-20 md:py-28">
      <div className="container mx-auto max-w-5xl px-4">
        <Heading tag="Inversión" text="Reserva tu plaza con una parte del importe; el resto, antes del inicio del campus.">
          Elige <span className="text-gradient-gold">tu modalidad</span>
        </Heading>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiers.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`card-surface p-8 ${t.highlight ? '!border-xmas/70 shadow-[0_30px_80px_-30px_rgba(214,40,57,0.5)]' : ''}`}
            >
              {t.highlight && <span className="tag mb-3">Más elegida</span>}
              <h3 className="font-display text-3xl tracking-wider">{t.name}</h3>
              <p className="mt-2 text-sm text-muted">{t.desc}</p>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={18} className="text-gold shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#inscripcion" className={`mt-8 w-full justify-center ${t.highlight ? 'btn-gold' : 'btn-ghost'}`}>
                Reservar plaza →
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Inscripcion() {
  return (
    <section id="inscripcion" className="py-20 md:py-28 bg-surface">
      <div className="container mx-auto max-w-4xl px-4">
        <Heading tag="Inscripción" text="Plazas limitadas por turno y categoría.">
          Asegura <span className="text-gradient-gold">tu plaza</span>
        </Heading>
        {JOTFORM_FORM_ID ? (
          <div className="mt-12 jotform-frame">
            <iframe
              src={`https://eu.jotform.com/${JOTFORM_FORM_ID}`}
              title="Formulario de inscripción Campus de Navidad Timechamber 2026"
              loading="lazy"
              allow="payment"
            />
          </div>
        ) : (
          <div className="mt-12 card-surface p-8 md:p-12 text-center">
            <p className="text-fg/90 max-w-xl mx-auto">
              Las inscripciones se gestionan por WhatsApp con Ana. Cuéntanos la edad del jugador y el turno que
              te interesa y te reservamos plaza.
            </p>
            <a href="#whatsapp" className="btn-gold mt-8">
              <MessageCircle size={18} /> Reservar por WhatsApp
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export function Location() {
  return (
    <section id="ubicacion" className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <Heading tag="Instalación oficial" text="Pabellón cubierto en el corazón de Barcelona, junto a Westfield Glòries y el Eix Clot.">
          La Nau <span className="text-gradient-gold">del Clot</span>
        </Heading>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="card-surface p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-black uppercase tracking-wider text-lg flex items-center gap-2">
                <MapPin size={18} className="text-gold" /> Dirección
              </h3>
              <p className="mt-3 leading-relaxed">
                Carrer de la Llacuna 172<br />08018 Barcelona<br />Districte de Sant Martí
              </p>
              <p className="mt-5 text-sm text-muted">
                Metro <span className="text-gold font-bold">L1 Clot · L2 Bogatell</span> · Tram{' '}
                <span className="text-gold font-bold">T4 Glòries</span> · Bus 6, 7, 92, H14
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=La+Nau+del+Clot+Carrer+de+la+Llacuna+172+Barcelona"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-8 self-start"
            >
              Cómo llegar <ExternalLink size={14} />
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border min-h-[320px]">
            <iframe
              title="Mapa de La Nau del Clot, Barcelona"
              src="https://www.google.com/maps?q=Carrer%20de%20la%20Llacuna%20172%2C%2008018%20Barcelona&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[320px] border-0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
