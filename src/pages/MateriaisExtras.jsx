import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function MateriaisExtras() {
  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans overflow-x-hidden">
      <PrivateHeader />

      <main className="flex-grow flex flex-col items-center justify-center py-12 px-6 relative">
        {/* Elementos Decorativos de Fundo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-20 left-10 transform -rotate-12">
            <svg className="w-64 h-64 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.325 3.05a2.1 2.1 0 012.35 0l5.85 4.15a2.1 2.1 0 01.8 1.6v6.4a2.1 2.1 0 01-.8 1.6l-5.85 4.15a2.1 2.1 0 01-2.35 0l-5.85-4.15a2.1 2.1 0 01-.8-1.6V8.8a2.1 2.1 0 01.8-1.6l5.85-4.15z" />
            </svg>
          </div>
          <div className="absolute bottom-20 right-10 transform rotate-45">
            <svg className="w-80 h-80 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>

        <div className="max-w-3xl w-full text-center relative z-10">
          {/* Ícone Animado de Construção */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="bg-yellow-500 p-8 rounded-full shadow-[0_0_50px_rgba(250,204,21,0.3)] animate-pulse">
                <svg className="w-20 h-20 text-[#0a1945]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              {/* Mini Robô "trabalhando" */}
              <div className="absolute -bottom-4 -right-4 bg-blue-600 p-3 rounded-xl border-4 border-[#0a1945] animate-bounce">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-white font-black text-4xl md:text-6xl uppercase tracking-tighter mb-4">
            Missões Extras
          </h1>
          
          <div className="inline-block bg-yellow-500 text-[#0a1945] font-black px-4 py-1 uppercase tracking-widest text-sm mb-8 transform -rotate-1">
            Área em Manutenção
          </div>

          <p className="text-gray-300 font-medium text-lg md:text-xl leading-relaxed mb-12">
            Nossos engenheiros estão ajustando os últimos parafusos desta seção. 
            Em breve, você terá acesso a desafios surpresa que valem <span className="text-yellow-400 font-bold">Botcoins bônus!</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
              <div className="w-2 h-12 bg-blue-500 rounded-full"></div>
              <div className="text-left">
                <p className="text-white font-bold italic uppercase text-sm">Status do Sistema</p>
                <p className="text-blue-400 font-black">CALIBRANDO SENSORES</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
              <div className="w-2 h-12 bg-yellow-500 rounded-full"></div>
              <div className="text-left">
                <p className="text-white font-bold italic uppercase text-sm">Próxima Atualização</p>
                <p className="text-yellow-400 font-black italic">EM BREVE</p>
              </div>
            </div>
          </div>

          <Link
            to="/home"
            className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 text-white font-bold py-3 px-8 rounded-full border-2 border-white/20 transition-all hover:border-white/40"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para a Jornada
          </Link>
        </div>

        {/* Fita de isolamento no rodapé da main */}
        <div className="absolute bottom-0 w-full overflow-hidden whitespace-nowrap opacity-20 h-8 flex">
           {[...Array(10)].map((_, i) => (
             <div key={i} className="flex flex-shrink-0">
               <div className="bg-yellow-500 w-12 h-full transform -skew-x-12 mx-2"></div>
               <div className="bg-black w-12 h-full transform -skew-x-12 mx-2"></div>
             </div>
           ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MateriaisExtras;
