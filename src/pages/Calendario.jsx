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

  const onlines = workshopsFiltrados.filter(ws => ws.tipo === "Online");
  const presenciais = workshopsFiltrados.filter(ws => ws.tipo === "Presencial" && ws.dia); 

  const renderWorkshopBlock = (dia, horario) => {
    const workshop = presenciais.find(ws => ws.dia === dia && ws.hora === horario);
    
    if (!workshop) return <div className="p-2 h-full border-r border-b border-gray-200" />;

    const estaInscrito = inscricoes[workshop.id];

    return (
      <div className={`p-2 h-full border-r border-b border-gray-200 relative group overflow-hidden transition-all ${estaInscrito ? "bg-yellow-50/50 border-l-4 border-l-yellow-500" : "bg-white hover:bg-gray-50"}`}>
        
        {!estaInscrito && (
          <div className="absolute inset-0 bg-[#0a1945]/90 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => handleToggleInscricao(workshop.id)}>
            <svg className="w-8 h-8 text-yellow-500 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
            <span className="text-white font-bold text-xs uppercase text-center leading-tight">Clique para<br/>Inscrever-se</span>
          </div>
        )}

        <div className="flex flex-col h-full text-center items-center justify-center">
          <span className="font-bold text-[#0a1945] text-sm leading-tight mb-1">{workshop.titulo}</span>
          <span className="text-gray-500 text-xs">{workshop.local}</span>
          
          {estaInscrito && (
             <button onClick={() => handleToggleInscricao(workshop.id)} className="mt-2 text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded font-bold hover:bg-red-200 z-20 relative transition-colors">
               Cancelar Inscrição
             </button>
          )}
        </div>
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
                  <div key={horario} className={`grid grid-cols-[90px_1fr_1fr_1fr_1fr_1fr] min-h-[100px] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-center p-2 border-r border-b border-gray-200 text-xs font-medium text-gray-500">
                      {horario}
                    </div>
                    
                    {DIAS_SEMANA.map(dia => (
                      <div key={`${dia}-${horario}`}>
                         {renderWorkshopBlock(dia, horario)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="w-full xl:w-80 flex flex-col bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden shrink-0 h-[650px]">
           <div className="bg-[#0a1945] text-yellow-400 font-black tracking-widest flex items-center justify-center w-full p-4 border-b-4 border-yellow-500 shrink-0">
              WORKSHOPS ONLINE
           </div>
           
           <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3 custom-scrollbar">
              {onlines.length > 0 ? (
                onlines.map((ws) => (
                  <div key={ws.id} className="bg-gray-50 border border-gray-200 hover:border-[#0a1945] rounded-lg p-4 flex flex-col gap-3 transition-colors">
                    <div>
                      <h4 className="font-extrabold text-[#0a1945] leading-tight mb-1">{ws.titulo}</h4>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{ws.areas.join(", ")}</p>
                    </div>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-[#0a1945] text-sm font-bold py-2 px-4 rounded transition-colors w-full flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      Assistir Agora
                    </button>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                   <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                   <p className="text-gray-400 italic text-sm">Nenhum workshop online filtrado para esta área.</p>
                </div>
              )}
           </div>
        </aside>

      </main>
      
      <Footer />
    </div>
  );
}

export default Calendario;
