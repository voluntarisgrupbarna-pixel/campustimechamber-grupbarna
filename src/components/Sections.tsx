import { motion } from 'framer-motion';
import { Check, MapPin, ExternalLink, Instagram, MessageCircle } from 'lucide-react';
import type { Campus } from '../campus/data';
import { ICONS } from './icons';

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function Heading({ tag, title, text }: { tag: string; title: [string, string]; text?: string }) {
  return (
    <motion.div {...reveal} className="text-center max-w-2xl mx-auto">
      <span className="tag">{tag}</span>
      <h2 className="font-display mt-5 text-4xl md:text-6xl tracking-wider">
        {title[0]}<span className="text-gradient-gold">{title[1]}</span>
      </h2>
      {text && <p className="mt-5 text-muted">{text}</p>}
    </motion.div>
  );
}

export function Stats({ campus }: { campus: Campus }) {
  return (
    <section id="stats" className="py-20 md:py-24 bg-surface">
      <div className="container mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {campus.stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.08 }} className="card-surface p-6 text-center">
            <div className="font-display text-5xl md:text-6xl text-gradient-gold leading-none">{s.value}</div>
            <div className="mt-3 text-xs md:text-sm uppercase tracking-widest text-muted font-bold">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Methodology({ campus }: { campus: Campus }) {
  const m = campus.methodology;
  return (
    <section id="metodologia" className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <Heading tag={m.tag} title={m.title} text={m.text} />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {m.pillars.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <motion.div key={p.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.08 }} className="card-surface p-6 flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/20 border border-accent/50 flex items-center justify-center">
                  <Icon className="text-accent-soft" size={22} />
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-wider text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{p.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Schedule({ campus }: { campus: Campus }) {
  const s = campus.schedule;
  const timeline = s.items.length > 4;
  return (
    <section id="programa" className="py-20 md:py-28 bg-surface">
      <div className="container mx-auto max-w-6xl px-4">
        <Heading tag={s.tag} title={s.title} text={s.text} />
        {timeline ? (
          <div className="mt-14 relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
            <div className="space-y-8">
              {s.items.map((w, i) => {
                const left = i % 2 === 0;
                return (
                  <motion.article key={w.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55, delay: 0.05 * i }} className={`grid grid-cols-1 md:grid-cols-2 items-center gap-6 ${left ? '' : 'md:[&>*:first-child]:order-2'}`}>
                    <div className={`card-surface p-6 ${left ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-5xl text-gradient-gold leading-none">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                          <h3 className="font-black uppercase tracking-wider text-lg">{w.name}</h3>
                          <p className="text-xs font-mono text-muted">{w.dates}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-muted leading-relaxed">{w.desc}</p>
                    </div>
                    <div className="hidden md:flex justify-center">
                      <span className="w-4 h-4 rounded-full bg-gold ring-4 ring-bg" />
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={`mt-14 grid grid-cols-1 gap-6 ${s.items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {s.items.map((t, i) => (
              <motion.article key={t.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55, delay: 0.08 * i }} className="card-surface p-6 overflow-hidden">
                <span className="absolute -top-px right-6 h-10 w-3 bg-accent" aria-hidden />
                <span className="font-display text-6xl text-gradient-gold leading-none">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-black uppercase tracking-wider text-lg">{t.name}</h3>
                <p className="text-xs font-mono text-gold mt-1">{t.dates}</p>
                <p className="mt-4 text-sm text-muted leading-relaxed">{t.desc}</p>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function Coaches({ campus }: { campus: Campus }) {
  if (!campus.coaches) return null;
  return (
    <section id="coaches" className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <Heading tag="Estrellas" title={['Coaches ', 'de referencia']} text="Referentes NBA e influencers del baloncesto que entrenan con nuestros jugadores." />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {campus.coaches.map((c, i) => (
            <motion.article key={c.handle} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.08 }} className="card-surface p-6 flex flex-col">
              <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-gold/20 to-bg flex items-center justify-center overflow-hidden border border-border">
                <span className="font-display text-7xl text-gradient-gold">{c.name.split(' ').map((n) => n[0]).join('')}</span>
              </div>
              <h3 className="mt-5 font-black uppercase tracking-wider text-xl">{c.name}</h3>
              <p className="mt-1 text-xs font-mono text-gold">{c.role}</p>
              <p className="mt-3 text-sm text-muted leading-relaxed flex-1">{c.bio}</p>
              <a href={`https://www.instagram.com/${c.handle}/`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-fg hover:text-gold transition-colors">
                <Instagram size={16} /> @{c.handle}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing({ campus }: { campus: Campus }) {
  const p = campus.pricing;
  return (
    <section id="precios" className="py-20 md:py-28 bg-surface">
      <div className="container mx-auto max-w-5xl px-4">
        <Heading tag="Inversión" title={['Elige ', 'tu modalidad']} text={p.text} />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {p.tiers.map((t, i) => (
            <motion.article key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.1 }} className={`card-surface p-8 ${t.highlight ? '!border-accent/70 shadow-[0_30px_80px_-30px_var(--c-btn-glow)]' : ''}`}>
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
                {campus.open ? 'Reservar plaza →' : 'Avísame →'}
              </a>
            </motion.article>
          ))}
        </div>
        {p.code && (
          <div className="mt-10 text-center text-sm text-muted">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 font-mono">
              Código socios: <span className="text-gold font-bold">{p.code}</span>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

export function Inscripcion({ campus }: { campus: Campus }) {
  const { form } = campus;
  const src = form.kind === 'jotform' ? `https://eu.jotform.com/${form.src}` : form.src;
  const embed = campus.open && form.kind !== 'none' && !!form.src;
  return (
    <section id="inscripcion" className="py-20 md:py-28">
      <div className="container mx-auto max-w-4xl px-4">
        <Heading
          tag="Inscripción"
          title={campus.open ? ['Asegura ', 'tu plaza'] : ['Próxima ', 'edición']}
          text={campus.open ? 'Plazas limitadas por turno y categoría.' : 'Las inscripciones de esta edición están cerradas. Déjanos tus datos y te avisamos cuando abramos la próxima.'}
        />
        {embed ? (
          <div className="mt-12 jotform-frame">
            <iframe src={src} title={`Formulario de inscripción ${campus.name}`} loading="lazy" allow="payment" />
          </div>
        ) : (
          <div className="mt-12 card-surface p-8 md:p-12 text-center">
            <p className="max-w-xl mx-auto text-fg/90">
              {campus.open
                ? 'Las inscripciones se gestionan por WhatsApp con Ana. Cuéntanos la edad del jugador y el turno que te interesa y te reservamos plaza.'
                : 'Escríbenos por WhatsApp con la edad del jugador y te avisamos en cuanto se abran las plazas.'}
            </p>
            <a href="#whatsapp" className="btn-gold mt-8">
              <MessageCircle size={18} /> {campus.open ? 'Reservar por WhatsApp' : 'Avísame por WhatsApp'}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export function Location() {
  return (
    <section id="ubicacion" className="py-20 md:py-28 bg-surface">
      <div className="container mx-auto max-w-6xl px-4">
        <Heading tag="Instalación oficial" title={['La Nau ', 'del Clot']} text="Pabellón cubierto en el corazón de Barcelona, junto a Westfield Glòries y el Eix Clot." />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="card-surface p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-black uppercase tracking-wider text-lg flex items-center gap-2">
                <MapPin size={18} className="text-gold" /> Dirección
              </h3>
              <p className="mt-3 leading-relaxed">Carrer de la Llacuna 172<br />08018 Barcelona<br />Districte de Sant Martí</p>
              <p className="mt-5 text-sm text-muted">
                Metro <span className="text-gold font-bold">L1 Clot · L2 Bogatell</span> · Tram <span className="text-gold font-bold">T4 Glòries</span> · Bus 6, 7, 92, H14
              </p>
            </div>
            <a href="https://maps.google.com/?q=La+Nau+del+Clot+Carrer+de+la+Llacuna+172+Barcelona" target="_blank" rel="noopener noreferrer" className="btn-ghost mt-8 self-start">
              Cómo llegar <ExternalLink size={14} />
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border min-h-[320px]">
            <iframe title="Mapa de La Nau del Clot, Barcelona" src="https://www.google.com/maps?q=Carrer%20de%20la%20Llacuna%20172%2C%2008018%20Barcelona&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full min-h-[320px] border-0" allowFullScreen />
          </div>
        </div>
      </div>
    </section>
  );
}
