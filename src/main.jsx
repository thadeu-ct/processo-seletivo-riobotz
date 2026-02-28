import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

/* PÁGINAS QUE TERÃO ROTAS */
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

/* Criação das rotas de cada arquivo e mapeamento das URLs */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/espera",
    element: <HomeWaiting />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/escolha",
    element: <Escolha />,
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
    path: "/quiz/:id",
    element: <Quiz />,
  },
  {
    path: "/admin/workshop/:id",
    element: <AdminWorkshop />,
  },
]);

/* Renderização das rotas para conexão das vias */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
