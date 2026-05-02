import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Methodology from './components/Methodology';
import WeekTimeline from './components/WeekTimeline';
import Coaches from './components/Coaches';
import Pricing from './components/Pricing';
import Inscripcion from './components/Inscripcion';
import Location from './components/Location';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="min-h-screen bg-bg text-fg">
      <Nav />
      <Hero />
      <Stats />
      <Methodology />
      <WeekTimeline />
      <Coaches />
      <Pricing />
      <Inscripcion />
      <Location />
      <Footer />
    </main>
  );
}
