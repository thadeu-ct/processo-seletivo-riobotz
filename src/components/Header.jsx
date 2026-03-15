import { Link } from "react-router-dom";
import LogoRioBotz from "../assets/logo-riobotz.svg";

function Header({ children, logoLink = "/" }) {
  return (
    <header className="flex justify-between items-center px-3 sm:px-6 py-4 sm:py-6 bg-[#0a1945] relative z-50">
      <Link to={logoLink} className="z-10">
        <img
          src={LogoRioBotz}
          alt="Logo RioBotz"
          className="h-6 sm:h-8 md:h-10 hover:scale-105 transition-transform"
        />
      </Link>

      <div className="flex items-center z-10">{children}</div>
    </header>
  );
}

export default Header;
