import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function AdminQuiz() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizLiberado, setQuizLiberado] = useState(false)

  useEffect(() => {
    const carregarDadosAdmin = async () => {
      try {
        setLoading(true);

        const resW = await fetch(`${API_URL}/workshops`, { method: "POST" });
        const dataW = await resW.json();
        const found = dataW.find((w) => Number(w.id) === Number(id));
        setWorkshop(found);

        const resR = await fetch(`${API_URL}/admin/quiz/resultados`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workshop_id: id }),
        });
        const dataR = await resR.json();

        if (Array.isArray(dataR)) {
          setResultados(dataR);
        }
      } catch (err) {
        console.error("Erro ao carregar dados de admin:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarDadosAdmin();
    if (workshop) {
      setQuizLiberado(!!workshop.quiz_link || !!workshop.link);
    }
  }, [id, workshop]);

  const handleToggleQuiz = async () => {
    const acaoLiberar = !quizLiberado;
    const novoLink = acaoLiberar ? `/quiz/${id}` : null;

    try {
      const res = await fetch(`${API_URL}/workshops/atualizar-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshop_id: id,
          quiz_link: novoLink,
        }),
      });
    
    if (res.ok) {
        setQuizLiberado(acaoLiberar);
        toast.success(
          acaoLiberar ? "Quiz liberado para os alunos!" : "Quiz ocultado!",
          { icon: acaoLiberar ? "🚀" : "🙈" },
        );
      }
    } catch (err) {
      toast.error("Erro ao mudar status do quiz: ", err);
    }
  };

  const mediaGeral = useMemo(() => {
    if (resultados.length === 0) return "0.0";
    const soma = resultados.reduce((acc, curr) => acc + curr.acertos, 0);
    const total = resultados.reduce((acc, curr) => acc + curr.totalQuestoes, 0);
    return ((soma / total) * 10).toFixed(1);
  }, [resultados]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1945] flex flex-col items-center justify-center font-sans">
        <div className="relative flex items-center justify-center w-32 h-32">
          <svg
            className="w-full h-full text-yellow-400 opacity-80 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <div className="absolute inset-0 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-yellow-400 font-black uppercase tracking-[0.3em] text-xs mt-8 animate-pulse">
          Sincronizando Resultados...
        </h2>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="text-white text-center mt-20 font-black">
        Quiz não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans">
      <PrivateHeader />

      <main className="flex-grow flex flex-col items-center py-8 px-4 md:px-8">
        <div className="w-full max-w-6xl mb-6">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white font-bold transition-all text-xs uppercase tracking-[0.2em]"
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
                strokeWidth="3"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar para Trilhas
          </Link>
        </div>

        <div className="w-full max-w-6xl mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-1">
            <span className="text-yellow-500 font-black tracking-[0.3em] uppercase text-[10px] mb-3 block">
              Resultados da Avaliação
            </span>
            <h1 className="text-white font-black text-4xl md:text-6xl tracking-tighter uppercase leading-none">
              {workshop.titulo}
            </h1>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl backdrop-blur-sm">
              <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest block mb-1">
                Respostas
              </span>
              <span className="text-white font-black text-3xl">
                {resultados.length}
              </span>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl backdrop-blur-sm">
              <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest block mb-1">
                Média Geral
              </span>
              <span className="text-green-400 font-black text-3xl">
                {mediaGeral}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl bg-[#0d1b4a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-[10px] uppercase tracking-[0.2em]">
                  <th className="p-6 font-black">Desempenho</th>
                  <th className="p-6 font-black">Candidato</th>
                  <th className="p-6 font-black">Matrícula</th>
                  <th className="p-6 font-black text-center">Acertos</th>
                  <th className="p-6 font-black text-center">Tempo</th>
                  <th className="p-6 font-black text-right">Finalizado em</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {resultados.map((res) => (
                  <tr
                    key={res.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="p-6 w-40">
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{
                            width: `${(res.acertos / res.totalQuestoes) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="p-6 font-black text-white text-sm uppercase tracking-tight">
                      {res.nome}
                    </td>
                    <td className="p-6 font-mono text-gray-500 text-sm">
                      {res.matricula}
                    </td>
                    <td className="p-6 text-center font-black text-white text-lg">
                      {res.acertos}
                      <span className="text-gray-600 text-sm">
                        /{res.totalQuestoes}
                      </span>
                    </td>
                    <td className="p-6 text-center font-mono text-xs text-gray-400">
                      {res.tempo}
                    </td>
                    <td className="p-6 text-right text-gray-600 font-bold text-[10px]">
                      {res.data}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full max-w-6xl mb-8 bg-white/5 border border-white/10 p-6 rounded-[2rem] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`w-3 h-3 rounded-full ${quizLiberado ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
            ></div>
            <div>
              <h3 className="text-white font-black uppercase text-sm">
                Status do Quiz
              </h3>
              <p className="text-gray-500 text-[10px] uppercase font-bold">
                {quizLiberado
                  ? "Visível para os candidatos"
                  : "Oculto na plataforma"}
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleQuiz}
            className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${
              quizLiberado
                ? "bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white"
                : "bg-green-500 text-[#0a1945] hover:bg-white hover:scale-105 shadow-lg shadow-green-500/20"
            }`}
          >
            {quizLiberado ? "Suspender Quiz" : "Liberar Quiz"}
          </button>
        </div>        

        <div className="w-full max-w-6xl mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <button className="text-gray-500 hover:text-white font-black uppercase text-[10px] tracking-widest transition-colors flex items-center gap-2">
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Exportar Relatório CSV
          </button>

          <Link
            to={`/admin/quiz/perguntas/${id}`}
            className="group flex items-center gap-6 bg-cyan-500 hover:bg-white p-2 pr-8 rounded-full transition-all duration-300 shadow-xl shadow-cyan-500/20"
          >
            <div className="bg-[#0a1945] text-cyan-400 p-4 rounded-full group-hover:bg-cyan-500 group-hover:text-white transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[#0a1945] font-black uppercase text-xs tracking-widest">
                Configurações do Quiz
              </span>
              <span className="text-[#0a1945]/60 font-bold text-[10px] uppercase tracking-tighter">
                Gerenciar Perguntas & Respostas →
              </span>
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminQuiz;
