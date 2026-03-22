import { Link } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";

function Botcoins() {
  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans overflow-x-hidden">
      <PrivateHeader />

      <main className="flex-grow flex flex-col items-center py-12 relative w-full max-w-6xl mx-auto min-h-[1500px]">
        <div className="text-center mb-16 relative z-30">
          <h1 className="text-yellow-400 font-black text-5xl md:text-7xl tracking-tighter uppercase drop-shadow-2xl">
            A Trilha
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-xs">
            Roadmap de Engajamento
          </p>
        </div>

        {/* TRILHA SVG ORGÂNICA */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1000 1500"
          >
            <defs>
              <pattern
                id="track-pattern"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect width="20" height="8" fill="black" fillOpacity="0.4" />
              </pattern>
            </defs>

            {/* O Caminho em "S" Fluido (Caminho Vermelho da Imagem) */}
            <path
              id="main-path"
              d="M 500 150 
                 C 800 250, 900 450, 500 500 
                 S 100 750, 500 850 
                 S 900 1100, 500 1250
                 L 500 1450"
              fill="none"
              stroke="url(#track-pattern)"
              strokeWidth="40"
              strokeDasharray="0"
            />
            {/* Linha Central de Guia (Opcional para dar brilho) */}
            <path
              d="M 500 150 
                 C 800 250, 900 450, 500 500 
                 S 100 750, 500 850 
                 S 900 1100, 500 1250
                 L 500 1450"
              fill="none"
              stroke="rgba(250,204,21,0.1)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* ESTAÇÕES CRAVADAS NAS COORDENADAS DO PATH */}

        {/* Estação 1: Topo Direita */}
        <div className="absolute top-[280px] left-[50%] md:left-[65%] -translate-x-1/2 z-20 w-full max-w-sm px-4">
          <div className="bg-[#0f235d] border-2 border-blue-500/40 rounded-3xl p-6 shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] p-3 rounded-2xl text-white">
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
              <h3 className="font-black text-white text-xl uppercase italic">
                O Combustível
              </h3>
            </div>
            <p className="text-gray-300 text-sm font-medium">
              Botcoins (₿) são sua energia. Quanto mais você interage com a
              equipe, mais seu tanque enche.
            </p>
          </div>
          {/* Bola de fixação no path */}
          <div className="absolute top-1/2 -left-8 md:-left-12 w-6 h-6 bg-blue-500 rounded-full border-4 border-[#0a1945] shadow-[0_0_20px_blue]" />
        </div>

        {/* Estação 2: Meio Esquerda (Z-INDEX SUPERIOR AO PATH) */}
        <div className="absolute top-[650px] left-[50%] md:left-[35%] -translate-x-1/2 z-30 w-full max-w-sm px-4">
          <div className="bg-[#0f235d] border-2 border-green-500/40 rounded-3xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] p-3 rounded-2xl text-white">
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
              <h3 className="font-black text-white text-xl uppercase italic">
                Como Farmar?
              </h3>
            </div>
            <ul className="text-gray-300 text-sm space-y-2 font-bold">
              <li className="flex items-center gap-2">
                <span className="text-green-400">#</span> Workshops Presenciais
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">#</span> Quizzes de Área
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">#</span> Desafios de Lab
              </li>
            </ul>
          </div>
          {/* Bola de fixação no path */}
          <div className="absolute top-1/2 -right-8 md:-right-12 w-6 h-6 bg-green-500 rounded-full border-4 border-[#0a1945] shadow-[0_0_20px_green]" />
        </div>

        {/* Estação 3: Baixo Direita (Z-INDEX INFERIOR PARA O PATH PASSAR POR CIMA) */}
        <div className="absolute top-[1050px] left-[50%] md:left-[65%] -translate-x-1/2 z-0 w-full max-w-sm px-4 opacity-80 hover:opacity-100 transition-opacity">
          <div className="bg-[#0f235d]/80 border-2 border-purple-500/20 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-500 p-3 rounded-2xl text-white">
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
              <h3 className="font-black text-white text-xl uppercase italic">
                A Arena
              </h3>
            </div>
            <p className="text-gray-300 text-sm">
              Seu engajamento dita sua sobrevivência. Pontuação baixa significa
              fim de jogo na seleção.
            </p>
          </div>
          {/* Bola de fixação no path */}
          <div className="absolute top-1/2 -left-8 md:-left-12 w-6 h-6 bg-purple-500 rounded-full border-4 border-[#0a1945] shadow-[0_0_20px_purple]" />
        </div>

        {/* CHEGADA */}
        <div className="absolute top-[1380px] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(250,204,21,0.5)] animate-bounce border-[8px] border-[#0a1945]">
            <span className="text-[#0a1945] font-black text-2xl">GO!</span>
          </div>
          <Link
            to="/home"
            className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-[#0a1945] font-black py-5 px-20 rounded-2xl transition-all uppercase tracking-[0.2em] text-xl shadow-2xl border-b-8 border-yellow-600 active:border-b-0 active:translate-y-2"
          >
            Bora Farmar!
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Botcoins;
