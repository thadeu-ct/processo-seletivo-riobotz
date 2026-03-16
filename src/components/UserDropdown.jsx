import { Link } from "react-router-dom";

function UserDropdown({ handleLogout }) {
  // 1. Puxa os dados do usuário logado (ajuste conforme o seu código salva no login)
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userMatricula = user.matricula;

  // 2. Define quem é Admin pela Matrícula (adicione as matrículas reais aqui)
  const ADMIN_MATRICULAS = ["1234567", "9876543"];
  const isAdmin = ADMIN_MATRICULAS.includes(userMatricula);

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
      {/* Cabeçalho do Dropdown */}
      <div className="px-4 py-3 text-sm text-gray-600 border-b border-gray-100">
        Logado como <br />
        <span className="font-extrabold text-[#0a1945] text-base">
          {user.nome || "RioBotz"}
        </span>
      </div>

      {/* Links */}
      <div className="py-1">
        <Link
          to="/configuracoes"
          className="block px-4 py-2 text-sm text-[#0a1945] font-bold hover:bg-gray-50"
        >
          Configurações
        </Link>

        {/* Link Condicional - Só aparece se a matrícula estiver na lista */}
        {isAdmin && (
          <Link
            to="/registro-admin"
            className="block px-4 py-2 text-sm text-yellow-600 font-bold hover:bg-gray-50"
          >
            Registro (Admin)
          </Link>
        )}
      </div>

      {/* Botão de Sair */}
      <div className="py-1 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-red-500 font-bold hover:bg-gray-50"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default UserDropdown;
