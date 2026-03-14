import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import LogoRioBotz from "../assets/logo-riobotz.svg";
import Input from "../components/Input";
import CBCTC from "../components/CBCTC";

// Endereço do Backend
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

const inputFields = [
  {
    id: "nome",
    label: "Nome completo:",
    type: "text",
    placeholder: "Digite seu nome completo",
  },
  {
    id: "matricula",
    label: "Matrícula:",
    type: "text",
    placeholder: "Digite seu número de matrícula",
    mask: "0000000",
  },
  {
    id: "email",
    label: "E-mail:",
    type: "email",
    placeholder: "Digite seu e-mail",
  },
  {
    id: "telefone",
    label: "Telefone:",
    type: "tel",
    placeholder: "Digite seu número de telefone",
    mask: "+00 (00) 00000-0000",
  },
  {
    id: "senha",
    label: "Senha:",
    type: "password",
    placeholder: "Digite sua senha (mínimo 6 caracteres)",
  },
];

function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    matricula: "",
    email: "",
    telefone: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCTCModal, setShowCTCModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Limpa a mensagem de erro quando o usuário começa a digitar de novo
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // O Flask do Telhado espera que a matrícula seja só número e o telefone tenha 14 chars.
    // Vamos limpar a formatação da matrícula que pode vir do Input mask
    const matLimpa = formData.matricula.replace(/\D/g, "");

    // Preparando os dados exatamente com os nomes que o api.py espera
    const dataToSend = new FormData();
    dataToSend.append("nome", formData.nome);
    dataToSend.append("mat", matLimpa); // O Flask quer 'mat'
    dataToSend.append("email", formData.email);
    dataToSend.append("tel", formData.telefone); // O Flask quer 'tel' (verifique se a máscara do Input gera exatos 14 chars no state)
    dataToSend.append("senha", formData.senha);

    try {
      const response = await fetch(`${API_URL}/cadastro`, {
        method: "POST",
        body: dataToSend,
      });

      const data = await response.json();

      if (data.erro && data.erro !== 0) {
        // Trata os códigos de erro que o Telhado criou (1=Nome, 2=Matricula, etc)
        const mensagensErro = {
          1: "Nome inválido ou contém caracteres perigosos.",
          2: "Matrícula deve conter apenas números.",
          3: "E-mail inválido.",
          4: "Telefone inválido. Formato esperado: 14 caracteres.",
          5: "Senha muito curta (mín. 6) ou inválida.",
        };

        setErrorMessage(
          mensagensErro[data.erro] || "Erro desconhecido no cadastro.",
        );
      } else {
        setShowCTCModal(true);
      }
    } catch (error) {
      console.error("Erro ao conectar:", error);
      setErrorMessage(
        "Erro ao conectar com o servidor. O Back-end está rodando?",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCTCConfirm = () => {
    // Dá um pequeno atraso para o navegador abrir a nova aba tranquilamente
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col items-center py-10 relative">
      {/* A MÁGICA ACONTECE AQUI: Se showCTCModal for true, o modal aparece e recebe a função! */}
      {showCTCModal && <CBCTC onConfirm={handleCTCConfirm} />}

      <Link to="/" className="mb-6">
        <img src={LogoRioBotz} alt="Logo RioBotz" className="h-16" />
      </Link>
      <h1 className="text-white font-bold text-xl mb-6">
        Inscreva-se em dois passos:
      </h1>

      <div className="bg-white rounded-lg p-8 w-11/12 max-w-md shadow-2xl">
        <h2 className="text-[#0a1945] font-extrabold text-lg text-center mb-6">
          1. Conte-nos mais sobre você!
        </h2>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          {inputFields.map((field) => (
            <Input
              key={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              mask={field.mask}
              name={field.id}
              value={formData[field.id]}
              onChange={handleChange}
              required
            />
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#0a1945] hover:bg-blue-900 text-white font-bold py-3 px-8 rounded mt-4 w-1/2 mx-auto transition-colors ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Enviando..." : "Cadastrar"}
          </button>
        </form>
      </div>

      <p className="text-gray-300 text-sm mt-6">
        Já possui cadastro? Entre{" "}
        <Link to="/login" className="underline hover:text-white">
          aqui
        </Link>
        .
      </p>

      <Footer />
    </div>
  );
}

export default Cadastro;
