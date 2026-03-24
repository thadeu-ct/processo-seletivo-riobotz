import { Link } from "react-router-dom";

function AreaCard({
  id,
  titulo,
  descricao,
  bgClass,
  textClass,
  hoverShadowClass,
  iconeBg,
  isLocked,
}) {
  const cardContent = (
    <div
      className={`relative group rounded-3xl p-8 flex flex-col h-full transition-all duration-300 ${bgClass} ${
        isLocked
          ? "cursor-not-allowed opacity-80"
          : `hover:-translate-y-2 hover:shadow-2xl ${hoverShadowClass}`
      }`}
    >
      <div className="flex items-center gap-5 mb-6">
        <div className={`bg-black/30 p-4 rounded-2xl ${textClass}`}>
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {iconeBg}
          </svg>
        </div>
        <h3 className="text-white font-black text-3xl tracking-tighter uppercase">
          {titulo}
        </h3>
      </div>

      <p className="text-gray-100 font-semibold text-lg leading-relaxed flex-grow mb-6">
        {descricao}
      </p>

      {!isLocked && (
        <div className="mt-auto flex justify-end">
          <div
            className={`font-black uppercase tracking-widest text-sm py-2 px-5 rounded-full bg-white/10 ${textClass}`}
          >
            Acessar Trilhas →
          </div>
        </div>
      )}

      {isLocked && (
        <div className="absolute inset-0 bg-[#0a1945]/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 border-4 border-amber-500">
          <div className="bg-amber-500 p-5 rounded-full text-[#0a1945] shadow-[0_0_30px_rgba(251,191,36,0.6)]">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <p className="text-white font-black text-2xl uppercase tracking-widest">
            Bloqueado
          </p>
          <p className="text-amber-400 font-bold text-sm bg-black/40 px-3 py-1 rounded-full">
            Disponível em 01/04
          </p>
        </div>
      )}
    </div>
  );

  if (isLocked) {
    return cardContent;
  }

  return <Link to={`/workshops/${id}`}>{cardContent}</Link>;
}

export default AreaCard;
