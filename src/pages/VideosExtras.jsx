import { Link } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";

function VideosExtras() {
  const videos = [
    {
      id: "1",
      titulo: "Como funciona um Motor Brushless?",
      descricao:
        "Entenda o funcionamento interno dos motores sem escovas: interação entre estator com eletroímas e rotor com ímãs permanentes, além do papel do ESC no controle de rotação.",
      youtubeId: "bCEiOnuODac",
      duracao: "04:40",
      tag: "Autônomos / Eletrônica / Mecânica",
    },
    {
      id: "2",
      titulo: "Como funciona um motor brushed?",
      descricao:
        "Descubra a mecânica dos motores com escovas: a função do comutador e das escovas de carvão na inversão da polaridade do rotor para manter o movimento contínuo via indução eletromagnética.",
      youtubeId: "LAtPHANEfQo",
      duracao: "04:50",
      tag: "Autônomos / Eletrônica / Mecânica",
    },
    {
      id: "3",
      titulo: "Aprenda a Soldar Eletrônica",
      descricao:
        "Domine a técnica de soldagem com o Manual do Mundo: do aquecimento dos terminais à aplicação do estanho, garantindo conexões elétricas robustas e duráveis para seus projetos.",
      youtubeId: "7f6T6O_m9pM",
      duracao: "10:15",
      tag: "Autônomos / Eletrônica",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a1945] text-white flex flex-col font-sans selection:bg-purple-500/30">
      <PrivateHeader />

      <main className="flex-grow max-w-6xl mx-auto w-full py-12 px-6">
        <Link
          to="/workshops/materiais-extras"
          className="group inline-flex items-center gap-3 text-gray-400 hover:text-purple-400 font-black transition-all uppercase text-[10px] tracking-[0.3em] mb-10"
        >
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-purple-500/20 transition-colors">
            <svg
              className="w-4 h-4"
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
          </div>
          Voltar para Missões
        </Link>

        <header className="mb-12">
          <span className="text-purple-400 font-black uppercase text-xs tracking-[0.4em] mb-3 block opacity-70">
            Conteúdo Complementar
          </span>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Vídeos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
              Extras
            </span>
          </h1>
          <div className="h-1.5 w-24 bg-purple-600 rounded-full mt-6 mb-8"></div>
          <p className="text-blue-200 text-lg max-w-2xl font-medium leading-relaxed">
            Aprofunde seus conhecimentos técnicos com aulas visuais sobre os
            componentes mais importantes dos nossos robôs.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-purple-500/40 transition-all group shadow-2xl backdrop-blur-sm"
            >
              <div className="aspect-video w-full bg-black/40 relative">
                <iframe
                  className="absolute inset-0 w-full h-full border-none"
                  src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&showinfo=0`}
                  title={video.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2 block">
                      {video.tag}
                    </span>
                    <h3 className="text-2xl font-black uppercase tracking-tight leading-tight group-hover:text-purple-300 transition-colors">
                      {video.titulo}
                    </h3>
                  </div>
                  <span className="bg-white/5 text-gray-400 text-[10px] font-black px-3 py-1.5 rounded-xl border border-white/10 whitespace-nowrap">
                    {video.duracao} MIN
                  </span>
                </div>
                <p className="text-blue-300/60 text-sm leading-relaxed font-medium">
                  {video.description || video.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default VideosExtras;
