import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import workshopsDB from "../services/workshops.json";

function AdminQuiz() {
  const { id } = useParams();
  const workshop = workshopsDB.find((w) => w.id === id);

  // Mock de dados - Mantendo os resultados que já tínhamos
  const [resultados] = useState([
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
  ]);

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
        {/* Voltar Minimalista */}
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

        {/* Header Principal */}
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
              <span className="text-green-400 font-black text-3xl">7.7</span>
            </div>
          </div>
        </div>

        {/* Tabela de Resultados */}
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

        {/* FOOTER DA PÁGINA: Ações de Admin */}
        <div className="w-full max-w-6xl mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Botão de Exportação Secundário */}
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

          {/* O NOVO BOTÃO DE GESTÃO - ESTILO "ACTION" */}
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
