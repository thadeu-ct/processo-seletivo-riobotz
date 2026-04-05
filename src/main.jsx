import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";

// components
import RotaProtegida from "./components/RotaProtegida";
import AdminRoute from "./components/AdminRoute";
import EmConstrucao from "./components/UnderConstruction";

// features
import ForgotPassword from "./features/ForgotPassword";
import Botcoins from "./features/Botcoins";

// pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import HomeWaiting from "./pages/HomeWaiting";
import Home from "./pages/Home";
import Escolha from "./pages/EscolhaAreas";
import Autonomos from "./pages/Autonomos";
import Comunicacao from "./pages/Comunicacao";
import Eletronica from "./pages/Eletronica";
import Gestao from "./pages/Gestao";
import Mecanica from "./pages/Mecanica";
import Quiz from "./pages/Quiz";
import AdminWorkshop from "./pages/AdminWorkshop";
import RegistroAdmin from "./pages/RegistroAdmin";
import Perfil from "./pages/Perfil";
import Calendario from "./pages/Calendario";
import MateriaisExtras from "./pages/MateriaisExtras";
import AdminQuiz from "./pages/AdminQuiz";
import AdminPerguntas from "./pages/AdminPerguntas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/trocar-senha",
    element: <ForgotPassword />,
  },
  {
    element: <RotaProtegida />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/escolha",
        element: <Escolha />,
      },
      {
        path: "/espera",
        element: <HomeWaiting />,
      },
      {
        path: "/workshops/autonomos",
        element: <Autonomos />,
      },
      {
        path: "/workshops/comunicacao",
        element: <Comunicacao />,
      },
      {
        path: "/workshops/eletronica",
        element: <Eletronica />,
      },
      {
        path: "/workshops/gestao",
        element: <Gestao />,
      },
      {
        path: "/workshops/mecanica",
        element: <Mecanica />,
      },
      {
        path: "/workshops/materiais-extras",
        element: <MateriaisExtras />,
      },
      {
        path: "/quiz/:id",
        element: <Quiz />,
      },
      {
        path: "/perfil",
        element: <Perfil />,
      },
      {
        path: "/calendario",
        element: <Calendario />,
      },
      {
        path: "/botcoins",
        element: <Botcoins />,
      },
      {
        path: "/em-constucao",
        element: <EmConstrucao />,
      },
      {
        path: "/registro-admin",
        element: (
          <AdminRoute>
            <RegistroAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/workshop/:id",
        element: (
          <AdminRoute>
            <AdminWorkshop />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/quiz/:id",
        element: (
          <AdminRoute>
            <AdminQuiz />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/quiz/perguntas/:id",
        element: (
          <AdminRoute>
            <AdminPerguntas />
          </AdminRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#0a1945",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#fbbf24",
            secondary: "#0a1945",
          },
          style: {
            border: "1px solid #fbbf24",
          },
        },
        error: {
          style: {
            border: "1px solid #ef4444",
          },
        },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>,
);
