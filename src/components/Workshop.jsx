import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function Workshop({
  id,
  titulo,
  descricao,
  link,
  quiz_link,
  tipo,
  dataHora,
  local,
  isAdminView,
  jaInscrito,
}) {
  const [statusInscrito, setStatusInscrito] = useState(jaInscrito);

  useEffect(() => {
    setStatusInscrito(jaInscrito);
  }, [jaInscrito]);

  const handleInscricao = async () => {
    if (statusInscrito) return;
    const matricula = sessionStorage.getItem("matriculaUsuario");
    if (!matricula) return toast.error("Você precisa estar logado!");

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
        setStatusInscrito(true);
        toast.success("Inscrição confirmada!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-xl hover:border-yellow-400/30 transition-colors w-full relative overflow-hidden group">
      <div className="flex flex-wrap gap-3 mb-1">
        {tipo === "Presencial" ? (
          <span className="bg-orange-500/20 text-orange-400 border border-orange-500/50 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            📍 Presencial
          </span>
        ) : (
          <span className="bg-blue-500/20 text-blue-400 border border-blue-500/50 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            💻 Online
          </span>
        )}
        {dataHora && (
          <span className="bg-white/10 text-gray-300 border border-white/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
            🗓️ {dataHora}
          </span>
        )}
      </div>

      {tipo === "Online" &&
        (link ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/60 shadow-inner">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${link}`}
              title={titulo}
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="relative w-full aspect-video rounded-2xl bg-[#061133] border border-white/5 flex flex-col items-center justify-center text-center p-6">
            <h4 className="text-gray-300 font-black uppercase tracking-widest text-sm mb-1">
              Vídeo em Produção
            </h4>
            <p className="text-gray-500 text-xs font-bold">
              Aguarde o lançamento oficial.
            </p>
          </div>
        ))}

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

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto mt-2 lg:mt-0 justify-between items-center">
          {tipo === "Presencial" && link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/5 border border-white/20 text-gray-300 font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              📄 Baixar Slides
            </a>
          )}

          {isAdminView ? (
            <div className="flex gap-2 w-full">
              {tipo === "Presencial" ? (
                <Link
                  to={`/admin/workshop/${id}`}
                  className="w-full px-8 py-4 rounded-full bg-cyan-600/20 border-2 border-cyan-500 text-cyan-400 font-black text-center whitespace-nowrap"
                >
                  Inscritos
                </Link>
              ) : (
                <Link
                  to={
                    quiz_link
                      ? `/admin/quiz/${id}`
                      : `/admin/quiz/perguntas/${id}`
                  }
                  className={`w-full px-8 py-4 rounded-full border-2 font-black text-center ${quiz_link ? "bg-green-600/20 border-green-500 text-green-400" : "bg-yellow-500/10 border-yellow-500 text-yellow-500"}`}
                >
                  {quiz_link ? "Resultados" : "Configurar Quiz"}
                </Link>
              )}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {tipo === "Presencial" ? (
                <button
                  onClick={handleInscricao}
                  disabled={statusInscrito}
                  className={`w-full sm:w-auto px-8 py-4 rounded-full font-black text-lg transition-all border-2 ${statusInscrito ? "bg-green-500/20 border-green-500 text-green-400" : "bg-transparent border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white"}`}
                >
                  {statusInscrito ? "✓ Inscrito" : "Inscrever-se"}
                </button>
              ) : (
                quiz_link && (
                  <Link
                    to={quiz_link}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-yellow-400 text-[#0a1945] font-black text-lg hover:bg-white transition-all shadow-lg text-center"
                  >
                    Fazer Quiz
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Workshop;
