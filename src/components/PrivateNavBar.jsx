import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import UserDropdown from "../components/UserDropdown";

function PrivateNavBar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [botcoin, setbotcoin] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const updatebotcoin = () => {
      const storedbotcoin = sessionStorage.getItem("botcoinUsuário");
      if (storedbotcoin) {
        setbotcoin(parseInt(storedbotcoin, 10));
      }
    };

    updatebotcoin();

    window.addEventListener("storage", updatebotcoin);
    window.addEventListener("botcoinUpdated", updatebotcoin);

    return () => {
      window.removeEventListener("storage", updatebotcoin);
      window.removeEventListener("botcoinUpdated", updatebotcoin);
    };
  }, []);

  return (
    <>
      {location.pathname !== "/espera" && (
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-10 text-white font-bold whitespace-nowrap">
          <Link
            to="/calendario"
            className="hover:text-yellow-400 transition-colors"
          >
            Calendário
          </Link>
          <Link
            to="/escolha"
            className="hover:text-yellow-400 transition-colors"
          >
            Áreas
          </Link>
          <Link to="/home" className="hover:text-yellow-400 transition-colors">
            Workshops
          </Link>
        </nav>
      )}

      <div className="flex items-center gap-3 md:gap-6 z-50">
        {location.pathname !== "/espera" && (
          <Link
            to="/botcoins"
            className="flex items-center gap-1.5 md:gap-2 font-black text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20 px-3 md:px-4 py-1.5 rounded-full border border-yellow-400/30 transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm1-13h-2v2H9v2h2v2H9v2h2v2h2v-2h2v-2h-2v-2h2V9h-2V7z" />
            </svg>
            <span className="text-sm md:text-base">{botcoin} ₿</span>
          </Link>
        )}

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
            <UserDropdown onClose={() => setIsProfileOpen(false)} />
          )}
        </div>

        {location.pathname !== "/espera" && (
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
        )}
      </div>

      {location.pathname !== "/espera" && isMenuOpen && (
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
