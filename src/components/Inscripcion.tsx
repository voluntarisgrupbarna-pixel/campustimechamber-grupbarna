import { motion } from 'framer-motion';

// JotForm EU form id — Campus Timechamber 2026 (inscripción formal)
const JOTFORM_FORM_ID = '260962500106347';
const JOTFORM_URL = `https://eu.jotform.com/${JOTFORM_FORM_ID}`;

export default function Inscripcion() {
  return (
    <section id="inscripcion" className="py-20 md:py-28">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-gold text-black">
            Inscripción
          </span>
          <h2 className="font-display mt-5 text-4xl md:text-6xl tracking-wider">
            Asegura <span className="text-gradient-gold">tu plaza</span>
          </h2>
          <p className="mt-5 text-muted">
            Completa el formulario y aseguras tu plaza en el campus más exclusivo de Barcelona.
            Plazas limitadas por semana y categoría.
          </p>
        </motion.div>

        <div className="mt-12 jotform-frame">
          <iframe
            src={JOTFORM_URL}
            title="Formulario de inscripción Campus Timechamber 2026"
            loading="lazy"
            allow="payment"
          />
        </div>
      </div>
    </section>
  );
}
