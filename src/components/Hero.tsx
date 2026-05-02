import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Calendar } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <img
        src="/images/hero-main.jpg"
        alt="Campus Timechamber Experience · Jugadores entrenando en La Nau del Clot, Barcelona"
        className="absolute inset-0 w-full h-full object-cover"
        width="1920"
        height="1080"
        fetchPriority="high"
      />
      <div className="absolute inset-0 hero-vignette" aria-hidden />

      <div className="relative z-10 container mx-auto max-w-5xl px-4 text-center pt-24 pb-16">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-gold text-black"
        >
          Plazas limitadas · Edición 2026
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display mt-6 text-[clamp(3rem,11vw,9rem)] leading-[0.85] tracking-wider"
        >
          <span className="block text-gradient-gold">TIMECHAMBER</span>
          <span className="block mt-1 text-fg">EXPERIENCE</span>
          <span className="block font-mono text-lg md:text-2xl mt-4 text-muted tracking-[0.4em]">
            BARCELONA · SUMMER 2026
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-muted leading-relaxed"
        >
          El campus de verano de baloncesto más innovador de Barcelona. 6 semanas con metodología
          NBA, entrenadores referentes e influencers del baloncesto.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          <a href="#inscripcion" className="btn-gold">
            Inscríbete ahora <ChevronRight size={18} />
          </a>
          <a href="#semanas" className="btn-ghost">
            Ver programa
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-12 flex items-center justify-center gap-6 flex-wrap text-sm text-muted"
        >
          <span className="inline-flex items-center gap-2">
            <Calendar size={16} className="text-gold" /> 23 Jun – 1 Ago 2026
          </span>
          <span className="opacity-30">·</span>
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} className="text-gold" /> La Nau del Clot · Barcelona
          </span>
        </motion.div>
      </div>

      <a
        href="#stats"
        aria-label="Bajar"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-fg/40 animate-bounce text-2xl"
      >
        ↓
      </a>
    </section>
  );
}
