import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function AdminWorkshop() {
  const { id } = useParams();
  const [alunos, setAlunos] = useState([]);
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buscaMatricula, setBuscaMatricula] = useState("");

  const matriculaUsuario = sessionStorage.getItem("matriculaUsuario") || "";
  const envAdmins = import.meta.env.VITE_ADMIN_MATRICULAS || "";
  const isAdminReal =
    matriculaUsuario !== "" && envAdmins.split(",").includes(matriculaUsuario);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const resW = await fetch(`${API_URL}/workshops`, { method: "POST" });
        const todosWorkshops = await resW.json();
        setWorkshop(todosWorkshops.find((w) => String(w.id) === String(id)));

        const resI = await fetch(`${API_URL}/workshops/inscritos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workshop_id: id }),
        });
        const dataI = await resI.json();

        if (Array.isArray(dataI)) {
          setAlunos(
            dataI.map((a) => ({
              matricula: a.matricula,
              nome: a.nome,
              presente: a.presenca || false,
              jaEstavaPresente: a.presenca || false,
              bonus: 0,
              bonusTotalAcumulado: a.bonus || 0,
            })),
          );
        }
      } catch (err) {
        console.error("Erro ao carregar:", err);
      } finally {
        setLoading(false);
      }
    };
    if (isAdminReal) carregarDados();
  }, [id, isAdminReal]);

  const togglePresenca = (alunoId) => {
    setAlunos((prev) =>
      prev.map((a) =>
        a.matricula === alunoId ? { ...a, presente: !a.presente } : a,
      ),
    );
  };

  const addBonus = (alunoId) => {
    setAlunos((prev) =>
      prev.map((a) =>
        a.matricula === alunoId ? { ...a, bonus: (a.bonus || 0) + 10 } : a,
      ),
    );
  };

  const removeBonus = (alunoId) => {
    setAlunos((prev) =>
      prev.map((a) => {
        if (a.matricula === alunoId) {
          const saldoFuturo = a.bonusTotalAcumulado + (a.bonus - 10);

          if (saldoFuturo >= 0) {
            return { ...a, bonus: a.bonus - 10 };
          }
        }
      }),
    );
  };

  const handleSalvar = async () => {
    const dadosFormatados = alunos
      .map((aluno) => {
        return {
          matricula: aluno.matricula,
          botcoin: aluno.bonus || 0,
          presente: aluno.presente,
          workshop_id: Number(id),
          admin_mat: matriculaUsuario,
        };
      })
      .filter(
        (d) =>
          d.botcoin !== 0 ||
          d.presente !==
            alunos.find((a) => a.matricula === d.matricula).jaEstavaPresente,
      );

    if (dadosFormatados.length === 0)
      return toast.error("Nada novo para salvar.");

    try {
      const res = await fetch(`${API_URL}/workshops/salvar-presenca`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosFormatados),
      });

      const data = await res.json();
      if (!data.erro) {
        toast.success("Lançamentos salvos com sucesso!");
        setAlunos((prev) =>
          prev.map((a) => ({
            ...a,
            jaEstavaPresente: a.presente,
            bonusTotalAcumulado: a.bonusTotalAcumulado + a.bonus,
            bonus: 0,
          })),
        );
        if (data.botcoin !== undefined) {
          sessionStorage.setItem("botcoinUsuario", data.botcoin);
          window.dispatchEvent(new Event("botcoinUpdated"));
        }
      }
    } catch (err) {
      toast.error("Erro ao salvar no servidor.");
      console.error(err);
    }
  };

  const adicionarAluno = async () => {
    if (!buscaMatricula.trim()) return toast.error("Digite uma matrícula.");

    try {
      const res = await fetch(`${API_URL}/workshops/adicionar-matricula`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matricula: buscaMatricula,
          workshop_id: id,
        }),
      });

      const data = await res.json();

      if (res.ok && !data.erro) {
        toast.success(`${data.aluno.nome} adicionado à lista!`);

        setAlunos((prev) => [
          ...prev,
          {
            matricula: data.aluno.matricula,
            nome: data.aluno.nome,
            presente: false,
            jaEstavaPresente: false,
            bonus: 0,
            bonusTotalAcumulado: 0,
          },
        ]);

        setBuscaMatricula("");
      } else {
        toast.error(data.erro || "Erro ao adicionar aluno.");
      }
    } catch (err) {
      toast.error("Erro de conexão com o servidor: ", err);
    }
  };

  if (!isAdminReal)
    return (
      <div className="min-h-screen bg-[#0a1945] text-white flex items-center justify-center font-black uppercase tracking-widest text-2xl">
        Acesso Restrito à Engenharia
      </div>
    );
  if (loading)
    return (
      <div className="min-h-screen bg-[#0a1945] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  if (!workshop)
    return (
      <div className="min-h-screen bg-[#0a1945] text-white flex items-center justify-center font-black text-2xl">
        Workshop não mapeado.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans">
      <PrivateHeader />
      <main className="flex-grow flex flex-col items-center py-8 px-4 md:px-8">
        <div className="w-full max-w-5xl mb-6 flex justify-between items-center">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 font-bold transition-all uppercase text-xs tracking-widest"
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

        <div className="w-full max-w-5xl mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <span className="text-cyan-400 font-black tracking-[0.2em] uppercase text-[10px] mb-2 block">
              Painel de Controle
            </span>
            <h1 className="text-white font-black text-3xl md:text-5xl tracking-tighter uppercase leading-none">
              {workshop.titulo}
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-2 rounded-2xl border border-white/10">
            <input
              type="text"
              placeholder="Matrícula do aluno..."
              value={buscaMatricula}
              onChange={(e) => setBuscaMatricula(e.target.value)}
              className="bg-transparent border-none outline-none text-white text-sm px-4 py-2 w-48 font-bold"
            />
            <button
              className="bg-cyan-500 text-[#0a1945] px-4 py-2 rounded-xl font-black text-xs uppercase hover:bg-white transition-all"
              onClick={() => {
                adicionarAluno;
              }}
            >
              + Adicionar
            </button>
          </div>
        </div>

        <div className="w-full max-w-5xl bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="p-6 text-center w-32">Presença (+50 ₿)</th>
                <th className="p-6">Matrícula</th>
                <th className="p-6">Candidato</th>
                <th className="p-6 text-center w-64">Ajustar Bônus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {alunos.map((aluno) => (
                <tr
                  key={aluno.matricula}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="p-6 text-center">
                    <button
                      onClick={() => togglePresenca(aluno.matricula)}
                      className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all mx-auto ${aluno.presente ? "bg-green-500 border-green-500 text-[#0a1945] shadow-[0_0_15px_rgba(34,197,94,0.4)]" : "bg-transparent border-white/20 text-transparent hover:border-white/40"}`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="p-6 font-mono text-sm text-gray-500 group-hover:text-cyan-400 transition-colors">
                    {aluno.matricula}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="text-white font-black uppercase text-sm tracking-tight">
                        {aluno.nome}
                      </div>
                      {aluno.bonusTotalAcumulado > 0 && (
                        <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-md font-black border border-cyan-500/30">
                          {aluno.bonusTotalAcumulado} ₿ salvos
                        </span>
                      )}
                    </div>
                    {aluno.jaEstavaPresente && (
                      <span className="text-[9px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest mt-1 inline-block">
                        Confirmado
                      </span>
                    )}
                  </td>
                  <td className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => removeBonus(aluno.matricula)}
                        disabled={aluno.bonusTotalAcumulado + aluno.bonus === 0}
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
                          aluno.bonusTotalAcumulado + aluno.bonus > 0
                            ? "bg-red-500/10 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            : "bg-gray-800 border-gray-700 text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        -
                      </button>

                      <div
                        className={`min-w-[60px] py-1 rounded-lg font-black text-xs ${aluno.bonus > 0 ? "bg-yellow-500 text-[#0a1945]" : "bg-white/5 text-gray-500"}`}
                      >
                        +{aluno.bonus}
                      </div>

                      <button
                        onClick={() => addBonus(aluno.matricula)}
                        className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-[#0a1945] font-black transition-all"
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full max-w-5xl mt-10 flex justify-end">
          <button
            onClick={handleSalvar}
            className="px-12 py-5 rounded-full bg-cyan-500 text-[#0a1945] font-black text-xl hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] uppercase tracking-tighter"
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
