import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import UserDropdown from "../components/UserDropdown";
import { FORM_FIELDS } from "../services/formFields";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function Perfil() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Estados para Manutenção (ADMIN ONLY)
  const [emManutencao, setEmManutencao] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Estados para os Dados Pessoais
  const [dados, setDados] = useState({
    nome: "",
    tel: "",
    email: "",
    matricula: "",
  });
  const [loadingDados, setLoadingDados] = useState(false);
  const [msgDados, setMsgDados] = useState({ texto: "", tipo: "" });

  // Estados para Alteração de Senha
  const [senhas, setSenhas] = useState({
    atual: "",
    nova: "",
    confirmacao: "",
  });
  const [loadingSenha, setLoadingSenha] = useState(false);
  const [msgSenha, setMsgSenha] = useState({ texto: "", tipo: "" });

  useEffect(() => {
    // 1. Carrega dados do usuário
    const matriculaLogada = localStorage.getItem("matriculaUsuario") || "";
    setDados((prev) => ({
      ...prev,
      nome: localStorage.getItem("nomeUsuario") || "",
      matricula: matriculaLogada,
      tel: localStorage.getItem("telUsuario") || "",
      email: localStorage.getItem("emailUsuario") || "",
    }));

    // 2. Verifica se é Admin (Lógica idêntica ao seu Login.jsx)
    const envAdmins = import.meta.env.VITE_ADMIN_MATRICULAS || "2610000";
    const ADMIN_MATRICULAS = envAdmins.split(",");
    if (ADMIN_MATRICULAS.includes(matriculaLogada)) {
      setIsAdmin(true);
      // 3. Se for admin, busca o status atual da manutenção no banco
      fetch(`${API_URL}/status-sistema`)
        .then((res) => res.json())
        .then((data) => setEmManutencao(data.manutencao))
        .catch((err) => console.error("Erro ao buscar status:", err));
    }
  }, []);

  // Função para o Admin ligar/desligar o site
  const toggleManutencao = async () => {
    const novoStatus = !emManutencao;
    try {
      const response = await fetch(`${API_URL}/set-manutencao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: novoStatus,
          admin_mat: dados.matricula,
        }),
      });
      const result = await response.json();
      if (result.erro === 0) {
        setEmManutencao(novoStatus);
      }
    } catch (error) {
      console.error("Erro ao alterar status do sistema:", error);
    }
  };

  const handleChangeDados = (e) => {
    const { name, value } = e.target;
    setDados((prev) => ({ ...prev, [name]: value }));
    setMsgDados({ texto: "", tipo: "" });
  };

  const handleChangeSenhas = (e) => {
    const { name, value } = e.target;
    setSenhas((prev) => ({ ...prev, [name]: value }));
    setMsgSenha({ texto: "", tipo: "" });
  };

  const handleAtualizarDados = async (e) => {
    e.preventDefault();
    setLoadingDados(true);
    setMsgDados({ texto: "", tipo: "" });

    try {
      const response = await fetch(`${API_URL}/perfil/atualizar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matricula: dados.matricula,
          nome: dados.nome,
          tel: dados.tel.replace(/\D/g, ""),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMsgDados({
          texto: "Dados atualizados com sucesso!",
          tipo: "sucesso",
        });
        localStorage.setItem("nomeUsuario", dados.nome);
      } else {
        setMsgDados({
          texto: result.erro || "Erro ao atualizar dados.",
          tipo: "erro",
        });
      }
    } catch (error) {
      console.error("Erro:", error);
      setMsgDados({ texto: "Erro de conexão com o servidor.", tipo: "erro" });
    } finally {
      setLoadingDados(false);
    }
  };

  const handleAlterarSenha = async (e) => {
    e.preventDefault();
    setLoadingSenha(true);
    setMsgSenha({ texto: "", tipo: "" });

    if (senhas.nova !== senhas.confirmacao) {
      setMsgSenha({
        texto: "A nova senha e a confirmação não batem.",
        tipo: "erro",
      });
      setLoadingSenha(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/perfil/senha`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matricula: dados.matricula,
          senha_atual: senhas.atual,
          senha_nova: senhas.nova,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMsgSenha({ texto: "Senha alterada com sucesso!", tipo: "sucesso" });
        setSenhas({ atual: "", nova: "", confirmacao: "" });
      } else {
        setMsgSenha({
          texto: result.erro || "Senha atual incorreta.",
          tipo: "erro",
        });
      }
    } catch (error) {
      console.error("Erro:", error);
      setMsgSenha({ texto: "Erro de conexão com o servidor.", tipo: "erro" });
    } finally {
      setLoadingSenha(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col items-center pb-12">
      {/* HEADER DE NAVEGAÇÃO */}
      <div className="w-full flex justify-between items-center px-6 py-4 md:px-12 mb-8 bg-white/5 border-b border-white/10">
        <Link
          to="/home"
          className="text-white font-bold hover:text-yellow-400 transition-colors flex items-center gap-2"
        >
          <span>&larr;</span> Voltar
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-10 h-10 rounded-full bg-blue-800 border-2 border-transparent hover:border-yellow-400 transition-all flex items-center justify-center text-white"
          >
            <svg
              className="w-6 h-6 mt-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
          {isProfileOpen && (
            <UserDropdown onClose={() => setIsProfileOpen(false)} />
          )}
        </div>
      </div>

      <div className="w-11/12 max-w-2xl flex flex-col gap-8">
        {/* SESSÃO 1: DADOS PESSOAIS */}
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-xl">
          <h2 className="text-[#0a1945] font-extrabold text-xl mb-6 border-b pb-2">
            Meus Dados
          </h2>

          {msgDados.texto && (
            <div
              className={`px-4 py-3 rounded mb-4 text-sm font-bold text-center ${msgDados.tipo === "sucesso" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {msgDados.texto}
            </div>
          )}

          <form onSubmit={handleAtualizarDados} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="opacity-70 cursor-not-allowed">
                <Input
                  {...FORM_FIELDS.matricula}
                  value={dados.matricula}
                  onChange={() => {}}
                  readOnly
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div className="opacity-70 cursor-not-allowed">
                <Input
                  {...FORM_FIELDS.email}
                  value={dados.email}
                  onChange={() => {}}
                  readOnly
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>
            <Input
              {...FORM_FIELDS.nome}
              name="nome"
              value={dados.nome}
              onChange={handleChangeDados}
              required
            />
            <Input
              {...FORM_FIELDS.telefone}
              name="tel"
              value={dados.tel}
              onChange={handleChangeDados}
              required
            />

            <button
              type="submit"
              disabled={loadingDados}
              className={`bg-[#0a1945] hover:bg-blue-900 text-white font-bold py-3 px-8 rounded mt-2 md:w-1/2 md:ml-auto transition-colors ${loadingDados ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loadingDados ? "Salvando..." : "Atualizar Dados"}
            </button>
          </form>
        </div>

        {/* SESSÃO 2: ALTERAR SENHA */}
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-xl">
          <h2 className="text-[#0a1945] font-extrabold text-xl mb-6 border-b pb-2">
            Segurança
          </h2>
          {msgSenha.texto && (
            <div
              className={`px-4 py-3 rounded mb-4 text-sm font-bold text-center ${msgSenha.tipo === "sucesso" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {msgSenha.texto}
            </div>
          )}
          <form onSubmit={handleAlterarSenha} className="flex flex-col gap-4">
            <Input
              {...FORM_FIELDS.senha}
              name="atual"
              placeholder="Senha atual"
              value={senhas.atual}
              onChange={handleChangeSenhas}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...FORM_FIELDS.senha}
                name="nova"
                placeholder="Nova senha (mín. 6 caracteres)"
                value={senhas.nova}
                onChange={handleChangeSenhas}
                required
              />
              <Input
                {...FORM_FIELDS.senha}
                name="confirmacao"
                placeholder="Confirme a nova senha"
                value={senhas.confirmacao}
                onChange={handleChangeSenhas}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loadingSenha || senhas.nova.length < 6}
              className={`bg-yellow-500 hover:bg-yellow-600 text-[#0a1945] font-bold py-3 px-8 rounded mt-2 md:w-1/2 md:ml-auto transition-colors ${loadingSenha || senhas.nova.length < 6 ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loadingSenha ? "Alterando..." : "Alterar Senha"}
            </button>
          </form>
        </div>

        {/* SESSÃO 3: PAINEL ADMIN (Manutenção) - SÓ APARECE PARA ADMINS */}
        {isAdmin && (
          <div className="bg-yellow-500/10 border-2 border-dashed border-yellow-500/30 rounded-lg p-6 md:p-8 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-yellow-500 font-black text-xl uppercase tracking-tighter">
                  Modo de Manutenção
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Ative para redirecionar todos os candidatos para a página "Em
                  Construção".
                </p>
              </div>

              {/* Botão Switch Estilizado */}
              <button
                onClick={toggleManutencao}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${
                  emManutencao ? "bg-yellow-500" : "bg-white/10"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    emManutencao ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {emManutencao && (
              <div className="mt-4 p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/50 flex items-center gap-3 animate-pulse">
                <svg
                  className="w-5 h-5 text-yellow-500 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
                <span className="text-yellow-500 font-bold text-xs uppercase tracking-widest">
                  O sistema está fechado para o público.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Perfil;
