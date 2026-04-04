import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function AdminPerguntas() {
  const { id } = useParams();
  const [perguntas, setPerguntas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [novaPergunta, setNovaPergunta] = useState("");
  const [imagem, setImagem] = useState(null);

  const [perguntaSelecionada, setPerguntaSelecionada] = useState("");
  const [novaOpcao, setNovaOpcao] = useState("");
  const [isCerto, setIsCerto] = useState(false);

  const carregarPerguntas = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/perguntas/get`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        setPerguntas(data);
      }
    } catch (err) {
      console.error("Erro ao carregar perguntas:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    carregarPerguntas();
  }, [carregarPerguntas]);

  const handleAddPergunta = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("texto", novaPergunta);
    formData.append("id", id);
    if (imagem) formData.append("image", imagem);

    try {
      const res = await fetch(`${API_URL}/pergunta/add`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.erro) {
        setNovaPergunta("");
        setImagem(null);
        carregarPerguntas();
        alert("Pergunta cadastrada!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOpcao = async (e) => {
    e.preventDefault();
    if (!perguntaSelecionada) return alert("Selecione uma pergunta!");

    const formData = new FormData();
    formData.append("pergunta", perguntaSelecionada);
    formData.append("opcao", novaOpcao);
    formData.append("is_certo", isCerto);

    try {
      const res = await fetch(`${API_URL}/opcoes/add`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.erro) {
        setNovaOpcao("");
        setIsCerto(false);
        alert("Opção adicionada com sucesso!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletarPergunta = async (textoPergunta) => {
    if (
      !window.confirm(
        "Tem certeza que deseja excluir esta pergunta e todas as suas opções?",
      )
    )
      return;

    try {
      const res = await fetch(`${API_URL}/pergunta/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: textoPergunta }),
      });
      const data = await res.json();
      if (!data.erro) {
        carregarPerguntas();
      } else {
        alert("Erro ao deletar.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1945] text-white flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      <PrivateHeader />

      <main className="flex-grow max-w-6xl mx-auto w-full py-12 px-6">
        <Link
          to={`/admin/quiz/${id}`}
          className="group inline-flex items-center gap-3 text-gray-400 hover:text-cyan-400 font-black transition-all uppercase text-[10px] tracking-[0.3em] mb-10"
        >
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-cyan-500/20 transition-colors">
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
          Voltar para Resultados
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-cyan-400 font-black uppercase text-xs tracking-[0.4em] mb-3 block opacity-70">
              Workshop Admin
            </span>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Gerenciar{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Questões
              </span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <section className="flex flex-col gap-8">
            {/* 1. CRIAR PERGUNTA */}
            <form
              onSubmit={handleAddPergunta}
              className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-xl"
            >
              <h2 className="text-xl font-black mb-8 uppercase tracking-tight flex items-center gap-3">
                <div className="w-2 h-8 bg-cyan-500 rounded-full"></div>
                1. Criar Pergunta
              </h2>
              <div className="space-y-6">
                <textarea
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-cyan-500 transition-all min-h-[120px] text-lg font-medium"
                  placeholder="Enunciado da questão..."
                  value={novaPergunta}
                  onChange={(e) => setNovaPergunta(e.target.value)}
                  required
                />

                {/* Visual da Imagem Voltou */}
                <div className="relative group cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagem(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="bg-black/40 border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center group-hover:border-cyan-500/50 transition-all">
                    <span className="text-cyan-400 font-bold uppercase text-[10px] tracking-widest">
                      {imagem ? imagem.name : "Clique ou arraste a imagem"}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-cyan-500 text-[#0a1945] font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-xl shadow-cyan-500/20">
                  Cadastrar Pergunta
                </button>
              </div>
            </form>

            {/* 2. ADICIONAR OPÇÕES */}
            <form
              onSubmit={handleAddOpcao}
              className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-xl"
            >
              <h2 className="text-xl font-black mb-8 uppercase tracking-tight flex items-center gap-3">
                <div className="w-2 h-8 bg-yellow-500 rounded-full"></div>
                2. Adicionar Opções
              </h2>
              <div className="space-y-6">
                <select
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-yellow-500 text-white cursor-pointer"
                  value={perguntaSelecionada}
                  onChange={(e) => setPerguntaSelecionada(e.target.value)}
                  required
                >
                  <option value="" className="bg-[#0a1945]">
                    Escolha a pergunta...
                  </option>
                  {perguntas.map((p, idx) => {
                    const textoPergunta = p.enunciado || p.texto || "";
                    return (
                      <option
                        key={idx}
                        value={textoPergunta}
                        className="bg-[#0a1945]"
                      >
                        {textoPergunta.substring(0, 50)}
                        {textoPergunta.length > 50 ? "..." : ""}
                      </option>
                    );
                  })}
                </select>

                <input
                  type="text"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-yellow-500"
                  placeholder="Texto da alternativa..."
                  value={novaOpcao}
                  onChange={(e) => setNovaOpcao(e.target.value)}
                  required
                />

                <label className="flex items-center gap-3 cursor-pointer p-2">
                  <input
                    type="checkbox"
                    checked={isCerto}
                    onChange={(e) => setIsCerto(e.target.checked)}
                    className="w-5 h-5 accent-yellow-500"
                  />
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Esta é a resposta correta?
                  </span>
                </label>

                <button className="w-full bg-yellow-500 text-[#0a1945] font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-xl shadow-yellow-500/20">
                  Adicionar Alternativa
                </button>
              </div>
            </form>
          </section>

          {/* LISTA DE PERGUNTAS NO BANCO */}
          <section className="bg-black/20 rounded-[2.5rem] border border-white/5 p-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 mb-8">
              Perguntas no Banco
            </h3>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center animate-pulse text-[10px] font-black uppercase">
                  Sincronizando...
                </div>
              ) : perguntas.length > 0 ? (
                perguntas.map((p, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-cyan-500/50 transition-all group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start gap-4 relative z-10">
                      <div className="flex gap-4">
                        <span className="text-cyan-500 font-mono font-black text-2xl drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-gray-100 text-lg leading-snug">
                            {(
                              p.enunciado ||
                              p.texto ||
                              "Sem título"
                            )?.substring(0, 35)}
                            {(p.enunciado || p.texto)?.length > 35 ? "..." : ""}
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-black">
                            Ref:{" "}
                            {(p.enunciado || p.texto || "")?.substring(0, 20)}
                            ...
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleDeletarPergunta(p.enunciado || p.texto)
                        }
                        className="text-red-500/30 hover:text-red-500 transition-colors uppercase text-[10px] font-black"
                      >
                        [ Excluir ]
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 opacity-20 uppercase font-black">
                  Nenhuma pergunta cadastrada
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminPerguntas;
