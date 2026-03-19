import { useState, useEffect } from "react";
import PrivateNavBar from "../components/PrivateNavBar";
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

function Calendario() {
  const [filtroArea, setFiltroArea] = useState("todas");
  const [workshopsFiltrados, setWorkshopsFiltrados] = useState([]);

  useEffect(() => {
    if (filtroArea === "todas") {
      setWorkshopsFiltrados(workshopsData);
    } else {
      setWorkshopsFiltrados(
        workshopsData.filter((ws) => ws.areas.includes(filtroArea))
      );
    }
  }, [filtroArea]);

  const presenciais = workshopsFiltrados.filter((ws) => ws.tipo === "Presencial");
  const onlines = workshopsFiltrados.filter((ws) => ws.tipo === "Online");

  const [inscricoes, setInscricoes] = useState({});

  const handleToggleInscricao = (id) => {
    setInscricoes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans">
      <PrivateNavBar />

      <main className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 py-8 mt-16 gap-6">
        
        <aside className="w-full md:w-1/4 bg-white/5 border border-white/10 rounded-xl p-6 h-fit shrink-0">
          <h2 className="text-white font-extrabold text-xl mb-6 border-b border-white/10 pb-2">
            Filtrar por Área
          </h2>
          <div className="flex flex-col gap-3">
            {AREAS.map((area) => (
              <button
                key={area.id}
                onClick={() => setFiltroArea(area.id)}
                className={`text-left px-4 py-3 rounded-lg font-bold transition-all ${
                  filtroArea === area.id
                    ? "bg-yellow-500 text-[#0a1945] shadow-lg scale-105"
                    : "bg-transparent text-gray-300 hover:bg-white/10"
                }`}
              >
                {area.nome}
              </button>
            ))}
          </div>
        </aside>

        <section className="w-full md:w-3/4 flex flex-col gap-8">
          
          <div>
            <h2 className="text-yellow-400 font-extrabold text-2xl mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Workshops Presenciais
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {presenciais.length > 0 ? (
                presenciais.map((ws) => {
                  const estaInscrito = inscricoes[ws.id];
                  
                  return (
                    <div 
                      key={ws.id} 
                      className={`relative rounded-xl p-5 border-2 transition-all overflow-hidden ${estaInscrito ? "bg-white border-yellow-400" : "bg-[#1a2b5e] border-transparent hover:border-white/20"}`}
                    >
                      {!estaInscrito && (
                        <div className="absolute inset-0 bg-[#0a1945]/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <svg className="w-10 h-10 text-yellow-400 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                          <span className="text-white font-bold text-sm">Inscrição Necessária</span>
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-extrabold text-lg pr-4 ${estaInscrito ? "text-[#0a1945]" : "text-white"}`}>
                          {ws.titulo}
                        </h3>
                        <button 
                          onClick={() => handleToggleInscricao(ws.id)}
                          className={`shrink-0 z-20 relative px-3 py-1 rounded-full text-xs font-bold transition-colors ${estaInscrito ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-yellow-500 text-[#0a1945] hover:bg-yellow-400"}`}
                        >
                          {estaInscrito ? "Cancelar" : "Inscrever"}
                        </button>
                      </div>

                      <p className={`text-sm mb-4 line-clamp-2 ${estaInscrito ? "text-gray-600" : "text-gray-300"}`}>
                        {ws.descricao}
                      </p>

                      <div className={`text-xs font-bold flex flex-col gap-1 ${estaInscrito ? "text-[#0a1945]" : "text-gray-400"}`}>
                        <span className="flex items-center gap-2">
                          📅 {ws.dataHora}
                        </span>
                        <span className="flex items-center gap-2">
                          📍 {ws.local}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400 italic">Nenhum workshop presencial encontrado para esta área.</p>
              )}
            </div>
          </div>

          <hr className="border-white/10 my-4" />

          <div>
            <h2 className="text-blue-400 font-extrabold text-2xl mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/></svg>
              Workshops Online
            </h2>
            
            <div className="flex flex-col gap-3">
              {onlines.length > 0 ? (
                onlines.map((ws) => (
                  <div key={ws.id} className="bg-white/5 border border-white/10 hover:border-blue-400/50 transition-colors rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{ws.titulo}</h3>
                      <p className="text-gray-400 text-sm line-clamp-1">{ws.descricao}</p>
                    </div>
                    <button className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-full transition-colors flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      Assistir
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">Nenhum workshop online encontrado para esta área.</p>
              )}
            </div>
          </div>

        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default Calendario;
