import { useState, useEffect, useMemo } from "react";
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
const SLOT_HEIGHT = 45;

const CORES_AREAS = {
  mecanica: "#f16c21",
  autonomos: "#0aa14c",
  eletronica: "#f1aa1b",
  gestao: "#026be1",
  comunicacao: "#6f29e1",
};

const calcularLuminancia = (hex) => {
  if (!hex) return 0;
  const c = hex.substring(1).split("").map(c => parseInt(c + c, 16));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

const obterEstiloFaixaLado = (areas) => {
  if (!Array.isArray(areas) || areas.length === 0) return { background: "#e5e7eb" };
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
  const minHeight = SLOT_HEIGHT * 2; 
  return { top: `${top}px`, height: `${Math.max(height, minHeight)}px` };
};

const processarDataHora = (dataHoraStr) => {
  if (!dataHoraStr || typeof dataHoraStr !== 'string') return { diaData: null, diaNome: null, inicio: null, fim: null };
  const partes = dataHoraStr.split(",").map((p) => p.trim());
  if (partes.length < 3) return { diaData: null, diaNome: null, inicio: null, fim: null };
  const horaPart = partes[2].replace(/\s/g, "");
  const [inicio, fim] = horaPart.includes("-") ? horaPart.split("-") : ["13:00", "14:30"];
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
      .then((data) => { 
        if (Array.isArray(data)) {
          setWorkshopsData(data);
        } else {
          setWorkshopsData([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setWorkshopsData([]);
      });
  }, []);

  const workshopsProcessados = useMemo(() => {
    if (!Array.isArray(workshopsData)) return [];
    return workshopsData.map((ws) => ({ ...ws, ...processarDataHora(ws.dataHora) }));
  }, [workshopsData]);

  const weeks = useMemo(() => getWeeks(workshopsData), [workshopsData]);
  const diasDaSemana = weeks[semanaAtual] || [];

  const workshopsFiltrados = useMemo(() => {
    const lista = Array.isArray(workshopsProcessados) ? workshopsProcessados : [];
    if (filtroArea === "todas") return lista;
    return lista.filter(ws => Array.isArray(ws.areas) && ws.areas.includes(filtroArea));
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

  const renderWorkshopCard = (ws) => {
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

        <section className="flex-grow bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center bg-[#0a1945] p-6 text-white">
            <button className="text-xs font-black uppercase tracking-widest opacity-50" disabled>← Anterior</button>
            <h3 className="font-black text-yellow-400 uppercase tracking-[0.2em]">Semana 02</h3>
            <button className="text-xs font-black uppercase tracking-widest opacity-50" disabled>Próxima →</button>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="flex bg-[#0a1945] border-t border-white/10">
                <div className="w-24 shrink-0" />
                {diasDaSemana.map(dia => (
                  <div key={dia.dataStr} className="flex-1 py-4 text-center border-l border-white/5">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{dia.diaNome}</p>
                    <p className="text-white font-bold">{dia.dataStr}</p>
                  </div>
                ))}
              </div>
              <div className="flex relative" style={{ height: `${SLOTS.length * SLOT_HEIGHT}px` }}>
                <div className="w-24 shrink-0 bg-gray-50/50 border-r border-gray-100">
                  {SLOTS.map(s => (
                    <div key={s} className="flex items-center justify-center border-b border-gray-100 text-[10px] font-bold text-gray-300" style={{ height: SLOT_HEIGHT }}>{s}</div>
                  ))}
                </div>
                {diasDaSemana.map(dia => (
                  <div key={dia.dataStr} className="flex-1 relative border-r border-gray-50" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, dia.dataStr, "13:00")}>
                    {SLOTS.map((_, i) => <div key={i} className="border-b border-gray-50/50" style={{ height: SLOT_HEIGHT }} />)}
                    {Array.isArray(presenciais) && [...presenciais, ...onlinesAlocados].filter(ws => ws.diaData === dia.dataStr).map(ws => (
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

        <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          <div className="bg-[#0a1945] rounded-[32px] p-6 shadow-xl border border-blue-900 flex flex-col h-[650px]">
            <div className="mb-6">
              <h2 className="text-yellow-400 font-black text-xl uppercase tracking-tighter">Workshops Online</h2>
              <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mt-1">Arraste para a grade</p>
            </div>
            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
              {Array.isArray(onlinesDisponiveis) && onlinesDisponiveis.map(ws => (
                <div key={ws.id} draggable onDragStart={(e) => handleDragStart(e, ws.id)}
                  className="bg-white/5 border border-white/10 p-5 rounded-2xl cursor-grab active:cursor-grabbing hover:bg-white/10 transition-all group relative overflow-hidden">
                  <div style={obterEstiloFaixaLado(ws.areas)} className="absolute left-0 top-0 bottom-0 w-[4px] opacity-70" />
                  <h4 className="text-white font-bold text-sm leading-tight mb-2 uppercase">{ws.titulo}</h4>
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(ws.areas) && ws.areas.map(a => <span key={a} className="text-[8px] font-black bg-white/10 text-blue-200 px-2 py-0.5 rounded-md uppercase">{a}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}

export default Calendario;
