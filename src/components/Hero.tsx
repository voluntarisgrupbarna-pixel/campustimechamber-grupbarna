import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Calendar } from 'lucide-react';
import type { Campus } from '../campus/data';

export default function Hero({ campus }: { campus: Campus }) {
  const h = campus.hero;
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <img
        src="/images/hero-main.jpg"
        alt="Campus Timechamber · Jugadores entrenando en La Nau del Clot, Barcelona"
        className="absolute inset-0 w-full h-full object-cover"
        width="1920"
        height="1080"
        fetchPriority="high"
      />
      <div className="absolute inset-0 hero-vignette" aria-hidden />

      <div className="relative z-10 container mx-auto max-w-5xl px-4 text-center pt-36 pb-16">
        <motion.span key={`${campus.id}-b`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="tag">
          {h.badge}
        </motion.span>

        <motion.h1 key={`${campus.id}-h`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="font-display mt-6 text-[clamp(3rem,11vw,9rem)] leading-[0.85] tracking-wider">
          <span className="block text-gradient-gold">{h.line1}</span>
          <span className="block mt-1 text-fg">{h.line2}</span>
          <span className="block font-mono text-lg md:text-2xl mt-4 text-muted tracking-[0.3em]">{h.tagline}</span>
        </motion.h1>

        <motion.p key={`${campus.id}-p`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }} className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-fg/80 leading-relaxed">
          {h.text}
        </motion.p>

        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <a href="#inscripcion" className="btn-gold">
            {campus.open ? 'Inscríbete ahora' : 'Avísame del próximo'} <ChevronRight size={18} />
          </a>
          <a href="#programa" className="btn-ghost">{h.cta}</a>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 flex-wrap text-sm text-fg/80">
          <span className="inline-flex items-center gap-2"><Calendar size={16} className="text-gold" /> {h.dates}</span>
          <span className="opacity-30">·</span>
          <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-gold" /> La Nau del Clot · Barcelona</span>
        </div>
      </div>
    </section>
  );
}
