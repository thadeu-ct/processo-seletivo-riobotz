import { Link } from "react-router-dom";
import bgHero from "../assets/minotaur-hero.png";

function HeroSection() {
  return (
    <section
      id="topo"
      className="relative flex items-center md:justify-center min-h-[80vh] bg-slate-900 bg-cover bg-center pt-20"
      style={{ backgroundImage: `url(${bgHero})` }}
    >
      <div className="absolute inset-0 bg-[#0a1945]/40 md:bg-[#0a1945]/40"></div>

      <div className="relative z-10 px-8 flex flex-col items-start md:items-center md:text-center text-left w-full max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 italic tracking-wide">
          FAÇA PARTE DA <br />
          <span className="text-yellow-500">RIOBOTZ!</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-lg font-light">
          Participe da equipe de robótica mais premiada do mundo!
        </p>

        <Link
          to="/cadastro"
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold py-4 px-10 rounded-full text-2xl transition-transform hover:scale-105 shadow-lg"
        >
          Inscreva-se!
        </Link>

        <p className="mt-4 text-yellow-400 font-semibold text-lg tracking-wider">
          Inscrições abertas até XX/XX
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
