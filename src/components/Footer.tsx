import { Instagram, Globe, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 bg-bg">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo-grupbarna-new.png"
              alt="CB Grup Barna"
              className="h-10 w-auto object-contain"
              width="40"
              height="40"
            />
            <div>
              <p className="font-display text-xl tracking-widest">CB GRUP BARNA</p>
              <p className="text-xs text-muted">Bàsquet al Clot des de 1965</p>
            </div>
          </div>

          <nav className="flex items-center gap-3 flex-wrap justify-center" aria-label="Enlaces sociales y oficiales">
            <a
              href="https://cbgrupbarna.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Globe size={16} /> Web oficial
            </a>
            <a
              href="https://www.instagram.com/cbgrupbarna/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="Instagram CB Grup Barna"
            >
              <Instagram size={16} /> @cbgrupbarna
            </a>
            <a
              href="https://www.instagram.com/timechamber_es/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="Instagram Timechamber"
            >
              <Instagram size={16} /> @timechamber_es
            </a>
            <a
              href="https://wa.me/34698425153"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© {new Date().getFullYear()} CB Grup Barna · Time Chamber. Todos los derechos reservados.</p>
          <p>
            La Nau del Clot · Carrer de la Llacuna 172, 08018 Barcelona
          </p>
        </div>
      </div>
    </footer>
  );
}
