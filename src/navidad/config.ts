// Datos editables del Campus de Navidad. Provisionales hasta confirmar con la junta:
// fechas, turnos y formulario de inscripción.

// ID del formulario JotForm de Navidad. Vacío = se muestra el botón de WhatsApp en su lugar.
export const JOTFORM_FORM_ID = '';

export const CAMPUS_NAME = 'Campus de Navidad Timechamber 2026';

export const TURNOS = [
  {
    n: 1,
    name: 'Santa Skills',
    dates: '22 – 23 Dic',
    desc: 'Fundamentos y técnica individual para arrancar las vacaciones con ritmo.',
  },
  {
    n: 2,
    name: 'Winter Shooting',
    dates: '28 – 30 Dic',
    desc: 'Mecánica, ritmo y confianza de tiro. Concurso de triples de fin de año.',
  },
  {
    n: 3,
    name: 'Three Kings Showdown',
    dates: '4 – 5 Ene',
    desc: 'Torneo 3x3 y retos por equipos para cerrar las fiestas por todo lo alto.',
  },
];

export const WHATSAPP_TURNOS = [
  ...TURNOS.map((t) => ({
    id: `N${t.n}`,
    label: `N${t.n} · ${t.dates} · ${t.name}`,
    estado: 'disponible',
  })),
  { id: 'no-se', label: 'No lo sé aún · cuéntame', estado: 'info' },
];
