import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import workshopsDB from "../services/workshops.json";

// Mock de dados - Futuramente virá de: GET /api/quiz/resultados/:id
const resultadosMock = [
  {
    id: 1,
    matricula: "202410123",
    nome: "João Silva",
    acertos: 8,
    totalQuestoes: 10,
    data: "30/03/2026 - 14:20",
    tempo: "04:12",
  },
  {
    id: 2,
    matricula: "202410456",
    nome: "Maria Oliveira",
    acertos: 10,
    totalQuestoes: 10,
    data: "30/03/2026 - 15:05",
    tempo: "03:45",
  },
  {
    id: 3,
    matricula: "202410789",
    nome: "Carlos Eduardo Souza",
    acertos: 5,
    totalQuestoes: 10,
    data: "29/03/2026 - 10:00",
    tempo: "07:30",
  },
];

function AdminQuiz() {
  const { id } = useParams();
  // Buscamos o workshop para saber de qual quiz estamos falando
  const workshop = workshopsDB.find((w) => w.id === id);
  const [resultados] = useState(resultadosMock);

  if (!workshop) {
    return (
      <div className="text-white text-center mt-20 text-2xl font-black">
        Quiz não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans">
      <PrivateHeader />

      <main className="flex-grow flex flex-col items-center py-8 px-4 md:px-8">
        {/* Breadcrumb / Voltar */}
        <div className="w-full max-w-6xl mb-6">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 font-bold transition-colors text-sm uppercase tracking-widest"
          >
            <svg
              className="w-5 h-5"
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

        {/* Header da Página */}
        <div className="w-full max-w-6xl mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-yellow-500 font-black tracking-[0.2em] uppercase text-xs mb-2 block">
              Resultados do Quiz
            </span>
            <Link
              to={`/admin/quiz/perguntas/${id}`}
              className="text-cyan-400 font-black tracking-[0.2em] uppercase text-xs hover:underline"
            >
              [ Gerenciar Perguntas ]
            </Link>
            <h1 className="text-white font-black text-3xl md:text-5xl tracking-tight leading-tight uppercase">
              {workshop.titulo}
            </h1>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex gap-8">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-tighter">
                Respostas
              </span>
              <span className="text-white font-black text-2xl">
                {resultados.length}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-tighter">
                Média Acertos
              </span>
              <span className="text-green-400 font-black text-2xl">
                {(
                  resultados.reduce((acc, curr) => acc + curr.acertos, 0) /
                  resultados.length
                ).toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Tabela de Resultados */}
        <div className="w-full max-w-6xl bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/10 border-b border-white/10 text-gray-300 text-[10px] uppercase tracking-[0.2em]">
                  <th className="p-6 font-black text-center">Desempenho</th>
                  <th className="p-6 font-black">Candidato</th>
                  <th className="p-6 font-black">Matrícula</th>
                  <th className="p-6 font-black text-center">Acertos</th>
                  <th className="p-6 font-black text-center">Tempo</th>
                  <th className="p-6 font-black text-right">Data/Hora</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {resultados.map((res) => {
                  const porcentagem = (res.acertos / res.totalQuestoes) * 100;
                  return (
                    <tr
                      key={res.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Barra de progresso visual mini */}
                      <td className="p-6 w-32">
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${porcentagem >= 70 ? "bg-green-500" : porcentagem >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                            style={{ width: `${porcentagem}%` }}
                          ></div>
                        </div>
                      </td>

                      <td className="p-6 font-bold text-white uppercase text-sm tracking-tight">
                        {res.nome}
                      </td>

                      <td className="p-6 font-mono text-gray-400 text-sm">
                        {res.matricula}
                      </td>

                      <td className="p-6 text-center">
                        <span
                          className={`font-black text-lg ${porcentagem >= 70 ? "text-green-400" : "text-yellow-500"}`}
                        >
                          {res.acertos}
                        </span>
                        <span className="text-gray-500 text-sm">
                          /{res.totalQuestoes}
                        </span>
                      </td>

                      <td className="p-6 text-center font-mono text-xs text-gray-300">
                        {res.tempo}
                      </td>

                      <td className="p-6 text-right text-gray-500 font-medium text-xs">
                        {res.data}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer da tabela com exportação (Simulada) */}
        <div className="w-full max-w-6xl mt-6 flex justify-between items-center px-4">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            * Dados sincronizados com o banco de respostas RioBotz
          </p>
          <button
            className="bg-white/10 hover:bg-white text-white hover:text-[#0a1945] border border-white/20 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
            onClick={() => alert("Gerando relatório em CSV...")}
          >
            Exportar CSV
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminQuiz;
