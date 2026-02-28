import { Link } from "react-router-dom";
import Header from "./Header";

function PublicHeader() {
  return (
    <Header logoLink="/">
      <nav className="flex absolute left-1/2 transform -translate-x-1/2 items-center gap-3 md:gap-10 text-white font-bold text-sm md:text-base whitespace-nowrap">
        <a href="#combates" className="hover:text-yellow-400 transition-colors">
          Combates
        </a>
        <a href="#equipe" className="hover:text-yellow-400 transition-colors">
          A Equipe
        </a>
        <a href="#palestra" className="hover:text-yellow-400 transition-colors">
          Palestra
        </a>
      </nav>
      <div className="flex items-center">
        <Link
          to="/login"
          className="text-white font-extrabold text-base md:text-xl tracking-wide hover:text-yellow-400 transition-colors"
        >
          Entrar
        </Link>
      </div>
    </Header>
  );
}

export default PublicHeader;
