import Nav from './Nav';
import Hero from './Hero';
import Snowfall from './Snowfall';
import { Stats, Methodology, Turnos, Pricing, Inscripcion, Location } from './Sections';
import Footer from '../components/Footer';
import WhatsAppCTA from '../components/WhatsAppCTA';
import { CAMPUS_NAME, WHATSAPP_TURNOS } from './config';

export default function App() {
  return (
    <main className="min-h-screen bg-bg text-fg">
      <Snowfall />
      <Nav />
      <Hero />
      <Stats />
      <Methodology />
      <Turnos />
      <Pricing />
      <Inscripcion />
      <Location />
      <Footer />
      <WhatsAppCTA origin="web-navidad" campusName={CAMPUS_NAME} semanas={WHATSAPP_TURNOS} />
    </main>
  );
}
