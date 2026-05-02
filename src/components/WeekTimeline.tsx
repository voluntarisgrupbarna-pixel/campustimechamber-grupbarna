import { motion } from 'framer-motion';

const weeks = [
  {
    n: 1,
    name: 'Timechamber Basics',
    dates: '23 – 27 Jun',
    desc: 'Fundamentos sólidos para un juego de élite.',
  },
  {
    n: 2,
    name: 'Shooting Academy',
    dates: '30 Jun – 4 Jul',
    desc: 'Mecánica, ritmo y confianza de tiro.',
  },
  {
    n: 3,
    name: 'Ballhandling Lab',
    dates: '7 – 11 Jul',
    desc: 'Control de balón al máximo nivel.',
  },
  {
    n: 4,
    name: 'One on One Mastery',
    dates: '14 – 18 Jul',
    desc: 'Domina el 1v1. Fintas y creatividad ofensiva.',
  },
  {
    n: 5,
    name: 'Flow Camp',
    dates: '21 – 25 Jul',
    desc: 'Fluidez ofensiva y juego en movimiento.',
  },
  {
    n: 6,
    name: 'Skills Lab Experience',
    dates: '28 Jul – 1 Ago',
    desc: 'Integración total. El broche de oro.',
  },
];

export default function WeekTimeline() {
  return (
    <section id="semanas" className="py-20 md:py-28 bg-surface">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-gold text-black">
            Programa
          </span>
          <h2 className="font-display mt-5 text-4xl md:text-6xl tracking-wider">
            6 semanas, <span className="text-gradient-gold">6 mundos</span>
          </h2>
          <p className="mt-5 text-muted">
            Cada semana tiene identidad propia. Apúntate a una o ven todas.
          </p>
        </motion.div>

        <div className="mt-14 relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-8">
            {weeks.map((w, i) => {
              const left = i % 2 === 0;
              return (
                <motion.article
                  key={w.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: 0.05 * i }}
                  className={`grid grid-cols-1 md:grid-cols-2 items-center gap-6 ${
                    left ? '' : 'md:[&>*:first-child]:order-2'
                  }`}
                >
                  <div className={`card-surface p-6 ${left ? 'md:mr-8' : 'md:ml-8'}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-5xl text-gradient-gold leading-none">
                        {String(w.n).padStart(2, '0')}
                      </span>
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
      </div>
    </section>
  );
}
