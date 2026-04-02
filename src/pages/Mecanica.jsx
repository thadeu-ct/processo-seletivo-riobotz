import { useEffect, useState } from "react";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import Workshop from "../components/Workshop";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

const extrairValorTempo = (dataHoraStr) => {
  if (!dataHoraStr) return 0;
  try {
    const partes = dataHoraStr.split(",");
    const [dia, mes] = partes[0].trim().split("/");
    const horaInicial = partes[2].split("-")[0].trim();
    const [hora, minuto] = horaInicial.split(":");
    return new Date(
      2026,
      parseInt(mes) - 1,
      parseInt(dia),
      parseInt(hora),
      parseInt(minuto),
    ).getTime();
  } catch (error) {
    console.error(
      `Erro ao tentar processar a data/hora "${dataHoraStr}":`,
      error,
    );
    return Infinity;
  }
};

function Mecanica() {
  const matriculaUsuario = sessionStorage.getItem("matriculaUsuario") || "";
  const envAdmins = import.meta.env.VITE_ADMIN_MATRICULAS || "";

  const isAdminReal = envAdmins.split(",").includes(matriculaUsuario);
  const viewAsAdmin = sessionStorage.getItem("viewAsAdmin") === "true";
  const finalAdminView = isAdminReal && viewAsAdmin;

  const [trilhaMecanica, setTrilhaMecanica] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const matricula = sessionStorage.getItem("matriculaUsuario");

        const resW = await fetch(`${API_URL}/workshops/area`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ area: "mecanica" }),
        });
        const workshops = await resW.json();

        let inscritosIds = [];
        if (matricula) {
          const resI = await fetch(`${API_URL}/user/workshops`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ matricula }),
          });
          const dataI = await resI.json();
          inscritosIds = dataI.map((item) => item.id);
        }

        if (Array.isArray(workshops)) {
          const workshopsFinal = workshops.map((ws) => ({
            ...ws,
            jaInscrito: inscritosIds.includes(ws.id),
          }));

          const ordenados = workshopsFinal.sort(
            (a, b) =>
              extrairValorTempo(a.dataHora) - extrairValorTempo(b.dataHora),
          );
          setTrilhaMecanica(ordenados);
        }
      } catch (err) {
        console.error("Erro ao carregar trilha:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans">
      <PrivateHeader />
      {loading ? (
        <main className="flex-grow flex flex-col items-center justify-center bg-[#0a1945]">
          <div className="relative flex items-center justify-center w-32 h-32">
            <svg
              className="w-full h-full text-orange-400 anim-dash opacity-80 drop-shadow-[0_0_15px_rgba(251,146,60,0.5)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
            </svg>
            <div className="absolute inset-0 border-4 border-orange-400/20 border-t-orange-400 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-orange-400 font-black uppercase tracking-[0.3em] text-xs mt-8 animate-pulse">
            Sincronizando Mecânica...
          </h2>
        </main>
      ) : (
        <main className="flex-grow flex flex-col items-center py-8 px-4 md:px-8 relative">
          <div className="w-full max-w-4xl mb-8">
            <Link
              to="/home"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 font-bold transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Voltar
            </Link>
          </div>

          <div className="mb-12 w-full max-w-4xl flex items-center gap-4 md:gap-6">
            <div className="flex-shrink-0 flex justify-center items-center w-16 h-16 md:w-20 md:h-20 bg-orange-400/10 rounded-2xl border border-orange-400/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-orange-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-orange-400 font-black text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase font-mono m-0">
                Mecânica
              </h1>
              {finalAdminView && (
                <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest mt-1">
                  Visualização: Administrador
                </span>
              )}
            </div>
          </div>

          <div className="w-full max-w-4xl relative">
            <div className="absolute left-[19px] md:left-[39px] top-4 bottom-0 w-1 bg-orange-400/20 rounded-full"></div>

            <div className="flex flex-col gap-12">
              {trilhaMecanica.map((item, index) => {
                if (!item) return null;

                return (
                  <div
                    key={item.id}
                    className="relative flex items-start group"
                  >
                    <div className="absolute left-0 md:left-5 top-8 w-10 h-10 rounded-full bg-[#0a1945] border-4 border-orange-400 z-10 flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                      <span className="text-orange-400 font-black text-sm font-mono">
                        {index + 1}
                      </span>
                    </div>

                    <div className="ml-14 md:ml-24 w-full">
                      <Workshop {...item} isAdminView={finalAdminView} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}

export default Mecanica;
