import { useState, useMemo } from "react";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import workshopsData from "../services/workshops.json";

const AREAS = [
  { id: "todas", nome: "Todas as Áreas" },
  { id: "mecanica", nome: "Mecânica" },
  { id: "eletronica", nome: "Eletrônica" },
  { id: "autonomos", nome: "Autônomos" },
  { id: "comunicacao", nome: "Comunicação" },
  { id: "gestao", nome: "Gestão" },
];

const DIAS_SEMANA = ["SEG", "TER", "QUA", "QUI", "SEX"];
const SLOTS = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];
const SLOT_HEIGHT = 80;

const CORES_AREAS = {
  mecanica: "#f16c21",
  autonomos: "#0aa14c",
  eletronica: "#f1aa1b",
  gestao: "#026be1",
  comunicacao: "#6f29e1",
};

const calcularLuminancia = (hex) => {
  const c = hex
    .substring(1)
    .split("")
    .map(function (c) {
      return parseInt(c + c, 16);
    });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

const obterEstiloFaixaLado = (areas) => {
  if (!areas || areas.length === 0) return { background: "#e5e7eb" };

  const coresValidas = areas
    .filter((areaId) => CORES_AREAS[areaId])
    .map((areaId) => ({
      id: areaId,
      hex: CORES_AREAS[areaId],
      lumi: calcularLuminancia(CORES_AREAS[areaId]),
    }));

  if (coresValidas.length === 1) {
    return { background: coresValidas[0].hex };
  } else if (coresValidas.length > 1) {
    coresValidas.sort((a, b) => a.lumi - b.lumi);
    return {
      backgroundImage: `linear-gradient(to bottom, ${coresValidas.map((c) => c.hex).join(", ")})`,
    };
  }
  return { background: "#e5e7eb" };
};

const parseTime = (timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

const getEventStyle = (inicio, fim) => {
  const baseMinutes = parseTime("17:00");
  const startMin = parseTime(inicio);
  const endMin = parseTime(fim);
  const top = ((startMin - baseMinutes) / 30) * SLOT_HEIGHT;
  const height = ((endMin - startMin) / 30) * SLOT_HEIGHT;
  return { top: `${top}px`, height: `${height}px` };
};

const calcularFimOnline = (inicio) => {
  const mins = parseTime(inicio) + 90;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
};

const processarDataHora = (dataHoraStr) => {
  if (!dataHoraStr)
    return { diaDaSemana: null, inicio: null, fim: null, horaLimpa: null };
  const partes = dataHoraStr.split(",").map((p) => p.trim());
  if (partes.length < 3)
    return { diaDaSemana: null, inicio: null, fim: null, horaLimpa: null };

  const horaLimpa = partes[2].replace(/\s/g, "");
  const [inicio, fim] = horaLimpa.split("-");

  return { diaDaSemana: partes[1], horaLimpa, inicio, fim };
};

function Calendario() {
  const [filtroArea, setFiltroArea] = useState("todas");
  const [inscricoes, setInscricoes] = useState({});
  const [alocadosOnline, setAlocadosOnline] = useState({});

  const workshopsFiltrados = useMemo(() => {
    let filtrados = workshopsData;
    if (filtroArea !== "todas") {
      filtrados = workshopsData.filter((ws) => ws.areas.includes(filtroArea));
    }
    return filtrados.map((ws) => {
      const { diaDaSemana, inicio, fim, horaLimpa } = processarDataHora(
        ws.dataHora,
      );
      return { ...ws, dia: diaDaSemana, inicio, fim, horaLimpa };
    });
  }, [filtroArea]);

  const handleToggleInscricao = (id) => {
    setInscricoes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const presenciais = workshopsFiltrados.filter(
    (ws) => ws.tipo === "Presencial" && ws.dia,
  );
  const onlinesPuros = workshopsFiltrados.filter((ws) => ws.tipo === "Online");

  const onlinesDisponiveis = onlinesPuros.filter(
    (ws) => !alocadosOnline[ws.id],
  );
  const onlinesAlocados = onlinesPuros
    .filter((ws) => alocadosOnline[ws.id])
    .map((ws) => ({
      ...ws,
      dia: alocadosOnline[ws.id].dia,
      inicio: alocadosOnline[ws.id].inicio,
      fim: alocadosOnline[ws.id].fim,
    }));

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("wsId", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dia, horaSlot) => {
    e.preventDefault();
    const wsId = e.dataTransfer.getData("wsId");
    if (wsId) {
      const fim = calcularFimOnline(horaSlot);
      setAlocadosOnline((prev) => ({
        ...prev,
        [wsId]: { dia, inicio: horaSlot, fim },
      }));
    }
  };

  const removerAlocacao = (e, id) => {
    e.stopPropagation();
    setAlocadosOnline((prev) => {
      const novo = { ...prev };
      delete novo[id];
      return novo;
    });
  };

  const renderWorkshopCard = (ws) => {
    const isOnline = ws.tipo === "Online";
    const estaInscrito = inscricoes[ws.id];
    const estiloFaixa = obterEstiloFaixaLado(ws.areas);

    return (
      <div
        key={ws.id}
        draggable={isOnline}
        onDragStart={(e) => isOnline && handleDragStart(e, ws.id)}
        className={`flex-1 rounded-md relative group transition-all overflow-hidden border shadow-sm flex flex-col items-center justify-center p-2
          ${
            isOnline
              ? "bg-blue-50 border-blue-200 cursor-grab active:cursor-grabbing"
              : estaInscrito
                ? "bg-yellow-50/90 border-yellow-300"
                : "bg-white hover:bg-gray-50 border-gray-200"
          }
        `}
      >
        <div
          style={estiloFaixa}
          className="absolute left-0 top-0 bottom-0 w-[4px]"
        />

        {isOnline && (
          <button
            onClick={(e) => removerAlocacao(e, ws.id)}
            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20"
          >
            ×
          </button>
        )}

        {!isOnline && !estaInscrito && (
          <div
            className="absolute inset-0 bg-[#0a1945]/95 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded"
            onClick={() => handleToggleInscricao(ws.id)}
          >
            <svg
              className="w-6 h-6 text-yellow-500 mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
            </svg>
            <span className="text-white font-bold text-[10px] uppercase text-center leading-tight">
              Inscrever-se
            </span>
          </div>
        )}

        {isOnline && (
          <span className="font-bold text-blue-900 text-[9px] uppercase mb-0.5 tracking-wider">
            💻 Online
          </span>
        )}
        <span
          className={`font-extrabold text-[11px] leading-tight mb-1 text-center line-clamp-3 ${isOnline ? "text-blue-950" : "text-[#0a1945]"}`}
        >
          {ws.titulo}
        </span>
        {!isOnline && (
          <span className="text-gray-400 text-[9px] text-center line-clamp-2">
            {ws.local}
          </span>
        )}

        {!isOnline && estaInscrito && (
          <button
            onClick={() => handleToggleInscricao(ws.id)}
            className="mt-1.5 text-[8px] bg-red-100 text-red-600 px-1.5 py-1 rounded font-bold hover:bg-red-200 z-20 relative uppercase tracking-wider"
          >
            Cancelar
          </button>
        )}
      </div>
    );
  };

  const renderEventosDoDia = (dia) => {
    const eventosNoDia = [...presenciais, ...onlinesAlocados].filter(
      (ws) => ws.dia === dia,
    );
    const grouped = {};

    eventosNoDia.forEach((ws) => {
      const key = `${ws.inicio}-${ws.fim}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ws);
    });

    return Object.entries(grouped).map(([key, eventos]) => {
      const [inicio, fim] = key.split("-");
      const style = getEventStyle(inicio, fim);

      return (
        <div
          key={key}
          className="absolute w-full flex flex-row gap-1 p-1 z-10 transition-all"
          style={style}
        >
          {eventos.map((ws) => renderWorkshopCard(ws))}
        </div>
      );
    });
  };

  const totalGridHeight = SLOTS.length * SLOT_HEIGHT;

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col font-sans">
      <PrivateHeader />

      <main className="flex-grow flex flex-col xl:flex-row max-w-[1800px] mx-auto w-full px-4 py-12 gap-6 items-start">
        <aside className="w-full xl:w-64 bg-white rounded-2xl shadow-xl p-6 h-fit shrink-0 border border-gray-100 xl:my-auto">
          <h2 className="text-[#0a1945] font-extrabold text-lg mb-6 border-b pb-2">
            Filtrar por Área
          </h2>
          <div className="flex flex-col gap-2">
            {AREAS.map((area) => (
              <button
                key={area.id}
                onClick={() => setFiltroArea(area.id)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  filtroArea === area.id
                    ? "bg-[#0a1945] text-yellow-400 shadow-md"
                    : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-[#0a1945]"
                }`}
              >
                {area.nome}
              </button>
            ))}
          </div>
        </aside>

        <section className="w-full xl:flex-grow bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="overflow-x-auto custom-scrollbar">
            <div className="min-w-[700px] flex flex-col">
              <div className="flex flex-row bg-[#0a1945] text-white font-bold text-xs text-center z-20">
                <div className="w-[80px] p-3 border-r border-white/10 shrink-0">
                  HORÁRIO
                </div>
                {DIAS_SEMANA.map((dia) => (
                  <div
                    key={dia}
                    className="flex-1 p-3 border-r border-white/10 last:border-0"
                  >
                    {dia}
                  </div>
                ))}
              </div>

              <div
                className="flex flex-row relative"
                style={{ height: `${totalGridHeight}px` }}
              >
                <div className="w-[80px] shrink-0 border-r border-gray-200 bg-gray-50 flex flex-col relative z-20">
                  {SLOTS.map((slot, idx) => (
                    <div
                      key={slot}
                      className="absolute w-full text-center text-[10px] font-bold text-gray-400 border-b border-gray-200"
                      style={{ top: idx * SLOT_HEIGHT, height: SLOT_HEIGHT }}
                    >
                      <span className="relative top-[-8px] bg-gray-50 px-1">
                        {slot}
                      </span>
                    </div>
                  ))}
                </div>

                {DIAS_SEMANA.map((dia) => (
                  <div
                    key={dia}
                    className="flex-1 relative border-r border-gray-200 last:border-0"
                  >
                    {SLOTS.map((slot, idx) => (
                      <div
                        key={`drop-${dia}-${slot}`}
                        className="absolute w-full border-b border-gray-100 hover:bg-blue-50/30 transition-colors"
                        style={{ top: idx * SLOT_HEIGHT, height: SLOT_HEIGHT }}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, dia, slot)}
                      />
                    ))}
                    {renderEventosDoDia(dia)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="w-full xl:w-80 flex flex-col bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden shrink-0 h-[650px]">
          <div className="bg-[#0a1945] text-yellow-400 font-black tracking-widest flex flex-col items-center justify-center w-full p-4 border-b-4 border-yellow-500 shrink-0">
            <span>WORKSHOPS ONLINE</span>
            <span className="text-[10px] text-gray-300 font-normal mt-1 tracking-normal uppercase">
              Arraste para planejar na grade
            </span>
          </div>

          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3 custom-scrollbar bg-gray-50/50">
            {onlinesDisponiveis.length > 0 ? (
              onlinesDisponiveis.map((ws) => {
                const estiloFaixa = obterEstiloFaixaLado(ws.areas);
                return (
                  <div
                    key={ws.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, ws.id)}
                    className="bg-white border border-gray-200 hover:border-blue-400 hover:shadow-md rounded-lg p-4 flex flex-col gap-3 transition-all cursor-grab active:cursor-grabbing relative overflow-hidden"
                  >
                    <div
                      style={estiloFaixa}
                      className="absolute left-0 top-0 bottom-0 w-[4px]"
                    />

                    <div className="pl-2">
                      <h4 className="font-extrabold text-[#0a1945] leading-tight mb-1">
                        {ws.titulo}
                      </h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold">
                        {ws.areas.join(", ")}
                      </p>
                    </div>
                    <div className="text-blue-500 text-xs font-bold flex items-center justify-center gap-2 mt-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                        ></path>
                      </svg>
                      Arraste para a grade
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 opacity-50">
                <svg
                  className="w-12 h-12 text-green-500 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p className="text-[#0a1945] font-bold text-sm">
                  Tudo planejado!
                </p>
                <p className="text-gray-500 text-xs">
                  Você já alocou todos os workshops online filtrados.
                </p>
              </div>
            )}
          </div>
        </aside>
      </main>

      <div className="w-full bg-[#0a1945] mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Calendario;
