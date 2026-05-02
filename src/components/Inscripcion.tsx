import { motion } from 'framer-motion';

// Cuando Ana cree el form en Fillout, sustituir FILLOUT_FORM_ID por el id real.
// Embed format: https://forms.fillout.com/t/<formId>
const FILLOUT_FORM_ID = '4hMJiqdHvjus';

export default function Inscripcion() {
  const filloutUrl = FILLOUT_FORM_ID
    ? `https://forms.fillout.com/t/${FILLOUT_FORM_ID}`
    : '';

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

        <div className="mt-12 fillout-frame">
          {filloutUrl ? (
            <iframe
              src={filloutUrl}
              title="Formulario de inscripción Campus Timechamber 2026"
              loading="lazy"
              allow="payment"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
              <div>
                <p className="text-muted text-sm">
                  Formulario en preparación. Mientras tanto, escríbenos por WhatsApp para reservar
                  tu plaza:
                </p>
                <a
                  href="https://wa.me/34698425153?text=Hola%2C%20me%20interesa%20el%20Campus%20Timechamber%20Experience%202026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold mt-6"
                >
                  WhatsApp +34 698 425 153
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
