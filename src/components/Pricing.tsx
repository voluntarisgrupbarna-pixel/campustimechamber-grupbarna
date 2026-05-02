import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Semana Completa',
    desc: 'Día completo de campus, almuerzo incluido y actividades extra.',
    features: [
      'Servicio de acogida',
      'Almuerzo incluido',
      'Excursión viernes Isla Fantasía',
      'Material oficial Timechamber',
    ],
    highlight: true,
  },
  {
    name: 'Media Jornada',
    desc: 'Sesión de mañana intensiva, sin servicio de comedor.',
    features: [
      'Entrenamiento técnico',
      'Material oficial Timechamber',
      'Apto para iniciación',
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="precios" className="py-20 md:py-28 bg-surface">
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-gold text-black">
            Inversión
          </span>
          <h2 className="font-display mt-5 text-4xl md:text-6xl tracking-wider">
            Elige <span className="text-gradient-gold">tu modalidad</span>
          </h2>
          <p className="mt-5 text-muted">
            Solo abonas una parte ahora para reservar tu plaza. El resto antes del inicio del campus.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiers.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`card-surface p-8 ${t.highlight ? 'border-gold/60 shadow-[0_30px_80px_-30px_rgba(255,212,0,0.4)]' : ''}`}
            >
              {t.highlight && (
                <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-gold text-black mb-3">
                  Más elegida
                </span>
              )}
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

        <div className="mt-10 text-center text-sm text-muted">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 font-mono">
            Código socios: <span className="text-gold font-bold">BARNAAVIAT</span>
          </span>
        </div>
      </div>
    </section>
  );
}
