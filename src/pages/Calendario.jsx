import { useState, useEffect } from "react";
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

const DIAS_SEMANA = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA"];
const HORARIOS = ["07:00 09:00", "09:00 11:00", "11:00 13:00", "13:00 15:00", "15:00 17:00", "17:00 19:00"];

const MAPA_HORARIOS_MOCK = {
  "eletronica-1-componentes": { dia: "SEGUNDA", hora: "07:00 09:00" },
  "solidworks-pratica": { dia: "SEGUNDA", hora: "11:00 13:00" },
  "competicoes-robotica": { dia: "TERÇA", hora: "09:00 11:00" },
  "fabricacao-usinagem": { dia: "QUARTA", hora: "07:00 09:00" },
  "resolucao-problemas-eletronicos": { dia: "QUARTA", hora: "11:00 13:00" },
  "materiais-2-identificacao": { dia: "QUINTA", hora: "07:00 09:00" },
  "easyeda-pratica": { dia: "QUINTA", hora: "11:00 13:00" },
  "eletronica-2-sistemas": { dia: "SEXTA", hora: "07:00 09:00" },
  "microcontroladores-2-pratica": { dia: "SEXTA", hora: "13:00 15:00" },
};

function Calendario() {
  const [filtroArea, setFiltroArea] = useState("todas");
  const [workshopsFiltrados, setWorkshopsFiltrados] = useState([]);
  const [inscricoes, setInscricoes] = useState({});
  const [alocadosOnline, setAlocadosOnline] = useState({});

  useEffect(() => {
    let filtrados = workshopsData;
    if (filtroArea !== "todas") {
      filtrados = workshopsData.filter((ws) => ws.areas.includes(filtroArea));
    }
    
    const dadosComHorario = filtrados.map(ws => {
      const mock = MAPA_HORARIOS_MOCK[ws.id];
      if (mock) {
        return { ...ws, ...mock };
      }
      return ws;
    });

    setWorkshopsFiltrados(dadosComHorario);
  }, [filtroArea]);

  const handleToggleInscricao = (id) => {
    setInscricoes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const presenciais = workshopsFiltrados.filter(ws => ws.tipo === "Presencial" && ws.dia); 
  const todosOnlines = workshopsFiltrados.filter(ws => ws.tipo === "Online");

  const onlinesDisponiveis = todosOnlines.filter(ws => !alocadosOnline[ws.id]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("wsId", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dia, hora) => {
    e.preventDefault();
    const wsId = e.dataTransfer.getData("wsId");
    if (wsId) {
      setAlocadosOnline(prev => ({ ...prev, [wsId]: { dia, hora } }));
    }
  };

  const removerAlocacao = (e, id) => {
    e.stopPropagation();
    setAlocadosOnline(prev => {
      const novo = { ...prev };
      delete novo[id];
      return novo;
    });
  };

  const renderCellContent = (dia, horario) => {
    const presencial = presenciais.find(ws => ws.dia === dia && ws.hora === horario);
    
    const onlinesAqui = todosOnlines.filter(ws => alocadosOnline[ws.id]?.dia === dia && alocadosOnline[ws.id]?.hora === horario);

    return (
      <div 
        className="h-full w-full flex flex-col gap-2 relative z-0"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, dia, horario)}
      >
        {presencial && (() => {
          const estaInscrito = inscricoes[presencial.id];
          return (
            <div className={`p-2 rounded border-l-4 relative group transition-all ${estaInscrito ? "bg-yellow-50/80 border-l-yellow-500" : "bg-white border-l-gray-300 hover:bg-gray-50 border border-gray-100 shadow-sm"}`}>
              {!estaInscrito && (
                <div className="absolute inset-0 bg-[#0a1945]/90 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded" onClick={() => handleToggleInscricao(presencial.id)}>
                  <svg className="w-6 h-6 text-yellow-500 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                  <span className="text-white font-bold text-[10px] uppercase text-center leading-tight">Inscrever-se</span>
                </div>
              )}
              <div className="flex flex-col text-center items-center justify-center">
                <span className="font-extrabold text-[#0a1945] text-xs leading-tight mb-1">{presencial.titulo}</span>
                <span className="text-gray-400 text-[10px]">{presencial.local}</span>
                {estaInscrito && (
                  <button onClick={() => handleToggleInscricao(presencial.id)} className="mt-1 text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold hover:bg-red-200 z-20 relative">
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          );
        })()}

        {onlinesAqui.map(ws => (
          <div 
            key={ws.id} 
            draggable
            onDragStart={(e) => handleDragStart(e, ws.id)}
            className="p-2 rounded bg-blue-50 border border-blue-200 border-l-4 border-l-blue-500 relative shadow-sm cursor-grab active:cursor-grabbing group"
          >
            <button 
              onClick={(e) => removerAlocacao(e, ws.id)}
              className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20"
              title="Remover do calendário"
            >
              ×
            </button>
            <div className="flex flex-col text-center items-center justify-center">
              <span className="font-bold text-blue-900 text-[10px] uppercase mb-0.5">💻 Online</span>
              <span className="font-extrabold text-[#0a1945] text-xs leading-tight">{ws.titulo}</span>
            </div>
          </div>
        ))}

        {!presencial && onlinesAqui.length === 0 && (
           <div className="w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-gray-300 text-[10px] font-bold uppercase border-2 border-dashed border-gray-200 rounded p-1">Soltar Aqui</span>
           </div>
        )}
      </div>
    );
  };

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

        <section className="w-full xl:flex-grow bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              
              <div className="grid grid-cols-[90px_1fr_1fr_1fr_1fr_1fr] bg-[#0a1945] text-white text-xs font-bold text-center">
                <div className="p-3 border-r border-white/10">HORÁRIO</div>
                {DIAS_SEMANA.map(dia => (
                  <div key={dia} className="p-3 border-r border-white/10 last:border-0">{dia}</div>
                ))}
              </div>

              <div className="flex flex-col bg-white">
                {HORARIOS.map((horario, index) => (
                  <div key={horario} className={`grid grid-cols-[90px_1fr_1fr_1fr_1fr_1fr] min-h-[120px] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-center p-2 border-r border-b border-gray-200 text-xs font-medium text-gray-500">
                      {horario}
                    </div>
                    
                    {DIAS_SEMANA.map(dia => (
                      <div key={`${dia}-${horario}`} className="p-1 border-r border-b border-gray-200">
                         {renderCellContent(dia, horario)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="w-full xl:w-80 flex flex-col bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden shrink-0 h-[650px]">
           <div className="bg-[#0a1945] text-yellow-400 font-black tracking-widest flex flex-col items-center justify-center w-full p-4 border-b-4 border-yellow-500 shrink-0">
              <span>WORKSHOPS ONLINE</span>
              <span className="text-[10px] text-gray-300 font-normal mt-1 tracking-normal uppercase">Arraste para planejar na grade</span>
           </div>
           
           <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3 custom-scrollbar bg-gray-50/50">
              {onlinesDisponiveis.length > 0 ? (
                onlinesDisponiveis.map((ws) => (
                  <div 
                    key={ws.id} 
                    draggable
                    onDragStart={(e) => handleDragStart(e, ws.id)}
                    className="bg-white border-2 border-dashed border-gray-300 hover:border-blue-400 hover:shadow-md rounded-lg p-4 flex flex-col gap-3 transition-all cursor-grab active:cursor-grabbing"
                  >
                    <div>
                      <h4 className="font-extrabold text-[#0a1945] leading-tight mb-1">{ws.titulo}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold">{ws.areas.join(", ")}</p>
                    </div>
                    <div className="text-blue-500 text-xs font-bold flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path></svg>
                      Arraste-me
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 opacity-50">
                   <svg className="w-12 h-12 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   <p className="text-[#0a1945] font-bold text-sm">Tudo planejado!</p>
                   <p className="text-gray-500 text-xs">Você já alocou todos os workshops online filtrados.</p>
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
