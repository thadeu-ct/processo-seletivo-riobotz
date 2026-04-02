import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import workshopsDB from "../services/workshops.json";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function AdminWorkshop() {
  const { id } = useParams();

  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  const workshop = workshopsDB.find((w) => String(w.id) === String(id));

  const matriculaUsuario = sessionStorage.getItem("matriculaUsuario") || "";
  const envAdmins = import.meta.env.VITE_ADMIN_MATRICULAS || "";
  const isAdminReal =
    matriculaUsuario !== "" && envAdmins.split(",").includes(matriculaUsuario);

  useEffect(() => {
    const buscarInscritos = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/workshops/inscritos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workshop_id: id }),
        });
        const data = await res.json();

        if (Array.isArray(data)) {
          setAlunos(
            data.map((a) => ({
              ...a,
              presente: a.presente || false,
              bonus: a.bonus || 0,
            })),
          );
        }
      } catch (err) {
        console.error("Erro ao carregar inscritos:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAdminReal) buscarInscritos();
  }, [id, isAdminReal]);

  const togglePresenca = (alunoId) => {
    setAlunos((prev) =>
      prev.map((aluno) =>
        aluno.matricula === alunoId
          ? { ...aluno, presente: !aluno.presente }
          : aluno,
      ),
    );
  };

  const addBonus = (alunoId) => {
    setAlunos((prev) =>
      prev.map((aluno) =>
        aluno.matricula === alunoId
          ? { ...aluno, bonus: (aluno.bonus || 0) + 10 }
          : aluno,
      ),
    );
  };

  const handleSalvar = async () => {
    try {
      const res = await fetch(`${API_URL}/workshops/salvar-presenca`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshop_id: id,
          dados: alunos,
        }),
      });
      const data = await res.json();
      if (!data.erro) alert("Lançamentos salvos com sucesso!");
    } catch (err) {
      console.error("Erro fatal ao carregar inscritos:", err);
    }
  };

  if (!isAdminReal) {
    return (
      <div className="min-h-screen bg-[#0a1945] text-white flex items-center justify-center font-black">
        ACESSO NEGADO
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="min-h-screen bg-[#0a1945] text-white flex items-center justify-center font-black text-2xl">
        Workshop {id} não encontrado.
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

        <div className="w-full max-w-5xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 text-center text-cyan-400 font-bold animate-pulse">
                CARREGANDO LISTA DA TABELA...
              </div>
            ) : (
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
                      key={aluno.matricula}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="p-4 text-center">
                        <button
                          onClick={() => togglePresenca(aluno.matricula)}
                          className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all mx-auto ${
                            aluno.presente
                              ? "bg-cyan-500 border-cyan-500 text-[#0a1945]"
                              : "bg-transparent border-gray-500 text-transparent"
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
                            />
                          </svg>
                        </button>
                      </td>
                      <td className="p-4 font-mono text-gray-400">
                        {aluno.matricula}
                      </td>
                      <td className="p-4 font-bold text-white uppercase text-sm">
                        {aluno.nome}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => addBonus(aluno.matricula)}
                            className="px-3 py-1.5 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-lg font-black hover:bg-yellow-400 hover:text-[#0a1945] transition-all"
                          >
                            +10 ₿
                          </button>
                          {aluno.bonus > 0 && (
                            <span className="text-yellow-400 font-mono text-sm">
                              {aluno.bonus}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="w-full max-w-5xl mt-8 flex justify-end">
          <button
            onClick={handleSalvar}
            className="px-8 py-4 rounded-full bg-cyan-500 text-[#0a1945] font-black text-lg hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
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
