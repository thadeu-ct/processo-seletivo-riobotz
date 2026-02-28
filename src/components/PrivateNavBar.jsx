import { useState } from "react";
import { Link } from "react-router-dom";

function PrivateNavBar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-10 text-white font-bold whitespace-nowrap">
        <Link
          to="/calendario"
          className="hover:text-yellow-400 transition-colors"
        >
          Calendário
        </Link>
        <Link to="/escolha" className="hover:text-yellow-400 transition-colors">
          Áreas
        </Link>
        <Link to="/home" className="hover:text-yellow-400 transition-colors">
          Workshops
        </Link>
      </nav>

      <div className="flex items-center gap-3 md:gap-6 z-50">
        <div className="flex items-center gap-1.5 md:gap-2 font-black text-yellow-400 bg-yellow-400/10 px-3 md:px-4 py-1.5 rounded-full border border-yellow-400/30">
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm1-13h-2v2H9v2h2v2H9v2h2v2h2v-2h2v-2h-2v-2h2V9h-2V7z" />
          </svg>
          <span className="text-sm md:text-base">150 ₿</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-800 border-2 border-transparent hover:border-yellow-400 transition-all flex items-center justify-center text-white overflow-hidden shadow-lg"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 mt-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 animate-fade-in">
              <div className="px-4 py-3 border-b border-gray-100 mb-1">
                <p className="text-sm text-gray-500">Logado como</p>
                <p className="text-[#0a1945] font-black truncate">
                  Candidato(a)
                </p>
              </div>
              <Link
                to="/perfil"
                onClick={() => setIsProfileOpen(false)}
                className="block px-4 py-2 text-gray-700 font-bold hover:bg-yellow-50 hover:text-[#0a1945] transition-colors"
              >
                Configurações
              </Link>
              <Link
                to="/"
                onClick={() => setIsProfileOpen(false)}
                className="block px-4 py-2 text-red-500 font-bold hover:bg-red-50 transition-colors"
              >
                Sair
              </Link>
            </div>
          )}
        </div>

        <button
          className="text-white hover:text-yellow-400 transition-colors md:hidden block"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0a1945] flex flex-col items-center py-6 gap-6 md:hidden shadow-2xl border-t border-white/10 z-40">
          <Link
            to="/calendario"
            onClick={() => setIsMenuOpen(false)}
            className="text-white font-bold text-xl hover:text-yellow-400"
          >
            Calendário
          </Link>
          <Link
            to="/escolha"
            onClick={() => setIsMenuOpen(false)}
            className="text-white font-bold text-xl hover:text-yellow-400"
          >
            Áreas
          </Link>
          <Link
            to="/home"
            onClick={() => setIsMenuOpen(false)}
            className="text-white font-bold text-xl hover:text-yellow-400"
          >
            Workshops
          </Link>
        </div>
      )}
    </>
  );
}

export default PrivateNavBar;
