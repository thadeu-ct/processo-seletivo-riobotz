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
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans">
      <PrivateHeader />

      <main className="flex-grow flex flex-col items-center py-8 px-4 md:px-8 relative">
        <div className="w-full max-w-4xl mb-8">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 font-bold transition-colors"
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
        </div>

        <div className="w-full max-w-4xl flex flex-col items-center mb-12">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-yellow-400/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(250,204,21,0.3)] animate-pulse">
            <svg
              className="w-16 h-16 md:w-20 md:h-20 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.64-2.25 1.64-1.74 0-2.33-.97-2.4-1.92H7.86c.07 1.9 1.4 3.01 3.04 3.39V19h2.36v-1.63c1.67-.35 2.86-1.43 2.86-3.03 0-2.21-1.85-2.78-3.49-3.2z" />
            </svg>
          </div>
          <h1 className="text-white font-black text-4xl md:text-5xl tracking-wide uppercase mb-2">
            Sua Carteira
          </h1>
          <div className="text-yellow-400 font-black text-5xl md:text-7xl tracking-tighter">
            {botcoins}{" "}
            <span className="text-3xl md:text-4xl text-yellow-500/80">₿</span>
          </div>
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white/15 transition-colors group">
            <div className="bg-blue-500/20 p-4 rounded-full text-blue-400 mb-6 group-hover:scale-110 transition-transform">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-extrabold text-white text-xl mb-3">
              O que são?
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Botcoins representam o seu engajamento. Quanto mais você
              participa, aprende e interage, mais moedas acumula.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white/15 transition-colors group">
            <div className="bg-green-500/20 p-4 rounded-full text-green-400 mb-6 group-hover:scale-110 transition-transform">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-extrabold text-white text-xl mb-3">
              Como conseguir?
            </h3>
            <ul className="text-gray-300 text-sm leading-relaxed space-y-2 text-left list-disc list-inside w-full">
              <li>Participando de workshops.</li>
              <li>Gabaritando os quizzes.</li>
              <li>Resolvendo missões práticas.</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white/15 transition-colors group">
            <div className="bg-purple-500/20 p-4 rounded-full text-purple-400 mb-6 group-hover:scale-110 transition-transform">
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
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 className="font-extrabold text-white text-xl mb-3">
              Para que servem?
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Definem o seu lugar no ranking geral de engajamento! Cuidado: não
              atingir o mínimo necessário te elimina da seleção.
            </p>
          </div>
        </div>

        <div className="w-full max-w-4xl mt-12 flex justify-center">
          <Link
            to="/home"
            className="bg-yellow-500 hover:bg-yellow-400 text-[#0a1945] font-black py-4 px-12 rounded-xl transition-transform hover:scale-105 uppercase tracking-widest shadow-[0_0_20px_rgba(250,204,21,0.4)]"
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
