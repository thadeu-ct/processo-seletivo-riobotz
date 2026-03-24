import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import AreaCard from "../components/AreaCard";

const paineis = [
  {
    id: "mecanica",
    titulo: "Mecânica",
    descricao: "Trilhas de SolidWorks, usinagem e montagem estrutural.",
    bgClass:
      "bg-gradient-to-br from-slate-600 to-slate-900 border-b-8 border-orange-500",
    textClass: "text-orange-400",
    hoverShadowClass: "hover:shadow-orange-500/30",
    iconeBg: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
    ),
  },
  {
    id: "autonomos",
    titulo: "Autônomos",
    descricao: "Lógica em C, workshops de circuitos e controle de sensores.",
    bgClass:
      "bg-gradient-to-br from-emerald-600 to-emerald-900 border-b-8 border-green-400",
    textClass: "text-green-300",
    hoverShadowClass: "hover:shadow-green-500/30",
    iconeBg: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    ),
  },
  {
    id: "eletronica",
    titulo: "Eletrônica",
    descricao: "Workshops de esquemáticos, solda e componentes eletrônicos.",
    bgClass:
      "bg-gradient-to-br from-yellow-500 to-amber-700 border-b-8 border-yellow-200",
    textClass: "text-yellow-100",
    hoverShadowClass: "hover:shadow-yellow-500/30",
    iconeBg: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
  {
    id: "gestao",
    titulo: "Gestão",
    descricao: "Captação de recursos, patrocínios e logística da equipe.",
    bgClass:
      "bg-gradient-to-br from-blue-600 to-blue-900 border-b-8 border-cyan-400",
    textClass: "text-cyan-300",
    hoverShadowClass: "hover:shadow-cyan-500/30",
    iconeBg: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
  },
  {
    id: "comunicacao",
    titulo: "Comunicação",
    descricao: "Mídias sociais, design de uniformes e produção audiovisual.",
    bgClass:
      "bg-gradient-to-br from-indigo-700 to-purple-900 border-b-8 border-fuchsia-400",
    textClass: "text-fuchsia-300",
    hoverShadowClass: "hover:shadow-fuchsia-500/30",
    iconeBg: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      />
    ),
  },
  {
    id: "tarefas_extras",
    titulo: "Missões Extras",
    descricao: "Desafios gerais e dinâmicas surpresa do processo.",
    bgClass:
      "bg-gradient-to-br from-rose-500 to-rose-800 border-b-8 border-pink-300",
    textClass: "text-pink-200",
    hoverShadowClass: "hover:shadow-pink-500/30",
    iconeBg: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
      />
    ),
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans">
      <PrivateHeader />

      <main className="flex-grow flex flex-col items-center py-12 px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-white font-black text-3xl md:text-5xl mb-4 tracking-tight uppercase">
            Sua Jornada
          </h1>
          <p className="text-gray-300 font-medium text-lg max-w-2xl mx-auto">
            Selecione uma área abaixo para acessar os materiais, trilhas de
            workshops e desafios práticos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {paineis.map((painel) => (
            <AreaCard key={painel.id} {...painel} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
