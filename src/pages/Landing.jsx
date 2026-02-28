import PublicHeader from "../components/PublicHeader";
import HeroSection from "../features/HeroSection";
import CombatCarousel from "../features/CombatCarousel";
import AboutTeam from "../features/AboutTeam";
import Footer from "../components/Footer";
import CallToAction from "../features/CallToAction";

function Landing() {
  return (
    <div className="min-h-screen bg-[#0a1945]">
      <PublicHeader />
      <div>
        <HeroSection />
        <CombatCarousel />
        <AboutTeam />
        <CallToAction />
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
