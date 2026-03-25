import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

const AREAS = [
  { id: "todas", nome: "Todas as Áreas" },
  { id: "mecanica", nome: "Mecânica" },
  { id: "eletronica", nome: "Eletrônica" },
  { id: "autonomos", nome: "Autônomos" },aimport { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

const AREAS = [
  { id: "todas", nome: "Todas as Áreas" },
  { id: "mecanica", nome: "Mecânica" },
  { id: "eletronica", nome: "Eletrônica" },
  { id: "autonomos", nome: "Autônomos" },
  { id: "comunicacao", nome: "Comunicação" },
  { id: "gestao", nome: "Gestão" },
];

const generateSlots = () => {
  const slots = [];
  for (let h = 13; h <= 21; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
    slots.push(`${h.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

const SLOTS = generateSlots();
const SLOT_HEIGHT = 45; // Aumentei um pouco para dar respiro

const CORES_AREAS = {
  mecanica: "#f16c21",
  autonomos: "#0aa14c",
  eletronica: "#f1aa1b",
  gestao: "#026be1",
  comunicacao: "#6f29e1",
};

const calcularLuminancia = (hex) => {
  const c = hex.substring(1).split("").map(c => parseInt(c + c, 16));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

const obterEstiloFaixaLado = (areas) => {
  if (!areas || areas.length === 0) return { background: "#e5e7eb" };
  const coresValidas = areas
    .filter((areaId) => CORES_AREAS[areaId])
    .map((areaId) => ({ hex: CORES_AREAS[areaId], lumi: calcularLuminancia(CORES_AREAS[areaId]) }));
  if (coresValidas.length === 1) return { background: coresValidas[0].hex };
  if (coresValidas.length > 1) {
    coresValidas.sort((a, b) => a.lumi - b.lumi);
    return { backgroundImage: `linear-gradient(to bottom, ${coresValidas.map((c) => c.hex).join(", ")})` };
  }
  return { background: "#e5e7eb" };
};

const parseTime = (timeStr) => {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

const getEventStyle = (inicio, fim) => {
  const baseMinutes = parseTime("13:00");
  const startMin = parseTime(inicio);
  const endMin = parseTime(fim);
  const top = ((startMin - baseMinutes) / 30) * SLOT_HEIGHT;
  let height = ((endMin - startMin) / 30) * SLOT_HEIGHT;
  
  // LOGICA PARA MATERIAIS 2 E CARDS CURTOS:
  // Se o workshop durar menos de 1 hora, forçamos uma altura mínima 
  // para ele ocupar os "retângulos" necessários e caber o texto.
  const minHeight = SLOT_HEIGHT * 2; 
  return { top: `${top}px`, height: `${Math.max(height, minHeight)}px` };
};

const processarDataHora = (dataHoraStr) => {
  if (!dataHoraStr) return { diaData: null, diaNome: null, inicio: null, fim: null };
  const partes = dataHoraStr.split(",").map((p) => p.trim());
  if (partes.length < 3) return { diaData: null, diaNome: null, inicio: null, fim: null };
  const [inicio, fim] = partes[2].replace(/\s/g, "").split("-");
  return { diaData: partes[0], diaNome: partes[1], inicio, fim };
};

const getWeeks = (data) => {
  return [[{ diaNome: "SEG", dataStr: "06/04" }, { diaNome: "TER", dataStr: "07/04" }, { diaNome: "QUA", dataStr: "08/04" }, { diaNome: "QUI", dataStr: "09/04" }, { diaNome: "SEX", dataStr: "10/04" }]];
};

function Calendario() {
  const [filtroArea, setFiltroArea] = useState("todas");
  const [inscricoes, setInscricoes] = useState({});
  const [alocadosOnline, setAlocadosOnline] = useState({});
  const [semanaAtual, setSemanaAtual] = useState(0);
  const [workshopsData, setWorkshopsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/workshops`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setWorkshopsData(data); })
      .catch((err) => console.error(err));
  }, []);

  const workshopsProcessados = useMemo(() => {
    return workshopsData.map((ws) => ({ ...ws, ...processarDataHora(ws.dataHora) }));
  }, [workshopsData]);

  const weeks = useMemo(() => getWeeks(workshopsData), [workshopsData]);
  const diasDaSemana = weeks[semanaAtual] || [];

  const workshopsFiltrados = useMemo(() => {
    if (filtroArea === "todas") return workshopsProcessados;
    return workshopsProcessados.filter(ws => ws.areas?.includes(filtroArea));
  }, [filtroArea, workshopsProcessados]);

  const presenciais = workshopsFiltrados.filter(ws => ws.tipo === "Presencial" && ws.diaData);
  const onlinesDisponiveis = workshopsFiltrados.filter(ws => ws.tipo === "Online" && !alocadosOnline[ws.id]);
  const onlinesAlocados = workshopsFiltrados.filter(ws => alocadosOnline[ws.id]).map(ws => ({ ...ws, ...alocadosOnline[ws.id] }));

  const handleDragStart = (e, id) => e.dataTransfer.setData("wsId", id);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, diaData, horaSlot) => {
    e.preventDefault();
    const wsId = e.dataTransfer.getData("wsId");
    if (wsId) {
      const mins = parseTime(horaSlot) + 90;
      const fim = `${Math.floor(mins / 60)}:${(mins % 60).toString().padStart(2, "0")}`;
      setAlocadosOnline(prev => ({ ...prev, [wsId]: { diaData, inicio: horaSlot, fim } }));
    }
  };

  const renderWorkshopCard = (ws, isMini = false) => {
    const estaInscrito = inscricoes[ws.id];
    const estiloFaixa = obterEstiloFaixaLado(ws.areas);
    return (
      <div key={ws.id} draggable={ws.tipo === "Online"} onDragStart={(e) => handleDragStart(e, ws.id)}
        className={`flex-1 rounded-xl relative group transition-all overflow-hidden border shadow-sm flex flex-col p-4 min-w-0
          ${ws.tipo === "Online" ? "bg-blue-50/50 border-blue-200 cursor-grab" : estaInscrito ? "bg-yellow-50 border-yellow-300" : "bg-white border-gray-100 hover:shadow-md"}`}>
        <div style={estiloFaixa} className="absolute left-0 top-0 bottom-0 w-[5px]" />
        
        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">
          {ws.tipo === "Online" ? "💻 Online" : "📍 " + (ws.local || "Presencial")}
        </span>
        
        <h4 className="font-bold text-[#0a1945] text-sm leading-tight mb-2 line-clamp-2 uppercase">
          {ws.titulo}
        </h4>

        {!estaInscrito && ws.tipo === "Presencial" && (
          <button onClick={() => setInscricoes(p => ({...p, [ws.id]: true}))} className="mt-auto text-[10px] bg-[#0a1945] text-white py-1.5 rounded-lg font-bold opacity-0 group-hover:opacity-100 transition-all">
            INSCREVER-SE
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-[#0a1945]">
      <PrivateHeader />
      <main className="flex-grow flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full px-4 py-8 gap-8">
        
        {/* FILTROS LATERAIS */}
        <aside className="w-full lg:w-60 shrink-0">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Filtros</h2>
            <div className="flex flex-col gap-2">
              {AREAS.map(a => (
                <button key={a.id} onClick={() => setFiltroArea(a.id)} 
                  className={`text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${filtroArea === a.id ? "bg-[#0a1945] text-yellow-400 shadow-lg shadow-blue-900/20" : "hover:bg-gray-50 text-gray-500"}`}>
                  {a.nome}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CALENDARIO CENTRAL */}
        <section className="flex-grow bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center bg-[#0a1945] p-6 text-white">
            <button className="text-xs font-black uppercase tracking-widest opacity-50">← Anterior</button>
            <h3 className="font-black text-yellow-400 uppercase tracking-[0.2em]">Semana 02</h3>
            <button className="text-xs font-black uppercase tracking-widest opacity-50">Próxima →</button>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* HEADER DIAS */}
              <div className="flex bg-[#0a1945] border-t border-white/10">
                <div className="w-24 shrink-0" />
                {diasDaSemana.map(dia => (
                  <div key={dia.dataStr} className="flex-1 py-4 text-center border-l border-white/5">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{dia.diaNome}</p>
                    <p className="text-white font-bold">{dia.dataStr}</p>
                  </div>
                ))}
              </div>

              {/* GRADE HORARIOS */}
              <div className="flex relative" style={{ height: `${SLOTS.length * SLOT_HEIGHT}px` }}>
                <div className="w-24 shrink-0 bg-gray-50/50 border-r border-gray-100">
                  {SLOTS.map(s => (
                    <div key={s} className="flex items-center justify-center border-b border-gray-100 text-[10px] font-bold text-gray-300" style={{ height: SLOT_HEIGHT }}>{s}</div>
                  ))}
                </div>
                {diasDaSemana.map(dia => (
                  <div key={dia.dataStr} className="flex-1 relative border-r border-gray-50" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, dia.dataStr, "13:00")}>
                    {SLOTS.map((_, i) => <div key={i} className="border-b border-gray-50/50" style={{ height: SLOT_HEIGHT }} />)}
                    {/* EVENTOS */}
                    {[...presenciais, ...onlinesAlocados].filter(ws => ws.diaData === dia.dataStr).map(ws => (
                      <div key={ws.id} className="absolute w-full p-1 z-10 flex" style={getEventStyle(ws.inicio, ws.fim)}>
                        {renderWorkshopCard(ws)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WORKSHOPS ONLINE (Lado Direito) */}
        <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          <div className="bg-[#0a1945] rounded-[32px] p-6 shadow-xl border border-blue-900 flex flex-col h-[650px]">
            <div className="mb-6">
              <h2 className="text-yellow-400 font-black text-xl uppercase tracking-tighter">Workshops Online</h2>
              <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mt-1">Arraste para a grade para planejar</p>
            </div>
            
            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
              {onlinesDisponiveis.map(ws => (
                <div key={ws.id} draggable onDragStart={(e) => handleDragStart(e, ws.id)}
                  className="bg-white/5 border border-white/10 p-5 rounded-2xl cursor-grab active:cursor-grabbing hover:bg-white/10 transition-all group relative overflow-hidden">
                  <div style={obterEstiloFaixaLado(ws.areas)} className="absolute left-0 top-0 bottom-0 w-[4px] opacity-70" />
                  <h4 className="text-white font-bold text-sm leading-tight mb-2 uppercase">{ws.titulo}</h4>
                  <div className="flex flex-wrap gap-1">
                    {ws.areas?.map(a => <span key={a} className="text-[8px] font-black bg-white/10 text-blue-200 px-2 py-0.5 rounded-md uppercase">{a}</span>)}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-blue-400">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>
                    <span className="text-[9px] font-black uppercase tracking-widest">Segure e arraste</span>
                  </div>
                </div>
              ))}
              {onlinesDisponiveis.length === 0 && (
                <div className="text-center py-10 opacity-30">
                  <p className="text-white font-bold text-xs">Todos os workshops foram alocados!</p>
                </div>
              )}
            </div>
          </div>
        </aside>

      </main>
      <Footer />
    </div>
  );
}

export default Calendario;
  { id: "comunicacao", nome: "Comunicação" },
  { id: "gestao", nome: "Gestão" },
];

const generateSlots = () => {
  const slots = [];
  for (let h = 13; h <= 21; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
    slots.push(`${h.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

const SLOTS = generateSlots();
const SLOT_HEIGHT = 30;

const CORES_AREAS = {
  mecanica: "#f16c21",
  autonomos: "#0aa14c",
  eletronica: "#f1aa1b",
  gestao: "#026be1",
  comunicacao: "#6f29e1",
};

const calcularLuminancia = (hex) => {
  const c = hex.substring(1).split("").map(c => parseInt(c + c, 16));
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
  if (coresValidas.length === 1) return { background: coresValidas[0].hex };
  if (coresValidas.length > 1) {
    coresValidas.sort((a, b) => a.lumi - b.lumi);
    return { backgroundImage: `linear-gradient(to bottom, ${coresValidas.map((c) => c.hex).join(", ")})` };
  }
  return { background: "#e5e7eb" };
};

const parseTime = (timeStr) => {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

const getEventStyle = (inicio, fim) => {
  const baseMinutes = parseTime("13:00");
  const startMin = parseTime(inicio);
  const endMin = parseTime(fim);
  const top = ((startMin - baseMinutes) / 30) * SLOT_HEIGHT;
  let height = ((endMin - startMin) / 30) * SLOT_HEIGHT;
  if (height <= 0) height = SLOT_HEIGHT; 
  
  return { top: `${top}px`, height: `${height}px` };
};

const calcularFimOnline = (inicio) => {
  const mins = parseTime(inicio) + 90;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
};

const processarDataHora = (dataHoraStr) => {
  if (!dataHoraStr) return { diaData: null, diaNome: null, inicio: null, fim: null, horaLimpa: null };
  const partes = dataHoraStr.split(",").map((p) => p.trim());
  if (partes.length < 3) return { diaData: null, diaNome: null, inicio: null, fim: null, horaLimpa: null };
  const diaData = partes[0];
  const diaNome = partes[1];
  const horaLimpa = partes[2].replace(/\s/g, "");
  const [inicio, fim] = horaLimpa.split("-");
  return { diaData, diaNome, horaLimpa, inicio, fim };
};

const getWeeks = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [[{ diaNome: "SEG", dataStr: "06/04" }, { diaNome: "TER", dataStr: "07/04" }, { diaNome: "QUA", dataStr: "08/04" }, { diaNome: "QUI", dataStr: "09/04" }, { diaNome: "SEX", dataStr: "10/04" }]];
  }
  const dateStrs = data.map((ws) => processarDataHora(ws.dataHora).diaData).filter(Boolean);
  const uniqueDates = [...new Set(dateStrs)];
  const dates = uniqueDates.map((dStr) => {
    const [d, m] = dStr.split("/");
    return new Date(2026, parseInt(m) - 1, parseInt(d));
  }).sort((a, b) => a - b);
  
  const minDate = dates[0] || new Date(2026, 3, 6);
  const maxDate = dates[dates.length - 1] || new Date(2026, 3, 10);
  const startMonday = new Date(minDate);
  const dayOfWeek = startMonday.getDay();
  const diff = startMonday.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  startMonday.setDate(diff);

  const weeks = [];
  let currentMonday = new Date(startMonday);
  while (currentMonday <= maxDate || weeks.length === 0) {
    const weekDays = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(currentMonday);
      d.setDate(d.getDate() + i);
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const diaNome = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"][d.getDay()];
      weekDays.push({ dataStr: `${dd}/${mm}`, diaNome });
    }
    weeks.push(weekDays);
    currentMonday.setDate(currentMonday.getDate() + 7);
  }
  return weeks;
};

function Calendario() {
  const [filtroArea, setFiltroArea] = useState("todas");
  const [inscricoes, setInscricoes] = useState({});
  const [alocadosOnline, setAlocadosOnline] = useState({});
  const [semanaAtual, setSemanaAtual] = useState(0);
  const [workshopsData, setWorkshopsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/workshops`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setWorkshopsData(data);
        else setWorkshopsData([]);
      })
      .catch((err) => {
        console.error("Erro ao buscar workshops:", err);
        setWorkshopsData([]);
      });
  }, []);

  const workshopsProcessados = useMemo(() => {
    if (!Array.isArray(workshopsData)) return [];
    return workshopsData.map((ws) => {
      const info = processarDataHora(ws.dataHora);
      return { ...ws, ...info };
    });
  }, [workshopsData]);

  const weeks = useMemo(() => getWeeks(workshopsData), [workshopsData]);
  const diasDaSemana = weeks[semanaAtual] || [];

  const workshopsFiltrados = useMemo(() => {
    if (filtroArea === "todas") return workshopsProcessados;
    return workshopsProcessados.filter(ws => Array.isArray(ws.areas) && ws.areas.includes(filtroArea));
  }, [filtroArea, workshopsProcessados]);

  const handleToggleInscricao = (id) => setInscricoes((prev) => ({ ...prev, [id]: !prev[id] }));

  const presenciais = workshopsFiltrados.filter((ws) => ws.tipo === "Presencial" && ws.diaData);
  const onlinesPuros = workshopsFiltrados.filter((ws) => ws.tipo === "Online");
  const onlinesDisponiveis = onlinesPuros.filter((ws) => !alocadosOnline[ws.id]);
  const onlinesAlocados = onlinesPuros.filter((ws) => alocadosOnline[ws.id]).map((ws) => ({
    ...ws, ...alocadosOnline[ws.id]
  }));

  const handleDragStart = (e, id) => { e.dataTransfer.setData("wsId", id); };
  const handleDragOver = (e) => { e.preventDefault(); };
  const handleDrop = (e, diaData, horaSlot) => {
    e.preventDefault();
    const wsId = e.dataTransfer.getData("wsId");
    if (wsId) {
      const fim = calcularFimOnline(horaSlot);
      setAlocadosOnline((prev) => ({ ...prev, [wsId]: { diaData, inicio: horaSlot, fim } }));
    }
  };

  const renderWorkshopCard = (ws) => {
    const isOnline = ws.tipo === "Online";
    const estaInscrito = inscricoes[ws.id];
    const estiloFaixa = obterEstiloFaixaLado(ws.areas);
    return (
      <div key={ws.id} draggable={isOnline} onDragStart={(e) => isOnline && handleDragStart(e, ws.id)}
        className={`flex-1 rounded-md relative group transition-all overflow-hidden border shadow-sm flex flex-col items-center justify-center p-2
          ${isOnline ? "bg-blue-50 border-blue-200 cursor-grab" : estaInscrito ? "bg-yellow-50/90 border-yellow-300" : "bg-white hover:bg-gray-50 border-gray-200"}`}>
        <div style={estiloFaixa} className="absolute left-0 top-0 bottom-0 w-[4px]" />
        <span className={`font-extrabold text-[10px] leading-tight text-center line-clamp-2 ${isOnline ? "text-blue-950" : "text-[#0a1945]"}`}>{ws.titulo}</span>
        {!isOnline && !estaInscrito && (
          <div className="absolute inset-0 bg-[#0a1945]/95 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => handleToggleInscricao(ws.id)}>
            <span className="text-white font-bold text-[9px] uppercase">Inscrever</span>
          </div>
        )}
      </div>
    );
  };

  const renderEventosDoDia = (diaData) => {
    const eventosNoDia = [...presenciais, ...onlinesAlocados].filter((ws) => ws.diaData === diaData);
    const grouped = {};
    eventosNoDia.forEach((ws) => {
      const key = `${ws.inicio}-${ws.fim}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ws);
    });
    return Object.entries(grouped).map(([key, eventos]) => {
      const [inicio, fim] = key.split("-");
      return (
        <div key={key} className="absolute w-full flex flex-row gap-1 p-0.5 z-10" style={getEventStyle(inicio, fim)}>
          {eventos.map((ws) => renderWorkshopCard(ws))}
        </div>
      );
    });
  };

  if (workshopsData.length === 0) return <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center"><p className="animate-pulse font-bold text-blue-900">Sincronizando com RioBotz...</p></div>;

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col font-sans">
      <PrivateHeader />
      <main className="flex-grow flex flex-col xl:flex-row max-w-[1600px] mx-auto w-full px-4 py-8 gap-6">
        <aside className="w-full xl:w-64 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-[#0a1945] font-black text-lg mb-4 border-b pb-2 uppercase tracking-tighter">Filtros</h2>
          <div className="flex flex-col gap-1">
            {AREAS.map((area) => (
              <button key={area.id} onClick={() => setFiltroArea(area.id)} className={`text-left px-4 py-2 rounded-lg text-sm font-bold transition-all ${filtroArea === area.id ? "bg-[#0a1945] text-yellow-400" : "text-gray-500 hover:bg-gray-100"}`}>{area.nome}</button>
            ))}
          </div>
        </aside>

        <section className="flex-grow bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center bg-[#0a1945] text-white p-4">
            <button onClick={() => setSemanaAtual(s => Math.max(0, s - 1))} className="text-xs font-bold uppercase hover:text-yellow-400 disabled:opacity-30" disabled={semanaAtual === 0}>← Anterior</button>
            <span className="font-black text-yellow-400 uppercase tracking-widest">Semana {semanaAtual + 1}</span>
            <button onClick={() => setSemanaAtual(s => Math.min(weeks.length - 1, s + 1))} className="text-xs font-bold uppercase hover:text-yellow-400 disabled:opacity-30" disabled={semanaAtual === weeks.length - 1}>Próxima →</button>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="flex bg-[#0a1945] text-white text-[10px] font-bold uppercase text-center border-b border-white/10">
                <div className="w-20 p-3 border-r border-white/10">Hora</div>
                {diasDaSemana.map(dia => <div key={dia.dataStr} className="flex-1 p-3 border-r border-white/10">{dia.diaNome} {dia.dataStr}</div>)}
              </div>
              <div className="flex relative" style={{ height: `${SLOTS.length * SLOT_HEIGHT}px` }}>
                <div className="w-20 bg-gray-50 border-r border-gray-200">
                  {SLOTS.map((slot, idx) => <div key={slot} className="text-[9px] font-bold text-gray-400 text-center border-b border-gray-100" style={{ height: SLOT_HEIGHT }}>{slot}</div>)}
                </div>
                {diasDaSemana.map(dia => (
                  <div key={dia.dataStr} className="flex-1 relative border-r border-gray-100" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, dia.dataStr, "13:00")}>
                    {SLOTS.map((_, idx) => <div key={idx} className="border-b border-gray-50" style={{ height: SLOT_HEIGHT }} />)}
                    {renderEventosDoDia(dia.dataStr)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="w-full xl:w-72 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
          <div className="p-4 bg-[#0a1945] text-yellow-400 font-black text-center border-b-4 border-yellow-500">WORKSHOPS ONLINE</div>
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {onlinesDisponiveis.map(ws => (
              <div key={ws.id} draggable onDragStart={(e) => handleDragStart(e, ws.id)} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm cursor-grab active:cursor-grabbing hover:border-blue-400">
                <p className="font-bold text-[#0a1945] text-xs leading-tight">{ws.titulo}</p>
                <p className="text-[9px] text-blue-500 font-bold mt-1">Arraste para a grade</p>
              </div>
            ))}
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}

export default Calendario;
