import { useState } from "react";
import { Link } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";

function Botcoins() {
  const [botcoins] = useState(() => {
    const storedBotcoins = localStorage.getItem("botcoinUsuario");
    return storedBotcoins ? parseInt(storedBotcoins, 10) : 0;
  });

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans overflow-hidden">
      <PrivateHeader />

      <main className="flex-grow flex flex-col items-center py-8 px-4 md:px-8 relative w-full max-w-5xl mx-auto">
        <div className="w-full flex justify-between items-center mb-16 z-20">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 font-bold transition-colors bg-[#0a1945] px-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar
          </Link>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-sm">
            <span className="text-gray-400 font-bold text-sm tracking-wide uppercase">
              Carteira:
            </span>
            <div className="text-yellow-400 font-black text-2xl flex items-center gap-1">
              {botcoins} <span className="text-yellow-500/80 text-lg">₿</span>
            </div>
          </div>
        </div>

        <div className="relative w-full flex flex-col items-center mt-8 pb-32">
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 flex justify-between z-0 opacity-20 pointer-events-none">
            <div className="w-3 h-full border-l-[6px] border-dashed border-black"></div>
            <div className="w-3 h-full border-r-[6px] border-dashed border-black"></div>
          </div>

          <div className="relative z-10 w-full max-w-3xl flex flex-col gap-24 md:gap-32">
            <div className="flex flex-col md:flex-row items-center md:items-start w-full relative group">
              <div className="md:w-1/2 flex justify-end md:pr-16 z-20 w-full mb-8 md:mb-0">
                <div className="bg-white/10 backdrop-blur-md border-2 border-blue-500/30 rounded-2xl p-6 w-full max-w-sm hover:bg-blue-900/40 hover:border-blue-400 transition-all shadow-[0_0_30px_rgba(59,130,246,0.1)] group-hover:scale-105 group-hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
                    <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-extrabold text-white text-xl">
                      O Combustível
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed font-medium">
                    Botcoins (₿) representam a sua energia dentro da seleção.
                    Quanto mais você participa, estuda e interage com a equipe,
                    mais o seu tanque enche.
                  </p>
                </div>
              </div>

              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full z-20 border-4 border-[#0a1945] items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="md:w-1/2"></div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center md:items-start w-full relative group">
              <div className="md:w-1/2 flex justify-start md:pl-16 z-20 w-full mb-8 md:mb-0">
                <div className="bg-white/10 backdrop-blur-md border-2 border-green-500/30 rounded-2xl p-6 w-full max-w-sm hover:bg-green-900/40 hover:border-green-400 transition-all shadow-[0_0_30px_rgba(34,197,94,0.1)] group-hover:scale-105 group-hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
                    <div className="bg-green-500/20 p-3 rounded-xl text-green-400">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-extrabold text-white text-xl">
                      Como Farmar?
                    </h3>
                  </div>
                  <ul className="text-gray-300 text-sm leading-relaxed space-y-3 font-medium">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">▸</span> Marcar
                      presença nos Workshops
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">▸</span> Gabaritar
                      os Quizzes online
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">▸</span> Resolver
                      missões nos laboratórios
                    </li>
                  </ul>
                </div>
              </div>

              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full z-20 border-4 border-[#0a1945] items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="md:w-1/2"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start w-full relative group">
              <div className="md:w-1/2 flex justify-end md:pr-16 z-20 w-full mb-8 md:mb-0">
                <div className="bg-white/10 backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-6 w-full max-w-sm hover:bg-red-900/40 hover:border-red-400 transition-all shadow-[0_0_30px_rgba(239,68,68,0.1)] group-hover:scale-105 group-hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
                    <div className="bg-red-500/20 p-3 rounded-xl text-red-400">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-extrabold text-white text-xl">
                      A Eliminação
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed font-medium">
                    Sua carteira define seu lugar no{" "}
                    <span className="text-white font-bold">
                      Ranking de Engajamento
                    </span>
                    . Se você não atingir a pontuação mínima ao final da fase,
                    seu robô para e você está fora da seleção.
                  </p>
                </div>
              </div>

              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full z-20 border-4 border-[#0a1945] items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="md:w-1/2"></div>
            </div>
          </div>

          <div className="relative z-20 mt-16 flex flex-col items-center">
            <div className="w-16 h-16 bg-[#0a1945] border-[6px] border-[#0a1945] rounded-full flex items-center justify-center z-20 mb-[-32px]">
              <div className="w-full h-full bg-yellow-400 rounded-full animate-bounce shadow-[0_0_20px_rgba(250,204,21,0.6)]"></div>
            </div>

            <Link
              to="/home"
              className="bg-yellow-500 hover:bg-yellow-400 text-[#0a1945] font-black py-5 px-16 rounded-2xl transition-all hover:scale-105 uppercase tracking-widest text-lg shadow-[0_10px_30px_rgba(250,204,21,0.2)] border-b-4 border-yellow-600 hover:border-yellow-500 active:border-b-0 active:translate-y-1"
            >
              Iniciar a Trilha
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Botcoins;
