import LogoRioBotz from "../assets/logo-riobotz.svg";

function Footer() {
  return (
    <footer className="mt-auto text-center text-gray-400 text-xs pt-8 pb-4">
      <img
        src={LogoRioBotz}
        alt="Logo RioBotz"
        className="h-7 mx-auto mb-2 opacity-70"
      />
      <p>
        R. Marquês de São Vicente, 225 - Gávea, Rio de Janeiro - RJ, 22451-900
      </p>
      <p>contact@riobotz.com</p>
    </footer>
  );
}

export default Footer;
