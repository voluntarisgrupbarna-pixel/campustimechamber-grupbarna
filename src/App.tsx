import Nav from './components/Nav';
import Hero from './components/Hero';
import Snowfall from './components/Snowfall';
import Footer from './components/Footer';
import WhatsAppCTA from './components/WhatsAppCTA';
import { Stats, Methodology, Schedule, Coaches, Pricing, Inscripcion, Location } from './components/Sections';
import { useCampus } from './campus/useCampus';

export default function App() {
  const [campus, select] = useCampus();

  return (
    <main className="min-h-screen bg-bg text-fg">
      {campus.id === 'navidad' && <Snowfall />}
      <Nav campus={campus} onSelect={select} />
      <Hero campus={campus} />
      <Stats campus={campus} />
      <Methodology campus={campus} />
      <Schedule campus={campus} />
      <Coaches campus={campus} />
      <Pricing campus={campus} />
      <Inscripcion campus={campus} />
      <Location />
      <Footer />
      <WhatsAppCTA key={campus.id} origin={`web-${campus.id}`} campusName={campus.whatsapp.campusName} semanas={campus.whatsapp.items} />
    </main>
  );
}
