import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import AreaCard from "../components/AreaCard";

const DATA_LIBERACAO = new Date("2026-04-01T00:00:00");

const paineis = [
  {
    id: "mecanica",
    titulo: "Mecânica",
    descricao: "Trilhas de SolidWorks, usinagem e montagem estrutural.",
    bgClass: "bg-gradient-to-br from-slate-600 to-slate-900 border-b-8 border-orange-500",
    textClass: "text-orange-400",
    hoverShadowClass: "hover:shadow-orange-500/30",
  },
  {
    id: "autonomos",
    titulo: "Autônomos",
    descricao: "Lógica em C, workshops de circuitos e controle de sensores.",
    bgClass: "bg-gradient-to-br from-emerald-600 to-emerald-900 border-b-8 border-green-400",
    textClass: "text-green-300",
    hoverShadowClass: "hover:shadow-green-500/30",
  },
  {
    id: "eletronica",
    titulo: "Eletrônica",
    descricao: "Workshops de esquemáticos, solda e componentes eletrônicos.",
    bgClass: "bg-gradient-to-br from-yellow-500 to-amber-700 border-b-8 border-yellow-200",
    textClass: "text-yellow-100",
    hoverShadowClass: "hover:shadow-yellow-500/30",
  },
  {
    id: "gestao",
    titulo: "Gestão",
    descricao: "Captação de recursos, patrocínios e logística da equipe.",
    bgClass: "bg-gradient-to-br from-blue-600 to-blue-900 border-b-8 border-cyan-400",
    textClass: "text-cyan-300",
    hoverShadowClass: "hover:shadow-cyan-500/30",
  },
  {
    id: "comunicacao",
    titulo: "Comunicação",
    descricao: "Mídias sociais, design de uniformes e produção audiovisual.",
    bgClass: "bg-gradient-to-br from-indigo-700 to-purple-900 border-b-8 border-fuchsia-400",
    textClass: "text-fuchsia-300",
    hoverShadowClass: "hover:shadow-fuchsia-500/30",
  },
  {
    id: "tarefas_extras",
    titulo: "Missões Extras",
    descricao: "Desafios gerais e dinâmicas surpresa do processo.",
    bgClass: "bg-gradient-to-br from-rose-500 to-rose-800 border-b-8 border-pink-300",
    textClass: "text-pink-200",
    hoverShadowClass: "hover:shadow-pink-500/30",
  },
];

function Home() {
  const agora = new Date();
  const isLockedDate = agora < DATA_LIBERACAO;

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans overflow-x-hidden">
      <PrivateHeader />

      <main className="flex-grow flex flex-col items-center py-12 px-6">
        <div className="text-center mb-16 relative z-20">
          <h1 className="text-white font-black text-3xl md:text-5xl mb-4 tracking-tight uppercase">
            Sua Jornada
          </h1>
          <p className="text-gray-300 font-medium text-lg max-w-2xl mx-auto">
            Selecione uma área abaixo para acessar os materiais, trilhas de
            workshops e desafios práticos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl relative z-10">
          {paineis.map((painel) => (
            <AreaCard 
              key={painel.id} 
              {...painel} 
              isLocked={painel.id !== "tarefas_extras" && isLockedDate} 
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
