import { motion } from 'framer-motion';

const items = [
  { value: '120+', label: 'Jugadores por edición' },
  { value: '6', label: 'Semanas temáticas' },
  { value: '4.9★', label: 'Satisfacción familias' },
  { value: '3', label: 'Coaches estrella' },
];

export default function Stats() {
  return (
    <section id="stats" className="py-20 md:py-24 bg-surface">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-surface p-6 text-center"
            >
              <div className="font-display text-5xl md:text-6xl text-gradient-gold leading-none">
                {s.value}
              </div>
              <div className="mt-3 text-xs md:text-sm uppercase tracking-widest text-muted font-bold">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
