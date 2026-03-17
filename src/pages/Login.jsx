import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import LogoRioBotz from "../assets/logo-riobotz.svg";
import Input from "../components/Input";
import { FORM_FIELDS } from "../services/formFields";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    matricula: "",
    senha: "",
  });

  const [loginStatus, setLoginStatus] = useState("idle");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const verificarDestino = async (matriculaUsuario) => {
    const ADMIN_MATRICULAS = ["2610000"]; 

    if (ADMIN_MATRICULAS.includes(matriculaUsuario)) {
      navigate("/home");
      return;
    }

    try {
      const resp = await fetch(`${API_URL}/data`);
      const data = await resp.json();

      if (data.date === false) {
        navigate("/espera");
      } else {
        navigate("/escolha");
      }
    } catch (error) {
      console.error("Erro ao verificar data do processo:", error);
      navigate("/home"); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginStatus("idle");

    const matLimpa = formData.matricula.replace(/\D/g, "");

    const dataToSend = new FormData();
    dataToSend.append("matricula", matLimpa);
    dataToSend.append("senha", formData.senha);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        body: dataToSend,
      });

      const result = await response.json();

      if (result.erro) {
        console.log("Erro Login:", result.erro);
        setLoginStatus("invalid_credentials");
      } else if (result.registrado === false) {
        console.log("Usuário ainda não oficializado no CTC.");
        setLoginStatus("pending_ctc");
      } else {
        console.log("Bem-vindo,", result.nome);
        localStorage.setItem("nomeUsuario", result.nome);
        localStorage.setItem("matriculaUsuario", result.matricula);
        localStorage.setItem("botcoinUsuario", result.botcoin);
        await verificarDestino(result.matricula);
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert(
        "Erro ao conectar com o servidor. Verifique se a API está rodando.",
      );
    } finally {
      setLoading(false);
    }
  };

  const resetLogin = () => {
    setLoginStatus("idle");
    setFormData({ matricula: "", senha: "" });
  };

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col items-center pt-10 pb-4">
      <Link to="/" className="mb-6">
        <img
          src={LogoRioBotz}
          alt="Logo RioBotz"
          className={`h-16 transition-opacity duration-300 ${loginStatus === "pending_ctc" ? "opacity-50" : "opacity-100"}`}
        />
      </Link>

      {loginStatus !== "pending_ctc" && (
        <h1 className="text-white font-extrabold text-3xl mb-6 tracking-wide">
          Login
        </h1>
      )}

      <div className="bg-white rounded-lg p-8 w-11/12 max-w-sm shadow-2xl">
        {loginStatus === "pending_ctc" ? (
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[#0a1945] font-extrabold text-2xl mb-4">
              Oops...
            </h2>
            <p className="text-[#0a1945] text-sm mb-6 font-medium">
              Estamos aguardando a confirmação da sua inscrição pelo CTC.
            </p>
            <p className="text-[#0a1945] font-extrabold mb-6">
              Ainda não se inscreveu pelo site do CTC?
            </p>

            <a
              href="https://www.cbctc.puc-rio.br/Paginas/MeuCB/Noticias.aspx?id=788"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-400 text-[#0a1945] font-extrabold py-3 px-6 rounded transition-transform hover:scale-105 w-full mb-4"
            >
              Inscreva-se aqui!
            </a>

            <button
              onClick={resetLogin}
              className="text-sm text-gray-500 hover:text-[#0a1945] underline mt-2"
            >
              Voltar para o Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            {loginStatus === "invalid_credentials" && (
              <div className="bg-blue-100 border border-blue-300 text-[#0a1945] p-3 rounded text-xs text-center mb-6">
                <p className="font-semibold">Credenciais inválidas.</p>
                <p>Verifique sua matrícula e senha e tente novamente.</p>
              </div>
            )}

            <Input
              {...FORM_FIELDS.matricula}
              name="matricula"
              value={formData.matricula}
              onChange={handleChange}
              required
            />

            <Input
              {...FORM_FIELDS.senha}
              placeholder="Digite sua senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />

            <div className="text-right -mt-2 mb-4">
              <Link
                to="/redefinir"
                className="text-sm text-gray-500 hover:text-[#0a1945] underline font-medium"
              >
                Esqueci minha senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`bg-[#0a1945] hover:bg-blue-900 text-white font-bold py-3 px-8 rounded mt-2 w-1/2 mx-auto transition-colors ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        )}
      </div>

      {loginStatus !== "pending_ctc" && (
        <p className="text-gray-300 text-sm mt-6">
          Não possui cadastro? Cadastre-se{" "}
          <Link to="/cadastro" className="underline hover:text-white">
            aqui
          </Link>
          .
        </p>
      )}

      <Footer />
    </div>
  );
}

export default Login;
