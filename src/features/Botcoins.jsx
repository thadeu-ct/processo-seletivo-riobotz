import { Link } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";

// Função auxiliar para renderizar os rastros de esteira do robô
const renderTrack = (type) => {
  if (type === "mobile") {
    return (
      <>
        <div className="md:hidden absolute top-0 bottom-0 left-[26px] border-l-[6px] border-dashed border-black/60 z-0 pointer-events-none"></div>
        <div className="md:hidden absolute top-0 bottom-0 left-[42px] border-l-[6px] border-dashed border-black/60 z-0 pointer-events-none"></div>
      </>
    );
  }

  if (type === "curve-right") {
    return (
      <>
        <div className="hidden md:block absolute top-1/2 left-1/2 w-[25vw] max-w-[240px] h-[calc(100%+8rem)] border-t-[8px] border-r-[8px] border-b-[8px] border-dashed border-black/50 rounded-r-[120px] pointer-events-none z-0"></div>
        <div className="hidden md:block absolute top-[calc(50%+20px)] left-1/2 w-[calc(25vw-20px)] max-w-[220px] h-[calc(100%+8rem-40px)] border-t-[8px] border-r-[8px] border-b-[8px] border-dashed border-black/50 rounded-r-[100px] pointer-events-none z-0"></div>
      </>
    );
  }

  if (type === "curve-left") {
    return (
      <>
        <div className="hidden md:block absolute top-1/2 right-1/2 w-[25vw] max-w-[240px] h-[calc(100%+8rem)] border-t-[8px] border-l-[8px] border-b-[8px] border-dashed border-black/50 rounded-l-[120px] pointer-events-none z-0"></div>
        <div className="hidden md:block absolute top-[calc(50%+20px)] right-1/2 w-[calc(25vw-20px)] max-w-[220px] h-[calc(100%+8rem-40px)] border-t-[8px] border-l-[8px] border-b-[8px] border-dashed border-black/50 rounded-l-[100px] pointer-events-none z-0"></div>
      </>
    );
  }

  return null;
};

function Botcoins() {
  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans overflow-hidden">
      <PrivateHeader />

      <main className="flex-grow flex flex-col items-center py-12 px-4 md:px-8 relative w-full max-w-5xl mx-auto">
        <div className="text-center mb-16 md:mb-24 relative z-20">
          <h1 className="text-yellow-400 font-black text-4xl md:text-6xl tracking-tighter uppercase mb-2 drop-shadow-lg">
            A Trilha
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm">
            Seu guia de sobrevivência na seleção
          </p>
        </div>

        <div className="relative w-full max-w-4xl flex flex-col mt-4 pb-32">
          {renderTrack("mobile")}

          {/* ESTAÇÃO 1: O COMBUSTÍVEL */}
          <div className="relative w-full flex flex-col md:flex-row md:items-center h-auto md:h-[250px] mb-16 md:mb-32 group pl-20 md:pl-0">
            {renderTrack("curve-right")}

            <div className="absolute top-1/2 -translate-y-1/2 md:translate-y-0 left-[18px] md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-500 border-4 border-[#0a1945] z-20 shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>

            <div className="md:w-1/2 flex justify-end md:pr-16 z-20 w-full">
              <div className="bg-white/5 backdrop-blur-md border border-blue-500/30 rounded-2xl p-6 w-full max-w-sm hover:bg-white/10 hover:border-blue-400 transition-all shadow-lg group-hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
                  <div className="bg-blue-500/20 p-2.5 rounded-lg text-blue-400">
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
            <div className="hidden md:block md:w-1/2"></div>
          </div>

          {/* ESTAÇÃO 2: COMO FARMAR */}
          <div className="relative w-full flex flex-col md:flex-row md:items-center h-auto md:h-[250px] mb-16 md:mb-32 group pl-20 md:pl-0">
            {renderTrack("curve-left")}

            <div className="absolute top-1/2 -translate-y-1/2 md:translate-y-0 left-[18px] md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-green-500 border-4 border-[#0a1945] z-20 shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>

            <div className="hidden md:block md:w-1/2"></div>
            <div className="md:w-1/2 flex justify-start md:pl-16 z-20 w-full">
              <div className="bg-white/5 backdrop-blur-md border border-green-500/30 rounded-2xl p-6 w-full max-w-sm hover:bg-white/10 hover:border-green-400 transition-all shadow-lg group-hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
                  <div className="bg-green-500/20 p-2.5 rounded-lg text-green-400">
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
          </div>

          {/* ESTAÇÃO 3: A ELIMINAÇÃO */}
          <div className="relative w-full flex flex-col md:flex-row md:items-center h-auto md:h-[250px] group pl-20 md:pl-0">
            <div className="absolute top-1/2 -translate-y-1/2 md:translate-y-0 left-[18px] md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-purple-500 border-4 border-[#0a1945] z-20 shadow-[0_0_15px_rgba(168,85,247,0.6)]"></div>

            <div className="md:w-1/2 flex justify-end md:pr-16 z-20 w-full">
              <div className="bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 w-full max-w-sm hover:bg-white/10 hover:border-purple-400 transition-all shadow-lg group-hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
                  <div className="bg-purple-500/20 p-2.5 rounded-lg text-purple-400">
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
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
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
                  . Se você não atingir a pontuação mínima, seu robô para e você
                  está fora da seleção.
                </p>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2"></div>
          </div>

          {/* BOTÃO FINAL */}
          <div className="relative z-20 mt-24 flex flex-col items-center">
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
