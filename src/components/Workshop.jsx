import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function Workshop({
  id,
  titulo,
  descricao,
  videoId,
  quizLink,
  tipo,
  dataHora,
  local,
  isAdminView,
}) {
  const handleInscricao = async () => {
    const matricula = sessionStorage.getItem("matriculaUsuario");
    if (!matricula) {
      alert("Você precisa estar logado!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("matricula", matricula);
      formData.append("id", id);

      const res = await fetch(`${API_URL}/workshops/inscrever`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.inscricao === 1) {
        alert("Inscrição confirmada! Nos vemos lá.");
      } else {
        alert(data.erro || "Erro ao se inscrever.");
      }
    } catch (err) {
      console.error("Erro na inscrição:", err);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-xl hover:border-yellow-400/30 transition-colors w-full relative overflow-hidden group">
      {/* BADGES */}
      <div className="flex flex-wrap gap-3 mb-1">
        {tipo === "Presencial" ? (
          <span className="bg-orange-500/20 text-orange-400 border border-orange-500/50 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Presencial
          </span>
        ) : (
          <span className="bg-blue-500/20 text-blue-400 border border-blue-500/50 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 16V4H3v12h18zM4 5h16v10H4V5zm10 14h3v2H7v-2h3v-2h4v2z" />
            </svg>
            Online
          </span>
        )}

        {dataHora && (
          <span className="bg-white/10 text-gray-300 border border-white/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            {dataHora}
          </span>
        )}
      </div>

      {/* ÁREA DE VÍDEO / PLACEHOLDER - LÓGICA REFEITA */}
      {
        tipo === "Online" ? (
          videoId ? (
            // Caso 1: É Online e TEM vídeo
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/60 shadow-inner">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            // Caso 2: É Online e NÃO TEM vídeo (Ainda)
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#061133] border border-white/5 shadow-inner flex flex-col items-center justify-center text-center p-6 group-hover:border-yellow-400/20 transition-colors">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              ></div>
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center text-gray-500">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-gray-300 font-black uppercase tracking-widest text-sm mb-1">
                    Vídeo em Produção
                  </h4>
                  <p className="text-gray-500 text-xs font-bold px-4 max-w-[280px]">
                    Aguarde o lançamento oficial. Você será comunicado em breve.
                  </p>
                </div>
              </div>
            </div>
          )
        ) : null /* Caso 3: É Presencial, não renderiza área de vídeo */
      }

      {/* CONTEÚDO TEXTUAL */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-end">
        <div className="flex-1">
          <h3 className="text-white font-black text-2xl md:text-3xl mb-2 tracking-tight group-hover:text-yellow-400 transition-colors">
            {titulo}
          </h3>
          <p className="text-gray-300 font-medium text-lg leading-relaxed mb-3">
            {descricao}
          </p>

          {local && (
            <p className="text-yellow-400/80 font-bold text-sm bg-yellow-400/5 inline-block px-3 py-1.5 rounded-lg border border-yellow-400/10">
              📍 Local: {local}
            </p>
          )}
        </div>

        {/* BOTÕES DE AÇÃO */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto mt-2 lg:mt-0">
          {tipo === "Presencial" &&
            (isAdminView ? (
              <Link
                to={`/admin/workshop/${id}`}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-cyan-600/20 border-2 border-cyan-500 text-cyan-400 font-black text-lg hover:bg-cyan-500 hover:text-[#0a1945] hover:scale-105 transition-all text-center whitespace-nowrap shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                Ver Inscritos
              </Link>
            ) : (
              <button
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border-2 border-orange-500 text-orange-400 font-black text-lg hover:bg-orange-500 hover:text-white hover:scale-105 transition-all text-center whitespace-nowrap"
                onClick={handleInscricao}
              >
                Inscrever-se
              </button>
            ))}

          {quizLink &&
            (isAdminView ? (
              <Link
                to={`/admin/quiz/${id}`}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-yellow-500/10 border-2 border-yellow-500 text-yellow-500 font-black text-lg hover:bg-yellow-500 hover:text-[#0a1945] hover:scale-105 transition-all text-center whitespace-nowrap shadow-[0_0_15px_rgba(234,179,8,0.2)]"
              >
                Ver Resultados
              </Link>
            ) : (
              <Link
                to={quizLink}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-yellow-400 text-[#0a1945] font-black text-lg hover:bg-white hover:scale-105 transition-all shadow-lg shadow-yellow-400/20 text-center whitespace-nowrap"
              >
                Fazer Quiz
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Workshop;
