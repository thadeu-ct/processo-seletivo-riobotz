import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import Input from "../components/Input";
import { FORM_FIELDS } from "../services/formFields";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

const CORES_AREAS = {
  mecanica: "bg-[#f16c21]",
  autonomos: "bg-[#0aa14c]",
  eletronica: "bg-[#f1aa1b]",
  gestao: "bg-[#026be1]",
  comunicacao: "bg-[#6f29e1]",
};

function Perfil() {
  const [emManutencao, setEmManutencao] = useState(false);
  const [loading, setLoading] = useState(true);

  const [dados, setDados] = useState({
    nome: "",
    matricula: localStorage.getItem("matriculaUsuario") || "",
    email: "",
    telefone: "",
    areas: [],
  });

  const [senhas, setSenhas] = useState({
    atual: "",
    nova: "",
    confirmacao: "",
  });

  const envAdmins = import.meta.env.VITE_ADMIN_MATRICULAS || "2610000";
  const isAdmin = envAdmins.split(",").includes(dados.matricula);

  // Função vazia padrão para evitar o erro "c is not a function" nos componentes com máscara
  const noop = () => {};

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const response = await fetch(`${API_URL}/perfil/get`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ matricula: dados.matricula }),
        });
        const data = await response.json();

        if (!data.erro) {
          setDados({
            nome: data.nome,
            matricula: data.matricula,
            email: data.email,
            telefone: data.telefone || "",
            areas: data.areas || [],
          });
          localStorage.setItem("nomeUsuario", data.nome);
        }
      } catch (err) {
        console.error("Erro ao carregar dados do banco:", err);
      } finally {
        setLoading(false);
      }
    };

    const carregarStatus = async () => {
      if (isAdmin) {
        try {
          const res = await fetch(`${API_URL}/status-sistema`);
          const data = await res.json();
          setEmManutencao(data.manutencao);
        } catch (err) {
          console.error("Erro ao buscar status:", err);
        }
      }
    };

    carregarPerfil();
    carregarStatus();
  }, [isAdmin, dados.matricula]);

  const handleChange = (e) => {
    const value = e?.target ? e.target.value : e;
    const name = e?.target ? e.target.name : "nome";
    setDados((prev) => ({ ...prev, [name]: value }));
  };

  const handleSenhaChange = (e) => {
    const { name, value } = e.target;
    setSenhas((prev) => ({ ...prev, [name]: value }));
  };

  const handleTelChange = (value) => {
    // Se o componente de máscara falhar e enviar algo nulo, mantemos o estado anterior
    if (value === undefined || value === null) return;
    setDados((prev) => ({ ...prev, telefone: String(value) }));
  };

  const handleManutencaoToggle = async () => {
    const novoStatus = !emManutencao;
    setEmManutencao(novoStatus);
    try {
      await fetch(`${API_URL}/set-manutencao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: novoStatus,
          admin_mat: dados.matricula,
        }),
      });
    } catch (err) {
      console.error("Erro toggle:", err);
      setEmManutencao(!novoStatus);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1945] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1945] text-white font-sans flex flex-col">
      <PrivateHeader />

      <main className="flex-grow max-w-[1200px] mx-auto w-full px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              Configurações de <span className="text-yellow-500">Perfil</span>
            </h1>
            <p className="text-blue-200 font-medium">
              Dados sincronizados diretamente com o servidor da equipe.
            </p>

            {isAdmin && (
              <div className="mt-8 p-6 bg-yellow-500/10 border-2 border-dashed border-yellow-500/30 rounded-[2rem]">
                <h3 className="text-yellow-500 font-black uppercase text-xs mb-4">
                  Painel Admin
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase">
                    Modo Manutenção
                  </span>
                  <button
                    onClick={handleManutencaoToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emManutencao ? "bg-yellow-500" : "bg-white/20"}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emManutencao ? "translate-x-6" : "translate-x-1"}`}
                    />
                  </button>
                </div>
              </div>
            )}
          </aside>

          <div className="lg:w-2/3 flex flex-col gap-8">
            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-10 text-[#0a1945]">
              <div className="flex justify-between items-start mb-8">
                <h2 className="font-black uppercase text-2xl">
                  Dados Pessoais
                </h2>
                <div className="relative">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>

              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Input
                    {...FORM_FIELDS.nome}
                    name="nome"
                    value={dados.nome}
                    onChange={handleChange}
                  />
                  {/* BLINDAGEM TOTAL: Div bloqueia cliques e seleção, onChange é nulo */}
                  <div className="opacity-50 pointer-events-none select-none">
                    <Input
                      {...FORM_FIELDS.matricula}
                      value={dados.matricula}
                      readOnly
                      disabled
                      onChange={noop}
                      tabIndex="-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <div className="opacity-50 pointer-events-none select-none">
                    <Input
                      {...FORM_FIELDS.email}
                      value={dados.email}
                      readOnly
                      disabled
                      onChange={noop}
                    />
                  </div>
                  <Input
                    {...FORM_FIELDS.telefone}
                    name="telefone"
                    value={dados.telefone}
                    onChange={handleTelChange || noop}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                    Suas Áreas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dados.areas.length > 0 ? (
                      dados.areas.map((area) => (
                        <span
                          key={area}
                          className={`${CORES_AREAS[area.toLowerCase()] || "bg-gray-500"} text-white px-4 py-2 rounded-xl font-bold text-[10px] uppercase`}
                        >
                          {area}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-400 text-[10px] italic">
                        Nenhuma área selecionada.
                      </p>
                    )}
                    <Link
                      to="/escolha"
                      className="border-2 border-dashed border-gray-200 text-gray-400 px-4 py-2 rounded-xl font-bold text-[10px] uppercase hover:border-[#0a1945] transition-all"
                    >
                      + Editar
                    </Link>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    className="bg-[#0a1945] text-white font-black px-10 py-4 rounded-2xl uppercase text-xs tracking-widest hover:bg-blue-900 transition-all"
                  >
                    Salvar Dados
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-10 text-[#0a1945]">
              <h2 className="font-black uppercase text-2xl mb-8 border-b border-gray-100 pb-4">
                Segurança
              </h2>
              <form className="flex flex-col gap-6">
                <Input
                  {...FORM_FIELDS.senha}
                  name="atual"
                  placeholder="Senha atual"
                  value={senhas.atual}
                  onChange={handleSenhaChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <Input
                    {...FORM_FIELDS.senha}
                    name="nova"
                    placeholder="Nova senha (mín. 6 caracteres)"
                    value={senhas.nova}
                    onChange={handleSenhaChange}
                  />
                  <Input
                    {...FORM_FIELDS.senha}
                    name="confirmacao"
                    placeholder="Confirme a nova senha"
                    value={senhas.confirmacao}
                    onChange={handleSenhaChange}
                  />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    className="bg-yellow-500 text-[#0a1945] font-black px-10 py-4 rounded-2xl uppercase text-xs tracking-widest hover:bg-yellow-600 transition-all"
                  >
                    Alterar Senha
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Perfil;
