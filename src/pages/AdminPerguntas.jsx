import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function AdminPerguntas() {
  const { id } = useParams(); // ID do Workshop
  const [perguntas, setPerguntas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados do formulário
  const [novaPergunta, setNovaPergunta] = useState("");
  const [imagem, setImagem] = useState(null);

  // Memoizando a função de busca para evitar renders infinitos
  const carregarPerguntas = useCallback(async () => {
    try {
      setLoading(true);
      // O Telhado fez o getPerguntas como POST no api.py
      const res = await fetch(`${API_URL}/perguntas/get`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      // Filtrando no front enquanto o back não aceita o ID do workshop
      // Idealmente o back deveria retornar apenas as deste workshop_id
      setPerguntas(data);
    } catch (err) {
      console.error("Erro ao carregar perguntas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

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
        carregarPerguntas(); // Recarrega a lista de forma assíncrona
      } else {
        alert(data.erro);
      }
    } catch (err) {
      console.error("Erro ao salvar:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1945] text-white flex flex-col font-sans">
      <PrivateHeader />

      <main className="flex-grow max-w-5xl mx-auto w-full py-12 px-6">
        <Link
          to={`/admin/quiz/${id}`}
          className="text-gray-400 hover:text-yellow-500 mb-8 inline-flex items-center gap-2 font-bold transition-all uppercase text-xs tracking-widest"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar para Resultados
        </Link>

        <div className="mb-12">
          <span className="text-cyan-400 font-black uppercase text-xs tracking-[0.2em]">
            Editor de Conteúdo
          </span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Gerenciar Perguntas
          </h1>
          <div className="h-1.5 w-20 bg-cyan-500 mt-4 rounded-full"></div>
        </div>

        {/* FORMULÁRIO DE ADIÇÃO */}
        <form
          onSubmit={handleAddPergunta}
          className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 mb-12 backdrop-blur-sm"
        >
          <h2 className="text-xl font-bold mb-6 uppercase text-cyan-400 flex items-center gap-2">
            <span className="bg-cyan-400/20 p-2 rounded-lg text-sm">➕</span>{" "}
            Criar Nova Questão
          </h2>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-1">
                Enunciado da Pergunta
              </label>
              <textarea
                className="w-full bg-black/20 border-2 border-white/5 rounded-2xl p-4 outline-none focus:border-cyan-500 transition-all min-h-[100px]"
                placeholder="Ex: Qual a liga de alumínio mais utilizada em chassis de robôs de combate?"
                value={novaPergunta}
                onChange={(e) => setNovaPergunta(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-1">
                Imagem de Apoio (Obrigatório no Back)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagem(e.target.files[0])}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:bg-cyan-500 file:text-[#0a1945] hover:file:bg-white transition-all cursor-pointer"
              />
            </div>

            <button className="bg-cyan-500 text-[#0a1945] font-black py-4 rounded-2xl uppercase tracking-widest hover:bg-white hover:scale-[1.02] transition-all shadow-lg shadow-cyan-500/20 mt-2">
              Salvar Pergunta no Banco
            </button>
          </div>
        </form>

        {/* LISTAGEM DAS PERGUNTAS NO BANCO */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-6 ml-1">
            Perguntas Existentes
          </h3>
          {loading ? (
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-12 bg-white/5 rounded-xl"></div>
              </div>
            </div>
          ) : perguntas.length > 0 ? (
            perguntas.map((p, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-2xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="text-cyan-500 font-mono font-bold">
                    {index + 1}.
                  </span>
                  <span className="font-bold text-gray-200">{p[0]}</span>{" "}
                  {/* p[0] porque o fetchall do python retorna tuplas */}
                </div>
                <div className="flex gap-2">
                  <button className="text-red-500/50 hover:text-red-500 font-black uppercase text-[10px] tracking-tighter transition-all">
                    [ Excluir ]
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-[2rem]">
              <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">
                Nenhuma pergunta encontrada para este workshop.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminPerguntas;
