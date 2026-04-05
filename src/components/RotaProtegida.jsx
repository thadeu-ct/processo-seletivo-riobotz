import { Navigate, Outlet, useLocation } from "react-router-dom";

const RotaProtegida = ({ children, requireAdmin = false }) => {
  const location = useLocation();

  const matricula = sessionStorage.getItem("matriculaUsuario");
  const registrado = sessionStorage.getItem("registrado") === "true";
  const loginStatus = sessionStorage.getItem("loginStatus");

  const envAdmins = import.meta.env.VITE_ADMIN_MATRICULAS || "";
  const isAdmin = envAdmins.split(",").includes(matricula);

  if (!matricula) {
    return (
      <Navigate
        to="/cadastro"
        state={{
          erro: "Usuário não cadastrado, conclua o cadastro para entrar",
        }}
        replace
      />
    );
  }

  if (!registrado) {
    if (location.pathname !== "/login") {
      return <Navigate to="/login" state={{ status: "pending_ctc" }} replace />;
    }
  }

  if (loginStatus === "waiting_room" && location.pathname !== "/espera") {
    return <Navigate to="/espera" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children ? children : <Outlet />;
};

export default RotaProtegida;
