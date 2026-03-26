import { useState } from "react";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";

function MateriaisExtras() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  // Link do seu PDF (substitua pelo link real ou arquivo em /public)
  const pdfUrl = "../services/riobotz_combot_tutorial.pdf";

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans overflow-hidden">
      <PrivateHeader />

      <main className="flex-grow flex relative">
        {/* Lado Esquerdo: Painel do PDF (Estilo Gaveta) */}
        <div
          className={`fixed inset-y-0 left-0 z-40 transition-all duration-500 ease-in-out bg-white shadow-[10px_0_30px_rgba(0,0,0,0.5)] flex
            ${isPdfOpen ? "w-full md:w-[50%]" : "w-0"}`}
        >
          {/* Botão de Trigger (O Livro) - Posicionado na borda do painel */}
          <button
            onClick={() => setIsPdfOpen(!isPdfOpen)}
            className={`absolute top-1/2 -right-14 transform -translate-y-1/2 bg-yellow-500 text-[#0a1945] p-4 rounded-r-3xl shadow-xl hover:bg-yellow-400 transition-all z-50 flex flex-col items-center gap-3 border-y-2 border-r-2 border-[#0a1945]/10
              ${isPdfOpen ? "rotate-0" : ""}`}
          >
            {/* Ícone de Livro SVG */}
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

          {/* Iframe do PDF */}
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

        {/* Lado Direito: Conteúdo das Questões */}
        <section
          className={`flex-grow transition-all duration-500 ease-in-out p-6 md:p-12 overflow-y-auto
            ${isPdfOpen ? "md:ml-[50%] opacity-20 md:opacity-100" : "ml-0"}`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <h1 className="text-white font-black text-4xl uppercase tracking-tighter mb-4">
                Missões Extras
              </h1>
              <div className="h-1 w-20 bg-yellow-500 mb-6"></div>
              <p className="text-blue-200 text-lg leading-relaxed">
                Abra o{" "}
                <span className="text-yellow-400 font-bold">
                  Tutorial RioBotz
                </span>{" "}
                na aba ao lado para consultar os dados técnicos e responder os
                desafios abaixo.
              </p>
            </div>

            <div className="grid gap-8">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:border-yellow-500/30 transition-all"
                >
                  <div className="flex gap-6">
                    <div className="bg-yellow-500 text-[#0a1945] font-black w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg rotate-3">
                      {num}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-white font-bold text-xl mb-6">
                        Baseado no capítulo de eletrônica, qual a principal
                        diferença entre os motores citados?
                      </h3>
                      <textarea
                        className="w-full bg-[#0a1945] border-2 border-white/10 rounded-2xl p-5 text-white placeholder:text-white/10 focus:outline-none focus:border-yellow-500 transition-all h-32 resize-none shadow-inner"
                        placeholder="Escreva sua análise técnica..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}

              <button className="bg-yellow-500 hover:bg-yellow-400 text-[#0a1945] font-black py-5 rounded-2xl transition-all shadow-[0_10px_40px_rgba(234,179,8,0.2)] mt-4 uppercase tracking-widest text-lg">
                Submeter Respostas
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MateriaisExtras;
