import { Link } from "react-router-dom";

function UnderConstruction({ title = "Página", description }) {
  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans overflow-x-hidden">
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-20 left-10 transform -rotate-12">
            <svg
              className="w-64 h-64 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.325 3.05a2.1 2.1 0 012.35 0l5.85 4.15a2.1 2.1 0 01.8 1.6v6.4a2.1 2.1 0 01-.8 1.6l-5.85 4.15a2.1 2.1 0 01-2.35 0l-5.85-4.15a2.1 2.1 0 01-.8-1.6V8.8a2.1 2.1 0 01.8-1.6l5.85-4.15z" />
            </svg>
          </div>
          <div className="absolute bottom-20 right-10 transform rotate-45">
            <svg
              className="w-80 h-80 text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>

        <div className="max-w-3xl w-full text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="bg-yellow-500 p-8 rounded-full shadow-[0_0_50px_rgba(250,204,21,0.3)] animate-pulse">
                <svg
                  className="w-20 h-20 text-[#0a1945]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-600 p-3 rounded-xl border-4 border-[#0a1945] animate-bounce">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-white font-black text-4xl md:text-6xl uppercase tracking-tighter mb-4">
            {title}
          </h1>

          <div className="inline-block bg-yellow-500 text-[#0a1945] font-black px-4 py-1 uppercase tracking-widest text-sm mb-8 transform -rotate-1">
            Área em Manutenção
          </div>

          <p className="text-gray-300 font-medium text-lg md:text-xl leading-relaxed mb-12">
            {description ||
              "Nossos engenheiros estão ajustando os últimos parafusos desta seção. Em breve, novidades bônus estarão disponíveis!"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
              <div className="w-2 h-12 bg-blue-500 rounded-full"></div>
              <div className="text-left">
                <p className="text-white font-bold italic uppercase text-sm">
                  Status do Sistema
                </p>
                <p className="text-blue-400 font-black uppercase">
                  Em Pitch-Stop
                </p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
              <div className="w-2 h-12 bg-yellow-500 rounded-full"></div>
              <div className="text-left">
                <p className="text-white font-bold italic uppercase text-sm">
                  Próxima Atualização
                </p>
                <p className="text-yellow-400 font-black italic uppercase">
                  Em breve
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-[#0a1945] font-bold py-3 px-8 rounded-full transition-all hover:scale-105"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Ir para Landing Page
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 text-white font-bold py-3 px-8 rounded-full border-2 border-white/20 transition-all hover:border-white/40"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Voltar ao Login
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 w-full overflow-hidden whitespace-nowrap opacity-20 h-8 flex">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex flex-shrink-0">
              <div className="bg-yellow-500 w-12 h-full transform -skew-x-12 mx-2"></div>
              <div className="bg-black w-12 h-full transform -skew-x-12 mx-2"></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default UnderConstruction;
