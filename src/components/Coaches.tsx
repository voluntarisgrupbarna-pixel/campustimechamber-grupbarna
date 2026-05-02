import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const coaches = [
  {
    name: 'Robert Willet',
    role: 'NBA Trainer · @bballwillett',
    handle: 'bballwillett',
    bio: 'Entrenador de jugadores NBA. Especialista en desarrollo individual y skills de élite.',
    ig: 'https://www.instagram.com/bballwillett/',
  },
  {
    name: 'Ainhoa López',
    role: 'Jugadora profesional · Selección Española',
    handle: 'ainhoalopez_official',
    bio: 'Internacional con la Selección Española. Referente del baloncesto femenino.',
    ig: 'https://www.instagram.com/ainhoalopez_official/',
  },
  {
    name: 'Malak Shady',
    role: 'Basketball Influencer · MVP 3×3',
    handle: 'malakshady_22',
    bio: 'Creador de contenido y MVP del 3×3. Dominio total del 1v1 y la creatividad ofensiva.',
    ig: 'https://www.instagram.com/malakshady_22/',
  },
];

export default function Coaches() {
  return (
    <section id="coaches" className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-gold text-black">
            Estrellas
          </span>
          <h2 className="font-display mt-5 text-4xl md:text-6xl tracking-wider">
            Coaches <span className="text-gradient-gold">de referencia</span>
          </h2>
          <p className="mt-5 text-muted">
            Referentes NBA e influencers del baloncesto que entrenan con nuestros jugadores.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {coaches.map((c, i) => (
            <motion.article
              key={c.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-surface p-6 flex flex-col"
            >
              <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-gold/20 to-bg flex items-center justify-center overflow-hidden border border-border">
                <span className="font-display text-7xl text-gradient-gold">
                  {c.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <h3 className="mt-5 font-black uppercase tracking-wider text-xl">{c.name}</h3>
              <p className="mt-1 text-xs font-mono text-gold">{c.role}</p>
              <p className="mt-3 text-sm text-muted leading-relaxed flex-1">{c.bio}</p>
              <a
                href={c.ig}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-fg hover:text-gold transition-colors"
              >
                <Instagram size={16} /> @{c.handle}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
