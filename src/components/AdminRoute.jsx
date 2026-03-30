import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const matriculaAtual = sessionStorage.getItem("matriculaUsuario") || "";

  const envAdmins = import.meta.env.VITE_ADMIN_MATRICULAS || "2610000";
  const ADMIN_MATRICULAS = envAdmins.split(",");

  if (!ADMIN_MATRICULAS.includes(matriculaAtual)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default AdminRoute;
