import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import UserDropdown from "../components/UserDropdown";
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [emManutencao, setEmManutencao] = useState(false);

  const [dados, setDados] = useState({
    nome: localStorage.getItem("nomeUsuario") || "",
    matricula: localStorage.getItem("matriculaUsuario") || "",
    email: localStorage.getItem("emailUsuario") || "",
    tel: localStorage.getItem("telUsuario") || "",
    areas: ["eletronica", "mecanica"],
  });

  // Lógica de Admin baseada nos dados iniciais
  const envAdmins = import.meta.env.VITE_ADMIN_MATRICULAS || "2610000";
  const isAdmin = envAdmins.split(",").includes(dados.matricula);

  useEffect(() => {
    if (isAdmin) {
      fetch(`${API_URL}/status-sistema`)
        .then((res) => res.json())
        .then((data) => setEmManutencao(data.manutencao))
        .catch((err) => console.error("Erro ao buscar status:", err));
    }
  }, [isAdmin]);

  // Função para Inputs de texto simples
  const handleChange = (e) => {
    const value = e?.target ? e.target.value : e;
    const name = e?.target ? e.target.name : "nome";
    setDados((prev) => ({ ...prev, [name]: value }));
  };

  // Função para o Telefone (que usa Máscara)
  const handleTelChange = (value) => {
    setDados((prev) => ({ ...prev, tel: String(value) }));
  };

  // Função vazia para blindar os campos ReadOnly contra o erro "c is not a function"
  const noop = () => {};

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
              Mantenha seus dados atualizados.
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

          <div className="lg:w-2/3 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-10 text-[#0a1945]">
            <div className="flex justify-between items-start mb-8">
              <h2 className="font-black uppercase text-2xl">Dados Pessoais</h2>
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-[#0a1945] flex items-center justify-center text-white"
                >
                  <svg
                    className="w-6 h-6"
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

            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Input
                  {...FORM_FIELDS.nome}
                  name="nome"
                  value={dados.nome}
                  onChange={handleChange}
                />
                <div className="opacity-50">
                  <Input
                    {...FORM_FIELDS.matricula}
                    value={dados.matricula}
                    readOnly
                    disabled
                    onChange={noop} // Evita erro de função no IMask
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <div className="opacity-50">
                  <Input
                    {...FORM_FIELDS.email}
                    value={dados.email}
                    readOnly
                    disabled
                    onChange={noop} // Evita erro de função no IMask
                  />
                </div>
                <Input
                  {...FORM_FIELDS.telefone}
                  name="tel"
                  value={dados.tel}
                  onChange={handleTelChange}
                />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                  Suas Áreas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dados.areas.map((area) => (
                    <span
                      key={area}
                      className={`${CORES_AREAS[area] || "bg-gray-500"} text-white px-4 py-2 rounded-xl font-bold text-[10px] uppercase flex items-center gap-2`}
                    >
                      {area} <span className="cursor-pointer">×</span>
                    </span>
                  ))}
                  <Link
                    to="/escolha"
                    className="border-2 border-dashed border-gray-200 text-gray-400 px-4 py-2 rounded-xl font-bold text-[10px] uppercase"
                  >
                    + Editar
                  </Link>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 border-t pt-6">
                <Link
                  to="/home"
                  className="px-8 py-4 font-bold text-gray-400 uppercase text-xs"
                >
                  Cancelar
                </Link>
                <button
                  type="button"
                  className="bg-[#0a1945] text-white font-black px-10 py-4 rounded-2xl uppercase text-xs tracking-widest"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Perfil;
