import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import workshopsDB from "../services/workshops.json";

const inscritosMock = [
  {
    id: 1,
    matricula: "202410123",
    nome: "João Silva",
    presente: false,
    bonus: 0,
  },
  {
    id: 2,
    matricula: "202410456",
    nome: "Maria Oliveira",
    presente: true,
    bonus: 10,
  },
  {
    id: 3,
    matricula: "202410789",
    nome: "Carlos Eduardo Souza",
    presente: false,
    bonus: 0,
  },
  {
    id: 4,
    matricula: "202410321",
    nome: "Ana Beatriz Costa",
    presente: true,
    bonus: 0,
  },
];

function AdminWorkshop() {
  const { id } = useParams();
  const workshop = workshopsDB.find((w) => w.id === id);

  const [alunos, setAlunos] = useState(inscritosMock);

  const togglePresenca = (alunoId) => {
    setAlunos(
      alunos.map((aluno) =>
        aluno.id === alunoId ? { ...aluno, presente: !aluno.presente } : aluno,
      ),
    );
  };

  const addBonus = (alunoId) => {
    setAlunos(
      alunos.map((aluno) =>
        aluno.id === alunoId ? { ...aluno, bonus: aluno.bonus + 10 } : aluno,
      ),
    );
  };

  if (!workshop) {
    return (
      <div className="text-white text-center mt-20 text-2xl font-black">
        Workshop não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans">
      <PrivateHeader />

      <main className="flex-grow flex flex-col items-center py-8 px-4 md:px-8">
        <div className="w-full max-w-5xl mb-6">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 font-bold transition-colors"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar para Trilhas
          </Link>
        </div>

        <div className="w-full max-w-5xl mb-8 flex items-center justify-between">
          <div>
            <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-1 block">
              Modo Administrador
            </span>
            <h1 className="text-white font-black text-3xl md:text-4xl tracking-tight leading-tight">
              {workshop.titulo}
            </h1>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <span className="text-gray-400 font-medium">Inscritos totais</span>
            <span className="text-cyan-400 font-black text-3xl">
              {alunos.length}
            </span>
          </div>
        </div>

        <div className="w-full max-w-5xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/10 border-b border-white/10 text-gray-300 text-sm uppercase tracking-wider">
                  <th className="p-4 font-bold text-center w-24">
                    Presença (+50 ₿)
                  </th>
                  <th className="p-4 font-bold">Matrícula</th>
                  <th className="p-4 font-bold">Nome do Candidato</th>
                  <th className="p-4 font-bold text-center w-36">Bônus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {alunos.map((aluno) => (
                  <tr
                    key={aluno.id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-4 text-center">
                      <button
                        onClick={() => togglePresenca(aluno.id)}
                        className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all mx-auto ${
                          aluno.presente
                            ? "bg-cyan-500 border-cyan-500 text-[#0a1945] shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                            : "bg-transparent border-gray-500 text-transparent hover:border-cyan-500"
                        }`}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </button>
                    </td>

                    <td className="p-4 font-mono text-gray-400">
                      {aluno.matricula}
                    </td>
                    <td className="p-4 font-bold text-white">{aluno.nome}</td>

                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => addBonus(aluno.id)}
                          className="px-3 py-1.5 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-lg font-black hover:bg-yellow-400 hover:text-[#0a1945] transition-all flex items-center gap-1 shadow-sm"
                          title="Adicionar bônus por participação"
                        >
                          +10
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm1-13h-2v2H9v2h2v2H9v2h2v2h2v-2h2v-2h-2v-2h2V9h-2V7z" />
                          </svg>
                        </button>
                        {aluno.bonus > 0 && (
                          <span className="text-yellow-400 font-mono text-sm w-6 text-right">
                            {aluno.bonus}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full max-w-5xl mt-8 flex justify-end">
          <button
            className="px-8 py-4 rounded-full bg-cyan-500 text-[#0a1945] font-black text-lg hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            onClick={() =>
              alert("Lista de presença e Botcoins salvos no Banco de Dados!")
            }
          >
            Salvar Lançamentos
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminWorkshop;
