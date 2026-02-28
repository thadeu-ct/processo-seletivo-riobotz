import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import LogoRioBotz from "../assets/logo-riobotz.svg";
import Input from "../components/Input";

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
    placeholder: "Digite sua senha",
  },
];

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    matricula: "",
    email: "",
    telefone: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados prontos para o Flask:", formData);

    /* lugar para fazer o fetch depois */

    alert("Dados salvos no console! Agora você pode se inscrever no CTC.");
  };

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col items-center py-10">
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
            className="bg-[#0a1945] hover:bg-blue-900 text-white font-bold py-3 px-8 rounded mt-4 w-1/2 mx-auto transition-colors"
          >
            Cadastrar
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-[#0a1945] font-extrabold text-lg mb-4">
            2. Inscreva-se <span className="underline">oficialmente</span> pelo
            site do CTC:
          </h2>

          <a
            href="https://www.cbctc.puc-rio.br/Paginas/MeuCB/Noticias.aspx?id=788"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold py-3 px-6 rounded-full transition-transform hover:scale-105"
          >
            Inscreva-se aqui
          </a>
        </div>
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
