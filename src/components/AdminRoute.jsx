import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  // Puxa quem está tentando acessar
  const matriculaAtual = localStorage.getItem("matriculaUsuario") || "";
  
  // Puxa a lista VIP do .env
  const adminList = import.meta.env.VITE_ADMIN_MATRICULAS?.split(",") || [];

  // Se a matrícula não estiver na lista VIP, chuta ele de volta pra Home
  if (!adminList.includes(matriculaAtual)) {
    return <Navigate to="/home" replace />;
  }

  // Se estiver tudo certo, deixa ele ver a página de Admin
  return children;
}

export default AdminRoute;
