import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import UserDropdown from "../components/UserDropdown";
import { FORM_FIELDS } from "../services/formFields";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function RegistroAdmin() {
  const navigate = useNavigate();
  const [novaMatricula, setNovaMatricula] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Lista de usuários que virá do banco de dados
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(`${API_URL}/candidatos`);
        const data = await resp.json();
        console.error(data);
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao verificar data do processo:", error);
        navigate("/registro-admin"); 
      }
    };
  
    fetchData();
  }, []);


  const handleToggleRegistro = async (mat, statusAtual) => {
    // Aqui entrará o fetch PUT/PATCH para atualizar o status no banco de dados.
    // Exemplo: await fetch(`${API_URL}/admin/toggle-status`, { method: "PUT", body: JSON.stringify({ mat, registrado: !statusAtual }) })
    
    // Atualização visual instantânea na tela (Otimista)
    setUsuarios((prev) =>
      prev.map((u) => (u.mat === mat ? { ...u, registrado: !statusAtual } : u))
    );
  };

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col items-center pb-12">
      
      {/* HEADER ESPECÍFICO DO ADMIN */}
      <div className="w-full flex justify-between items-center px-6 py-4 md:px-12 mb-8 bg-white/5 border-b border-white/10">
        <Link to="/home" className="text-white font-bold hover:text-yellow-400 transition-colors flex items-center gap-2">
          <span>&larr;</span> Voltar
        </Link>
        
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-10 h-10 rounded-full bg-blue-800 border-2 border-transparent hover:border-yellow-400 transition-all flex items-center justify-center text-white"
          >
            <span className="font-bold">A</span> {/* Pode por o ícone SVG aqui */}
          </button>
          {isProfileOpen && <UserDropdown onClose={() => setIsProfileOpen(false)} />}
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="w-11/12 max-w-4xl flex flex-col gap-6">
        {/* LISTA DE INSCRITOS */}
        <div className="bg-white rounded-lg p-6 shadow-xl overflow-hidden">
          <h2 className="text-[#0a1945] font-extrabold text-xl mb-4 border-b pb-2">Controle de Inscritos</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 text-sm uppercase bg-gray-50">
                  <th className="p-3 rounded-tl-lg">Matrícula</th>
                  <th className="p-3">Nome</th>
                  <th className="p-3">Contato</th>
                  <th className="p-3 text-center rounded-tr-lg">Acesso Liberado</th>
                </tr>
              </thead>
              <tbody className="text-[#0a1945] font-medium divide-y divide-gray-100">
                {usuarios.map((user) => (
                  <tr key={user.mat} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3">{user.mat}</td>
                    <td className="p-3">{user.nome}</td>
                    <td className="p-3">
                      <div className="flex gap-3">
                        {/* LINK PARA WHATSAPP */}
                        <a 
                          href={`https://wa.me/${user.tel.replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-800"
                          title="Chamar no WhatsApp"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.656.84 5.163 2.383 7.234L.54 24l4.89-1.328a11.97 11.97 0 006.601 1.944c6.648 0 12.031-5.383 12.031-12.031S18.679 0 12.031 0zm0 22.422a9.78 9.78 0 01-5.015-1.383l-.36-.21-3.734 1.015.998-3.64-.234-.375A9.73 9.73 0 012.25 12.03C2.25 6.633 6.633 2.25 12.031 2.25s9.781 4.383 9.781 9.781-4.383 9.781-9.781 9.781zm5.367-7.312c-.297-.15-1.758-.867-2.031-.969-.274-.101-.469-.15-.672.15-.203.297-.766.969-.938 1.172-.172.203-.344.226-.64.078-1.5-.75-2.61-1.352-3.602-2.797-.281-.414.281-.39.851-1.531.094-.188.047-.36-.023-.516-.07-.156-.672-1.617-.922-2.219-.242-.586-.492-.508-.672-.516-.172-.008-.367-.008-.562-.008s-.516.07-.789.367c-.273.297-1.047 1.023-1.047 2.492s1.07 2.89 1.219 3.094c.148.203 2.11 3.218 5.109 4.507 2.016.867 2.813.93 3.86.781 1.203-.172 2.656-1.086 3.031-2.133.375-1.047.375-1.945.266-2.133-.11-.188-.407-.305-.704-.453z"/></svg>
                        </a>
                        {/* LINK PARA E-MAIL */}
                        <a 
                          href={`mailto:${user.email}`} 
                          className="text-blue-600 hover:text-blue-800"
                          title="Enviar E-mail"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        </a>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={user.registrado}
                          onChange={() => handleToggleRegistro(user.mat, user.registrado)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                      </label>
                    </td>
                  </tr>
                ))}
                
                {usuarios.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">Nenhum candidato encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RegistroAdmin;
