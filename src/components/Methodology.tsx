import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Users } from 'lucide-react';

const pillars = [
  {
    icon: Trophy,
    title: 'Metodología NBA',
    text: 'Entrenamientos diseñados con técnicas y referencias del baloncesto profesional americano.',
  },
  {
    icon: Target,
    title: 'Semanas temáticas',
    text: 'Cada semana foco en una habilidad: tiro, ballhandling, 1v1, transición, integración.',
  },
  {
    icon: Zap,
    title: 'Intensidad real',
    text: 'Sesiones de alto rendimiento adaptadas por edad. Excelencia, esfuerzo y diversión.',
  },
  {
    icon: Users,
    title: 'Influencers y coaches',
    text: 'Robert Willet, Ainhoa López y Malak Shady entrenan junto a nuestro staff técnico.',
  },
];

export default function Methodology() {
  return (
    <section id="metodologia" className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-gold text-black">
            Excelencia
          </span>
          <h2 className="font-display mt-5 text-4xl md:text-6xl tracking-wider">
            Metodología <span className="text-gradient-gold">de élite</span>
          </h2>
          <p className="mt-5 text-muted">
            Una propuesta única en Barcelona: combinamos la rigurosidad del baloncesto profesional
            con la energía y creatividad de los referentes globales del juego.
          </p>
        </motion.div>

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
              <div className="shrink-0 w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center">
                <p.icon className="text-gold" size={22} />
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
