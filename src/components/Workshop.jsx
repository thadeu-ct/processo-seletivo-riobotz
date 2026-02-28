import { Link } from "react-router-dom";

function Workshop({
  id,
  titulo,
  descricao,
  videoId,
  quizLink,
  tipo,
  dataHora,
  local,
  isAdmin,
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-xl hover:border-yellow-400/30 transition-colors w-full relative overflow-hidden group">
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

      {videoId && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/60 shadow-inner">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

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

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto mt-2 lg:mt-0">
          {tipo === "Presencial" &&
            (isAdmin ? (
              <Link
                to={`/admin/workshop/${id}`}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-cyan-600/20 border-2 border-cyan-500 text-cyan-400 font-black text-lg hover:bg-cyan-500 hover:text-[#0a1945] hover:scale-105 transition-all text-center whitespace-nowrap shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                Ver Inscritos
              </Link>
            ) : (
              <button
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border-2 border-orange-500 text-orange-400 font-black text-lg hover:bg-orange-500 hover:text-white hover:scale-105 transition-all text-center whitespace-nowrap"
                onClick={() =>
                  alert("Simulando envio para o DB! Função futura.")
                }
              >
                Inscrever-se
              </button>
            ))}

          {quizLink && !isAdmin && (
            <Link
              to={quizLink}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-yellow-400 text-[#0a1945] font-black text-lg hover:bg-white hover:scale-105 transition-all shadow-lg shadow-yellow-400/20 text-center whitespace-nowrap"
            >
              Fazer Quiz
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Workshop;
