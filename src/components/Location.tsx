import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

export default function Location() {
  return (
    <section id="ubicacion" className="py-20 md:py-28 bg-surface">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-gold text-black">
            Instalación oficial
          </span>
          <h2 className="font-display mt-5 text-4xl md:text-6xl tracking-wider">
            La Nau <span className="text-gradient-gold">del Clot</span>
          </h2>
          <p className="mt-5 text-muted">
            Pabellón cubierto en el corazón de Barcelona, junto a Westfield Glòries y el Eix Clot.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="card-surface p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-black uppercase tracking-wider text-lg flex items-center gap-2">
                <MapPin size={18} className="text-gold" /> Dirección
              </h3>
              <p className="mt-3 text-fg leading-relaxed">
                Carrer de la Llacuna 172
                <br />
                08018 Barcelona
                <br />
                Districte de Sant Martí
              </p>
              <p className="mt-5 text-sm text-muted">
                Metro <span className="text-gold font-bold">L1 Clot · L2 Bogatell</span> · Tram{' '}
                <span className="text-gold font-bold">T4 Glòries</span> · Bus 6, 7, 92, H14
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=La+Nau+del+Clot+Carrer+de+la+Llacuna+172+Barcelona"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-8 self-start"
            >
              Cómo llegar <ExternalLink size={14} />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border min-h-[320px]">
            <iframe
              title="Mapa de La Nau del Clot, Barcelona"
              src="https://www.google.com/maps?q=Carrer%20de%20la%20Llacuna%20172%2C%2008018%20Barcelona&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[320px] border-0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
