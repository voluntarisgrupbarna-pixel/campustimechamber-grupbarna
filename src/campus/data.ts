// Un campus = un objeto. Para añadir uno nuevo: añade su entrada aquí y su tema en src/index.css.
// Navidad y Semana Santa son provisionales (fechas, turnos y textos) hasta confirmarlos con la junta.

export type CampusId = 'navidad' | 'semana-santa' | 'verano';
export type IconKey = 'trophy' | 'target' | 'zap' | 'users' | 'gift' | 'sun' | 'sparkles' | 'snowflake' | 'egg';

export type Campus = {
  id: CampusId;
  label: string;
  icon: IconKey;
  name: string;
  /** Inscripción abierta. Si es false se muestra "avísame de la próxima edición". */
  open: boolean;
  seo: { title: string; description: string; start: string; end: string };
  hero: { badge: string; line1: string; line2: string; tagline: string; text: string; dates: string; cta: string };
  stats: { value: string; label: string }[];
  methodology: { tag: string; title: [string, string]; text: string; pillars: { icon: IconKey; title: string; text: string }[] };
  schedule: { tag: string; title: [string, string]; text: string; unit: string; items: { name: string; dates: string; desc: string }[] };
  coaches?: { name: string; role: string; handle: string; bio: string }[];
  pricing: { text: string; code?: string; tiers: { name: string; desc: string; features: string[]; highlight: boolean }[] };
  /** Formulario de inscripción: URL embebida (Salesforce) o formulario de JotForm. Vacío = WhatsApp. */
  form: { kind: 'iframe' | 'jotform' | 'none'; src: string };
  whatsapp: { campusName: string; items: { id: string; label: string; estado: string }[] };
};

const wa = (prefix: string, items: { name: string; dates: string }[]) => [
  ...items.map((t, i) => ({ id: `${prefix}${i + 1}`, label: `${prefix}${i + 1} · ${t.dates} · ${t.name}`, estado: 'disponible' })),
  { id: 'no-se', label: 'No lo sé aún · cuéntame', estado: 'info' },
];

const navidadItems = [
  { name: 'Santa Skills', dates: '22 – 23 Dic', desc: 'Fundamentos y técnica individual para arrancar las vacaciones con ritmo.' },
  { name: 'Winter Shooting', dates: '28 – 30 Dic', desc: 'Mecánica, ritmo y confianza de tiro. Concurso de triples de fin de año.' },
  { name: 'Three Kings Showdown', dates: '4 – 5 Ene', desc: 'Torneo 3x3 y retos por equipos para cerrar las fiestas por todo lo alto.' },
];

const pascuaItems = [
  { name: 'Easter Basics', dates: '22 – 23 Mar', desc: 'Fundamentos y técnica individual para empezar la primavera en pista.' },
  { name: 'Golden Egg Showdown', dates: '24 – 25 Mar', desc: 'Retos por equipos, 3x3 y la búsqueda del huevo de oro para cerrar la semana.' },
];

const veranoItems = [
  { name: 'Timechamber Basics', dates: '23 – 27 Jun', desc: 'Fundamentos sólidos para un juego de élite.' },
  { name: 'Shooting Academy', dates: '30 Jun – 4 Jul', desc: 'Mecánica, ritmo y confianza de tiro.' },
  { name: 'Ballhandling Lab', dates: '7 – 11 Jul', desc: 'Control de balón al máximo nivel.' },
  { name: 'One on One Mastery', dates: '14 – 18 Jul', desc: 'Domina el 1v1. Fintas y creatividad ofensiva.' },
  { name: 'Flow Camp', dates: '21 – 25 Jul', desc: 'Fluidez ofensiva y juego en movimiento.' },
  { name: 'Skills Lab Experience', dates: '28 Jul – 1 Ago', desc: 'Integración total. El broche de oro.' },
];

const tiersDia = (extra: string) => [
  {
    name: 'Día Completo',
    desc: `Jornada completa de campus con almuerzo y ${extra}.`,
    features: ['Servicio de acogida', 'Almuerzo incluido', 'Sorpresa de campus', 'Material oficial Timechamber'],
    highlight: true,
  },
  {
    name: 'Media Jornada',
    desc: 'Sesión de mañana intensiva, sin servicio de comedor.',
    features: ['Entrenamiento técnico', 'Material oficial Timechamber', 'Apto para iniciación'],
    highlight: false,
  },
];

export const CAMPUSES: Campus[] = [
  {
    id: 'navidad',
    label: 'Navidad',
    icon: 'snowflake',
    name: 'Campus de Navidad Timechamber 2026',
    open: true,
    seo: {
      title: 'Campus de Navidad Timechamber 2026 · Baloncesto Barcelona | CB Grup Barna',
      description:
        'Campus de Navidad de baloncesto en Barcelona con metodología NBA. Del 22 de diciembre al 5 de enero en La Nau del Clot. Plazas limitadas.',
      start: '2026-12-22',
      end: '2027-01-05',
    },
    hero: {
      badge: 'Plazas limitadas · Navidad 2026',
      line1: 'TIMECHAMBER',
      line2: 'CHRISTMAS CAMP',
      tagline: 'BARCELONA · WINTER 2026',
      text: 'Estas Navidades, baloncesto con metodología NBA en La Nau del Clot. Entrena, juega y celebra las fiestas con tu equipo.',
      dates: '22 Dic – 5 Ene',
      cta: 'Ver turnos',
    },
    stats: [
      { value: '3', label: 'Turnos navideños' },
      { value: 'NBA', label: 'Metodología' },
      { value: '1965', label: 'Club del Clot' },
      { value: '🎁', label: 'Sorpresas de Navidad' },
    ],
    methodology: {
      tag: 'Excelencia',
      title: ['Baloncesto ', 'en modo Navidad'],
      text: 'Lo mejor del campus de verano, con la magia de las fiestas: aprender baloncesto de verdad mientras se disfruta la Navidad.',
      pillars: [
        { icon: 'trophy', title: 'Metodología NBA', text: 'Entrenamientos con técnicas y referencias del baloncesto profesional americano.' },
        { icon: 'zap', title: 'Intensidad con sonrisa', text: 'Sesiones de alto ritmo adaptadas por edad. Esfuerzo, mejora y diversión.' },
        { icon: 'gift', title: 'Espíritu navideño', text: 'Concursos de triples, retos por equipos, chocolatada y sorpresas durante el campus.' },
        { icon: 'users', title: 'Staff Timechamber', text: 'Entrenadores del club y del equipo Timechamber, con grupos por edad y nivel.' },
      ],
    },
    schedule: { tag: 'Programa', title: ['3 turnos, ', '3 regalos'], text: 'Cada turno tiene identidad propia. Apúntate a uno o vive todas las Navidades en pista.', unit: 'Turno', items: navidadItems },
    pricing: { text: 'Reserva tu plaza con una parte del importe; el resto, antes del inicio del campus.', tiers: tiersDia('actividades navideñas') },
    form: { kind: 'iframe', src: import.meta.env.VITE_SF_FORM_NAVIDAD || '' },
    whatsapp: { campusName: 'Campus de Navidad Timechamber 2026', items: wa('N', navidadItems) },
  },
  {
    id: 'semana-santa',
    label: 'Semana Santa',
    icon: 'egg',
    name: 'Campus de Semana Santa Timechamber 2027',
    open: true,
    seo: {
      title: 'Campus de Semana Santa Timechamber 2027 · Baloncesto Barcelona | CB Grup Barna',
      description:
        'Campus de Semana Santa de baloncesto en Barcelona con metodología NBA. Del 22 al 25 de marzo en La Nau del Clot. Plazas limitadas.',
      start: '2027-03-22',
      end: '2027-03-25',
    },
    hero: {
      badge: 'Plazas limitadas · Semana Santa 2027',
      line1: 'TIMECHAMBER',
      line2: 'EASTER CAMP',
      tagline: 'BARCELONA · SPRING 2027',
      text: 'Cuatro días de baloncesto con metodología NBA en La Nau del Clot para aprovechar las vacaciones de primavera.',
      dates: '22 – 25 Mar 2027',
      cta: 'Ver turnos',
    },
    stats: [
      { value: '2', label: 'Turnos de primavera' },
      { value: 'NBA', label: 'Metodología' },
      { value: '1965', label: 'Club del Clot' },
      { value: '🥚', label: 'Huevo de oro' },
    ],
    methodology: {
      tag: 'Excelencia',
      title: ['Baloncesto ', 'de primavera'],
      text: 'La misma metodología del campus de verano en formato corto: intensidad, mejora y mucha diversión en pocos días.',
      pillars: [
        { icon: 'trophy', title: 'Metodología NBA', text: 'Entrenamientos con técnicas y referencias del baloncesto profesional americano.' },
        { icon: 'target', title: 'Foco en una habilidad', text: 'Cada turno trabaja un aspecto concreto: fundamentos, tiro o juego en equipo.' },
        { icon: 'sparkles', title: 'Retos y sorpresas', text: 'Concursos, retos por equipos y la búsqueda del huevo de oro.' },
        { icon: 'users', title: 'Staff Timechamber', text: 'Entrenadores del club y del equipo Timechamber, con grupos por edad y nivel.' },
      ],
    },
    schedule: { tag: 'Programa', title: ['2 turnos, ', '1 gran semana'], text: 'Apúntate a un turno o a los dos. Plazas limitadas por categoría.', unit: 'Turno', items: pascuaItems },
    pricing: { text: 'Reserva tu plaza con una parte del importe; el resto, antes del inicio del campus.', tiers: tiersDia('actividades de primavera') },
    form: { kind: 'iframe', src: import.meta.env.VITE_SF_FORM_SEMANA_SANTA || '' },
    whatsapp: { campusName: 'Campus de Semana Santa Timechamber 2027', items: wa('SS', pascuaItems) },
  },
  {
    id: 'verano',
    label: 'Verano',
    icon: 'sun',
    name: 'Campus Timechamber Experience 2026',
    open: false,
    seo: {
      title: 'Campus Timechamber Experience · Campus de baloncesto Barcelona | CB Grup Barna',
      description:
        'El campus de verano de baloncesto más innovador de Barcelona. 6 semanas con metodología NBA, entrenadores referentes e influencers. La Nau del Clot.',
      start: '2026-06-23',
      end: '2026-08-01',
    },
    hero: {
      badge: 'Edición 2026 · Próximo verano, avísame',
      line1: 'TIMECHAMBER',
      line2: 'EXPERIENCE',
      tagline: 'BARCELONA · SUMMER',
      text: 'El campus de verano de baloncesto más innovador de Barcelona. 6 semanas con metodología NBA, entrenadores referentes e influencers del baloncesto.',
      dates: '23 Jun – 1 Ago 2026',
      cta: 'Ver programa',
    },
    stats: [
      { value: '120+', label: 'Jugadores por edición' },
      { value: '6', label: 'Semanas temáticas' },
      { value: '4.9★', label: 'Satisfacción familias' },
      { value: '3', label: 'Coaches estrella' },
    ],
    methodology: {
      tag: 'Excelencia',
      title: ['Metodología ', 'de élite'],
      text: 'Una propuesta única en Barcelona: combinamos la rigurosidad del baloncesto profesional con la energía y creatividad de los referentes globales del juego.',
      pillars: [
        { icon: 'trophy', title: 'Metodología NBA', text: 'Entrenamientos diseñados con técnicas y referencias del baloncesto profesional americano.' },
        { icon: 'target', title: 'Semanas temáticas', text: 'Cada semana foco en una habilidad: tiro, ballhandling, 1v1, transición, integración.' },
        { icon: 'zap', title: 'Intensidad real', text: 'Sesiones de alto rendimiento adaptadas por edad. Excelencia, esfuerzo y diversión.' },
        { icon: 'users', title: 'Influencers y coaches', text: 'Robert Willet, Ainhoa López y Malak Shady entrenan junto a nuestro staff técnico.' },
      ],
    },
    schedule: { tag: 'Programa', title: ['6 semanas, ', '6 mundos'], text: 'Cada semana tiene identidad propia. Así fue la edición 2026.', unit: 'Semana', items: veranoItems },
    coaches: [
      { name: 'Robert Willet', role: 'NBA Trainer · @bballwillett', handle: 'bballwillett', bio: 'Entrenador de jugadores NBA. Especialista en desarrollo individual y skills de élite.' },
      { name: 'Ainhoa López', role: 'Jugadora profesional · Selección Española', handle: 'ainhoalopez_official', bio: 'Internacional con la Selección Española. Referente del baloncesto femenino.' },
      { name: 'Malak Shady', role: 'Basketball Influencer · MVP 3×3', handle: 'malakshady_22', bio: 'Creador de contenido y MVP del 3×3. Dominio total del 1v1 y la creatividad ofensiva.' },
    ],
    pricing: {
      text: 'Así fue la edición 2026. Solo se abonaba una parte para reservar plaza y el resto antes del inicio.',
      code: 'BARNAAVIAT',
      tiers: [
        {
          name: 'Semana Completa',
          desc: 'Día completo de campus, almuerzo incluido y actividades extra.',
          features: ['Servicio de acogida', 'Almuerzo incluido', 'Excursión viernes Isla Fantasía', 'Material oficial Timechamber'],
          highlight: true,
        },
        { name: 'Media Jornada', desc: 'Sesión de mañana intensiva, sin servicio de comedor.', features: ['Entrenamiento técnico', 'Material oficial Timechamber', 'Apto para iniciación'], highlight: false },
      ],
    },
    form: { kind: 'jotform', src: '260962500106347' },
    whatsapp: {
      campusName: 'Campus Timechamber de verano',
      items: [
        ...veranoItems.map((t, i) => ({ id: `S${i + 1}`, label: `S${i + 1} · ${t.dates} · ${t.name}`, estado: 'disponible' })),
        { id: 'no-se', label: 'No lo sé aún · cuéntame', estado: 'info' },
      ],
    },
  },
];

export const DEFAULT_CAMPUS: CampusId = 'navidad';
export const getCampus = (id: string | null): Campus => CAMPUSES.find((c) => c.id === id) ?? CAMPUSES.find((c) => c.id === DEFAULT_CAMPUS)!;
