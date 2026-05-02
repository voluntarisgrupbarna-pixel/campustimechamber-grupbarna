import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#metodologia', label: 'Metodología' },
    { href: '#semanas', label: 'Semanas' },
    { href: '#coaches', label: 'Coaches' },
    { href: '#precios', label: 'Precios' },
    { href: '#ubicacion', label: 'Ubicación' },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img
            src="/images/logo-grupbarna-new.png"
            alt="CB Grup Barna"
            className="h-9 w-auto object-contain drop-shadow-2xl"
            width="36"
            height="36"
          />
          <span className="hidden sm:inline font-display text-xl tracking-widest">
            TIMECHAMBER
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-muted hover:text-fg transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="#inscripcion" className="btn-gold">
            Inscríbete
          </a>
        </nav>

        <button
          aria-label="Abrir menú"
          className="md:hidden p-2 flex flex-col gap-1.5"
          onClick={() => setOpen((s) => !s)}
        >
          <span className="block w-6 h-0.5 bg-fg" />
          <span className="block w-6 h-0.5 bg-fg" />
          <span className="block w-6 h-0.5 bg-fg" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-bg/98 border-t border-border px-4 py-3 flex flex-col gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-semibold"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#inscripcion"
            onClick={() => setOpen(false)}
            className="btn-gold mt-2 justify-center"
          >
            Inscríbete
          </a>
        </div>
      )}
    </motion.header>
  );
}
