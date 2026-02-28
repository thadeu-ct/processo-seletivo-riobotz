function PublicNavBar() {
  return (
    <nav className="hidden md:flex gap-8 text-white font-medium">
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
  );
}

export default PublicNavBar;
