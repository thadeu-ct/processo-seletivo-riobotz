import { Navigate } from "react-router-dom";

function RotaAdmin({ children }) {
  const matriculaAtual = sessionStorage.getItem("matriculaUsuario") || "";

  const envAdmins = import.meta.env.VITE_ADMIN_MATRICULAS || "";
  const ADMIN_MATRICULAS = envAdmins.split(",");

  if (!ADMIN_MATRICULAS.includes(matriculaAtual)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default RotaAdmin;
