import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import LogoRioBotz from "../assets/logo-riobotz.svg";
import Input from "../components/Input";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [loginStatus, setLoginStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.senha === "falhalogin") {
      setLoginStatus("pending_ctc");
    } else if (formData.senha === "senhaerrada") {
      setLoginStatus("invalid_credentials");
    } else {
      setLoginStatus("idle");
      alert("Login aprovado! (Fingindo ir para a área logada)");
    }
  };

  const resetLogin = () => {
    setLoginStatus("idle");
    setFormData({ email: "", senha: "" });
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
                <p className="font-semibold">Senha inválida.</p>
                <p>
                  Esqueceu a senha? Redefina{" "}
                  <Link to="/redefinir" className="underline font-bold">
                    aqui
                  </Link>
                  .
                </p>
              </div>
            )}

            <Input
              id="email"
              label="E-mail:"
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              id="senha"
              label="Senha:"
              type="password"
              name="senha"
              placeholder="Digite sua senha"
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
              className="bg-[#0a1945] hover:bg-blue-900 text-white font-bold py-3 px-8 rounded mt-2 w-1/2 mx-auto transition-colors"
            >
              Entrar
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
