import { Link } from "react-router-dom";
import LogoRioBotz from "../assets/logo-riobotz.svg";

function Header({ children, logoLink = "/" }) {
  return (
    <header className="flex justify-between items-center px-6 py-6 bg-[#0a1945] relative z-50">
      <Link to={logoLink}>
        <img
          src={LogoRioBotz}
          alt="Logo RioBotz"
          className="h-8 md:h-10 hover:scale-105 transition-transform"
        />
      </Link>

      <div className="flex items-center">{children}</div>
    </header>
  );
}

export default Header;
