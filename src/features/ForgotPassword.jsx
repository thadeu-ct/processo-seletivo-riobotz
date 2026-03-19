import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import LogoRioBotz from "../assets/logo-riobotz.svg";
import { FORM_FIELDS } from "../services/formFields";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function ForgotPassword() {
  const navigate = useNavigate();
  
  const [etapa, setEtapa] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });

  const [formData, setFormData] = useState({
    matricula: "",
    email: "",
    codigo: "",
    novaSenha: "",
    confirmacaoSenha: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMensagem({ texto: "", tipo: "" });
  };

  const handleSolicitarCodigo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem({ texto: "", tipo: "" });

    const matLimpa = formData.matricula.replace(/\D/g, "");

    try {
      const response = await fetch(`${API_URL}/solicitar-codigo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matricula: matLimpa, email: formData.email }),
      });

      const data = await response.json();

      if (response.ok && !data.erro) {
        setMensagem({ texto: "Código enviado! Verifique seu e-mail (e a caixa de spam).", tipo: "sucesso" });
        setEtapa(2);
      } else {
        setMensagem({ texto: data.erro || "Matrícula ou e-mail não encontrados.", tipo: "erro" });
      }
    } catch (error) {
      console.error("Erro ao solicitar código:", error);
      setMensagem({ texto: "Erro de conexão com o servidor.", tipo: "erro" });
    } finally {
      setLoading(false);
    }
  };

  const handleTrocarSenha = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem({ texto: "", tipo: "" });

    if (formData.novaSenha !== formData.confirmacaoSenha) {
      setMensagem({ texto: "As senhas não coincidem.", tipo: "erro" });
      setLoading(false);
      return;
    }

    if (formData.novaSenha.length < 6) {
      setMensagem({ texto: "A senha deve ter pelo menos 6 caracteres.", tipo: "erro" });
      setLoading(false);
      return;
    }

    const matLimpa = formData.matricula.replace(/\D/g, "");

    try {
      const response = await fetch(`${API_URL}/trocar-senha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matricula: matLimpa,
          codigo: formData.codigo,
          nova_senha: formData.novaSenha
        }),
      });

      const data = await response.json();

      if (response.ok && !data.erro) {
        setMensagem({ texto: "Senha alterada com sucesso! Redirecionando...", tipo: "sucesso" });
        setTimeout(() => navigate("/login"), 2500);
      } else {
        setMensagem({ texto: data.erro || "Código inválido ou expirado.", tipo: "erro" });
      }
    } catch (error) {
      console.error("Erro ao trocar senha:", error);
      setMensagem({ texto: "Erro de conexão com o servidor.", tipo: "erro" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col items-center pt-10 pb-4">
      <Link to="/login" className="mb-6">
        <img
          src={LogoRioBotz}
          alt="Logo RioBotz"
          className="h-16 transition-opacity duration-300 hover:opacity-80"
        />
      </Link>

      <h1 className="text-white font-extrabold text-3xl mb-6 tracking-wide">
        Trocar Senha
      </h1>

      <div className="bg-white rounded-lg p-8 w-11/12 max-w-sm shadow-2xl transition-all">
        {mensagem.texto && (
          <div className={`px-4 py-3 rounded relative mb-6 text-sm font-bold text-center border ${mensagem.tipo === "sucesso" ? "bg-green-100 text-green-700 border-green-400" : "bg-red-100 text-red-700 border-red-400"}`}>
            {mensagem.texto}
          </div>
        )}

        {etapa === 1 && (
          <form onSubmit={handleSolicitarCodigo} className="flex flex-col animate-fade-in">
            <p className="text-[#0a1945] text-sm mb-6 text-center font-medium">
              Confirme seus dados para receber um código de verificação por e-mail.
            </p>

            <Input
              {...FORM_FIELDS.matricula}
              name="matricula"
              value={formData.matricula}
              onChange={handleChange}
              required
            />

            <Input
              {...FORM_FIELDS.email}
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={loading || formData.matricula.length < 5 || !formData.email.includes("@")}
              className={`bg-yellow-500 hover:bg-yellow-600 text-[#0a1945] font-bold py-3 px-8 rounded mt-4 transition-colors ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Enviando..." : "Enviar Código"}
            </button>
          </form>
        )}

        {etapa === 2 && (
          <form onSubmit={handleTrocarSenha} className="flex flex-col animate-fade-in">
            <p className="text-[#0a1945] text-sm mb-6 text-center font-medium">
              Digite o código recebido no e-mail <br /> <b>{formData.email}</b>
            </p>

            <Input
              placeholder="Código de 6 dígitos"
              name="codigo"
              type="text"
              maxLength="6"
              value={formData.codigo}
              onChange={handleChange}
              required
              className="text-center font-bold tracking-widest text-lg"
            />

            <Input
              {...FORM_FIELDS.senha}
              placeholder="Nova Senha"
              name="novaSenha"
              value={formData.novaSenha}
              onChange={handleChange}
              required
            />

            <Input
              {...FORM_FIELDS.senha}
              placeholder="Confirmar Nova Senha"
              name="confirmacaoSenha"
              value={formData.confirmacaoSenha}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={loading || formData.codigo.length < 6 || formData.novaSenha.length < 6}
              className={`bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-8 rounded mt-4 transition-colors ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Salvando..." : "Redefinir Senha"}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-sm text-gray-500 hover:text-[#0a1945] underline font-medium"
          >
            Lembrei minha senha!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
