import { useState } from "react";
import { Link } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";

const areasDaEquipe = [
  {
    id: "autonomos",
    nome: "Autônomos",
    descricao:
      "A área dos sensores. Aqui você vai projetar, soldar e programar seu sumô ou seguidor de linha. Uso de arduino, ESP e linguagens como C e C++.",
    pos: { top: "10%", left: "50%" },
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    ),
    iconeGigante: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    ),
    corGigante: "text-green-400",
    animacaoClass: "anim-shake",
  },
  {
    id: "eletronica",
    nome: "Eletrônica",
    descricao:
      "O sistema nervoso dos robôs de combate! Projetar eletrônicas, soldar componentes, lidar com motores e garantir que a corrente flua pelo robô sem queimar ele.",
    pos: { top: "38%", left: "88%" },
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
    iconeGigante: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
    corGigante: "text-yellow-400",
    animacaoClass: "anim-dash",
  },
  {
    id: "comunicacao",
    nome: "Comunicação",
    descricao:
      "A voz da equipe! Cuidando do audiovisual, design de posts, marketing, gestão de redes sociais e cobertura de eventos para os nossos seguidores.",
    pos: { top: "88%", left: "73%" },
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    ),
    iconeGigante: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      />
    ),
    corGigante: "text-fuchsia-400",
    animacaoClass: "anim-flash",
  },
  {
    id: "gestao",
    nome: "Gestão",
    descricao:
      "A organização da equipe. Logística de viagens, controle financeiro, contato com patrocinadores e planejamento da equipe.",
    pos: { top: "88%", left: "27%" },
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
    iconeGigante: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    corGigante: "text-cyan-400",
    animacaoClass: "anim-flip",
  },
  {
    id: "mecanica",
    nome: "Mecânica",
    descricao:
      "A armadura e os músculos. Projetar em SolidWorks, usar maquinários e construir a projetos capazes de resistir aos impactos das arenas.",
    pos: { top: "38%", left: "12%" },
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
    ),
    iconeGigante: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
    ),
    corGigante: "text-orange-400",
    animacaoClass: "anim-spin-slow",
  },
];

function EscolhaAreas() {
  const [selecionadas, setSelecionadas] = useState([]);
  const [areaEmDestaque, setAreaEmDestaque] = useState(null);

  const toggleArea = (id) => {
    setSelecionadas((prev) =>
      prev.includes(id)
        ? prev.filter((areaId) => areaId !== id)
        : [...prev, id],
    );
  };

  const areaCentral =
    areaEmDestaque ||
    (selecionadas.length > 0
      ? areasDaEquipe.find(
          (a) => a.id === selecionadas[selecionadas.length - 1],
        )
      : null);

  const isCentralSelecionada =
    areaCentral && selecionadas.includes(areaCentral.id);

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans">
      <style>{`
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        .anim-spin-slow { animation: spin-slow 8s linear infinite; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px) rotate(-3deg); }
          75% { transform: translateX(3px) rotate(3deg); }
        }
        .anim-shake { animation: shake 0.4s infinite; }

        @keyframes flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.1; }
        }
        .anim-flash { animation: flash 1s infinite; }

        @keyframes flip {
          0%, 100% { transform: perspective(400px) rotateY(0deg); }
          50% { transform: perspective(400px) rotateY(180deg); }
        }
        .anim-flip { animation: flip 3s ease-in-out infinite; }

        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
        .anim-dash {
          stroke-dasharray: 10;
          animation: dash 1.5s linear infinite;
        }
      `}</style>

      <PrivateHeader />

      <main className="flex-grow flex flex-col items-center py-10 px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-white font-black text-3xl md:text-5xl mb-4 tracking-tight">
            ESCOLHA SUAS ÁREAS DE INTERESSE
          </h1>
          <p className="text-gray-300 font-medium text-lg max-w-2xl mx-auto">
            A RioBotz funciona com áreas integradas. Você pode focar em uma
            especialidade ou atuar em múltiplas frentes. Selecione as áreas que
            você quer fazer parte!
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl mb-16">
          <div className="relative w-80 h-80 md:w-96 md:h-96 shrink-0">
            <svg
              className="absolute top-0 left-0 w-full h-full text-blue-900/40 z-0"
              viewBox="0 0 100 100"
            >
              <polygon
                points="50,10 88,38 73,88 27,88 12,38"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 pointer-events-none flex items-center justify-center z-0 transition-all duration-300">
              {areaCentral ? (
                <svg
                  key={areaCentral.id}
                  className={`w-full h-full transition-all duration-500 ${areaCentral.corGigante} ${areaCentral.animacaoClass} ${
                    isCentralSelecionada
                      ? "opacity-90 drop-shadow-[0_0_15px_currentColor]"
                      : "opacity-30"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {areaCentral.iconeGigante}
                </svg>
              ) : (
                <div className="w-4 h-4 rounded-full bg-blue-900/30 animate-pulse"></div>
              )}
            </div>

            {areasDaEquipe.map((area) => {
              const isSelected = selecionadas.includes(area.id);

              return (
                <button
                  key={area.id}
                  onClick={() => toggleArea(area.id)}
                  onMouseEnter={() => setAreaEmDestaque(area)}
                  onMouseLeave={() => setAreaEmDestaque(null)}
                  style={{
                    top: area.pos.top,
                    left: area.pos.left,
                    transform: "translate(-50%, -50%)",
                  }}
                  className={`absolute z-10 w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center gap-1 border-4 transition-all duration-300 shadow-xl
                    ${
                      isSelected
                        ? "bg-yellow-400 border-yellow-300 text-[#0a1945] scale-110 shadow-yellow-400/50"
                        : "bg-[#0a1945] border-blue-500 text-blue-400 hover:border-yellow-400 hover:text-yellow-400 hover:scale-105"
                    }
                  `}
                >
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {area.icon}
                  </svg>
                  <span
                    className={`text-[10px] md:text-xs font-black uppercase ${isSelected ? "text-[#0a1945]" : "text-white"}`}
                  >
                    {area.nome}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-full max-w-md h-48 md:h-64 bg-white rounded-2xl p-6 shadow-2xl border-b-8 border-yellow-400 flex flex-col justify-center items-center text-center transition-all">
            {areaCentral ? (
              <div className="animate-fade-in">
                <h2 className="text-[#0a1945] font-black text-2xl uppercase mb-4">
                  {areaCentral.nome}
                </h2>
                <p className="text-[#0a1945] font-medium text-lg leading-relaxed">
                  {areaCentral.descricao}
                </p>
              </div>
            ) : (
              <div className="text-gray-400 flex flex-col items-center gap-4">
                <svg
                  className="w-16 h-16 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
                <p className="font-bold text-xl">
                  Passe o mouse ou clique em uma área para ver os detalhes.
                </p>
              </div>
            )}
          </div>
        </div>

        <Link
          to="/home"
          className={`mt-auto px-16 py-6 rounded-full font-black text-3xl transition-all shadow-2xl border-4
            ${
              selecionadas.length > 0
                ? "bg-transparent text-white border-white hover:bg-white hover:text-[#0a1945] hover:scale-105"
                : "bg-transparent text-gray-500 border-gray-500 cursor-not-allowed pointer-events-none"
            }
          `}
        >
          CONTINUAR
        </Link>
      </main>
    </div>
  );
}

export default EscolhaAreas;
