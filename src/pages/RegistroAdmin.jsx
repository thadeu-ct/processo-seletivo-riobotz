import { useState } from "react";
import Input from "../components/Input";
import { FORM_FIELDS } from "../services/formFields";

// Usa a mesma variável de ambiente que você já tem
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function RegistroAdmin() {
  const [matricula, setMatricula] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem({ texto: "", tipo: "" });

    // Limpa a máscara (se houver) para mandar só os números pro Telhado
    const matLimpa = matricula.replace(/\D/g, "");

    try {
      // Ajuste essa rota para a que o Telhado criar no Flask para os Admins
      const response = await fetch(`${API_URL}/admin/registrar-matricula`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Se tiver token de autenticação, vai aqui:
          // "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ mat: matLimpa }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem({
          texto: "Matrícula liberada com sucesso!",
          tipo: "sucesso",
        });
        setMatricula(""); // Limpa o campo para o próximo
      } else {
        setMensagem({
          texto: data.erro || "Erro ao registrar matrícula.",
          tipo: "erro",
        });
      }
    } catch (error) {
      console.error("Erro na requisição de admin:", error); // <-- Agora a variável é usada!
      setMensagem({ texto: "Erro de conexão com o servidor.", tipo: "erro" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col items-center py-12">
      <div className="bg-white rounded-lg p-8 w-11/12 max-w-md shadow-2xl">
        <h1 className="text-[#0a1945] font-extrabold text-2xl text-center mb-2">
          Painel de Admin
        </h1>
        <p className="text-gray-600 text-center text-sm mb-6">
          Libere matrículas para o Processo Seletivo.
        </p>

        {mensagem.texto && (
          <div
            className={`px-4 py-3 rounded relative mb-4 text-sm text-center ${mensagem.tipo === "sucesso" ? "bg-green-100 border border-green-400 text-green-700" : "bg-red-100 border border-red-400 text-red-700"}`}
          >
            {mensagem.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input
            {...FORM_FIELDS.matricula}
            name="matricula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading || matricula.length < 5}
            className={`bg-yellow-500 hover:bg-yellow-600 text-[#0a1945] font-bold py-3 px-8 rounded mt-4 transition-colors ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Registrando..." : "Registrar Matrícula"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistroAdmin;
