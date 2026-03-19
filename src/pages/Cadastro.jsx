import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import LogoRioBotz from "../assets/logo-riobotz.svg";
import Input from "../components/Input";
import CBCTC from "../components/CBCTC";
import TermosCond from "../features/TermosCond";
import { FORM_FIELDS } from "../services/formFields";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

const camposCadastro = [
  FORM_FIELDS.nome,
  FORM_FIELDS.matricula,
  FORM_FIELDS.email,
  FORM_FIELDS.telefone,
  FORM_FIELDS.senha,
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

  const [showTermosModal, setShowTermosModal] = useState(false);
  const [leuTermos, setLeuTermos] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage("");
  };

  const abrirTermos = (e) => {
    e.preventDefault();
    setShowTermosModal(true);
    setLeuTermos(true);
  };

  const handleCheckboxChange = (e) => {
    if (!leuTermos) {
      setErrorMessage(
        "Por favor, clique no link e leia os Termos e Condições antes de concordar.",
      );
      return;
    }
    setAceitouTermos(e.target.checked);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aceitouTermos) {
      setErrorMessage(
        "Você precisa aceitar os termos e condições para prosseguir.",
      );
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const matLimpa = formData.matricula.replace(/\D/g, "");

    const dataToSend = new FormData();
    dataToSend.append("nome", formData.nome);
    dataToSend.append("mat", matLimpa);
    dataToSend.append("email", formData.email);
    dataToSend.append("tel", formData.telefone);
    dataToSend.append("senha", formData.senha);

    try {
      const response = await fetch(`${API_URL}/cadastro`, {
        method: "POST",
        body: dataToSend,
      });

      const data = await response.json();

      if (data.erro && data.erro !== 0) {
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
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col items-center py-10 relative">
      {showCTCModal && <CBCTC onConfirm={handleCTCConfirm} />}
      {showTermosModal && (
        <TermosCond onClose={() => setShowTermosModal(false)} />
      )}

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
          {camposCadastro.map((field) => (
            <Input
              key={field.id}
              {...field}
              name={field.id}
              value={formData[field.id]}
              onChange={handleChange}
              required
            />
          ))}

          <div className="flex items-start mt-4 mb-2">
            <div className="flex items-center h-5">
              <input
                id="termos"
                type="checkbox"
                checked={aceitouTermos}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-yellow-500 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2 cursor-pointer"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="termos"
                className="font-medium text-gray-700 cursor-pointer"
              >
                Eu li e concordo com os{" "}
                <button
                  onClick={abrirTermos}
                  className="text-blue-600 hover:underline font-bold bg-transparent border-none p-0 cursor-pointer"
                >
                  Termos e Condições
                </button>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !aceitouTermos}
            className={`bg-[#0a1945] hover:bg-blue-900 text-white font-bold py-3 px-8 rounded mt-6 w-1/2 mx-auto transition-colors ${loading || !aceitouTermos ? "opacity-50 cursor-not-allowed" : ""}`}
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
