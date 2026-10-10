import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import TrackScroll from "@/components/TrackScroll";
import Stats from "@/components/Stats";
import Timeline from "@/components/Timeline";
import RaceCalendar from "@/components/RaceCalendar";
import Merch from "@/components/Merch";
import IntroLights from "@/components/IntroLights";
import Cursor from "@/components/Cursor";
import RevealHeadings from "@/components/RevealHeadings";
import CarSection from "@/components/CarSection";
import Gallery from "@/components/Gallery";
import Standings from "@/components/Standings";
import PitGame from "@/components/PitGame";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <IntroLights />
      <Cursor />
      <RevealHeadings />
      <SmoothScroll />
      <Nav />
      <Hero />
      <Marquee text="Car 27 · Helix Racing" />
      <TrackScroll />
      <CarSection />
      <Stats />
      <Gallery />
      <Timeline />
      <RaceCalendar />
      <Standings />
      <PitGame />
      <Merch />
      <Footer />
    </main>
  );
}
