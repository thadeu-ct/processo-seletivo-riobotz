import { Link } from "react-router-dom";

function UserDropdown({ onClose }) {
  // Puxa as informações do localStorage (ajuste o nome da chave da matrícula se for diferente)
  const nomeSalvo = localStorage.getItem("nomeUsuario");
  const nomeUsuario = nomeSalvo ? nomeSalvo.split(" ")[0] : "Candidato(a)";
  const userMatricula = localStorage.getItem("matricula") || "";

  // Insira aqui as matrículas reais dos diretores/capitão que terão acesso
  const ADMIN_MATRICULAS = ["1234567", "9876543"];
  const isAdmin = ADMIN_MATRICULAS.includes(userMatricula);

  return (
    <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 animate-fade-in">
      <div className="px-4 py-3 border-b border-gray-100 mb-1">
        <p className="text-sm text-gray-500">Logado como</p>
        <p className="text-[#0a1945] font-black truncate">{nomeUsuario}</p>
      </div>

      <Link
        to="/perfil"
        onClick={onClose}
        className="block px-4 py-2 text-gray-700 font-bold hover:bg-yellow-50 hover:text-[#0a1945] transition-colors"
      >
        Configurações
      </Link>

      {/* Link de Admin (SÓ APARECE SE A MATRÍCULA BATER COM A LISTA VIP) */}
      {isAdmin && (
        <Link
          to="/registro-admin"
          onClick={onClose}
          className="block px-4 py-2 text-yellow-600 font-bold hover:bg-yellow-50 transition-colors"
        >
          Registro (Admin)
        </Link>
      )}

      <Link
        to="/"
        onClick={() => {
          onClose();
          // localStorage.clear(); // Descomente isso se quiser limpar os dados no logout
        }}
        className="block px-4 py-2 text-red-500 font-bold hover:bg-red-50 transition-colors"
      >
        Sair
      </Link>
    </div>
  );
}

export default UserDropdown;
