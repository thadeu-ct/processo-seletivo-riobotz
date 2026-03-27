import { useState } from "react";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function MateriaisExtras() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const navigate = useNavigate();

  const pdfUrl = "/riobotz_combot_tutorial.pdf";

  const sections = [
    {
      id: "quiz",
      title: "Quiz Tutorial",
      description: "Teste seus conhecimentos sobre o manual da equipe.",
      icon: "📝",
      color: "from-blue-600 to-blue-800",
      bonus: "200 Botcoins",
    },
    {
      id: "desafios",
      title: "Desafios",
      description: "Missões técnicas práticas baseadas no tutorial.",
      icon: "⚙️",
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: "videos",
      title: "Vídeos Extras",
      description: "Conteúdo visual complementar para aprofundamento.",
      icon: "🎬",
      color: "from-purple-600 to-indigo-700",
    },
  ];

  const handleQuizClick = () => {
    // Aqui a gente mostra o aviso importante antes de navegar
    const confirmar = window.confirm(
      "AVISO IMPORTANTE: MISSÃO ESPECIAL\n\n" +
        "• Este quiz vale 200 Botcoins extras.\n" +
        "• Você tem apenas 2 TENTATIVAS.\n" +
        "• Na 1ª tentativa, o gabarito NÃO será exibido.\n\n" +
        "Deseja iniciar agora?",
    );

    if (confirmar) {
      navigate("/quiz/tutorial-extra");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans overflow-hidden">
      <PrivateHeader />

      <main className="flex-grow flex relative">
        {/* Lado Esquerdo: Painel do PDF */}
        <div
          className={`fixed inset-y-0 left-0 z-40 transition-all duration-500 ease-in-out bg-white shadow-2xl flex ${isPdfOpen ? "w-full md:w-[50%]" : "w-0"}`}
        >
          <button
            onClick={() => setIsPdfOpen(!isPdfOpen)}
            className="absolute top-24 -right-14 bg-yellow-500 text-[#0a1945] p-4 rounded-r-3xl shadow-xl hover:bg-yellow-400 transition-all z-50 flex flex-col items-center gap-3 border-y-2 border-r-2 border-[#0a1945]/10"
          >
            <svg
              className={`w-8 h-8 transition-transform duration-500 ${isPdfOpen ? "rotate-180" : ""}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21l-8-4.5v-13l8 4.5 8-4.5v13l-8 4.5zm0-2.165l6-3.375v-9.43l-6 3.375v9.43z" />
            </svg>
            <span className="[writing-mode:vertical-lr] font-black text-[10px] uppercase tracking-[0.3em] py-2">
              {isPdfOpen ? "FECHAR" : "TUTORIAL"}
            </span>
          </button>

          <div className="w-full h-full">
            {isPdfOpen && (
              <iframe
                src={`${pdfUrl}#view=FitH`}
                className="w-full h-full border-none"
                title="Tutorial RioBotz"
              />
            )}
          </div>
        </div>

        {/* Lado Direito: Menu de Missões */}
        <section
          className={`flex-grow transition-all duration-500 ease-in-out p-6 md:p-12 overflow-y-auto ${isPdfOpen ? "md:ml-[50%] opacity-20 md:opacity-100" : "ml-0"}`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h1 className="text-white font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">
                Missões Extras
              </h1>
              <div className="h-1.5 w-24 bg-yellow-500 mb-6 rounded-full"></div>
              <p className="text-blue-200 text-lg leading-relaxed max-w-2xl">
                Domine o conteúdo técnico da equipe e conquiste recompensas
                exclusivas para sua jornada.
              </p>
            </div>

            {/* Cards de Navegação */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sections.map((section) => (
                <div
                  key={section.id}
                  onClick={section.id === "quiz" ? handleQuizClick : () => {}}
                  className={`relative group bg-white/5 border border-white/10 rounded-[2.5rem] p-8 cursor-pointer hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden shadow-2xl`}
                >
                  {/* Badge de Recompensa */}
                  {section.bonus && (
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-[#0a1945] font-black text-[10px] px-4 py-2 rounded-bl-2xl uppercase tracking-tighter shadow-lg">
                      +{section.bonus}
                    </div>
                  )}

                  <div
                    className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${section.color} flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    {section.icon}
                  </div>

                  <h2 className="text-white font-black text-2xl uppercase tracking-tight mb-3">
                    {section.title}
                  </h2>
                  <p className="text-blue-300/70 text-sm font-medium leading-relaxed mb-6">
                    {section.description}
                  </p>

                  <div className="flex items-center gap-2 text-yellow-500 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Acessar Missão <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MateriaisExtras;
