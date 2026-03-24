import { Link } from "react-router-dom";

function AreaCard({ id, titulo, descricao, bgClass, textClass, hoverShadowClass, isLocked }) {
  const cardContent = (
    <div
      className={`relative group rounded-3xl p-8 flex flex-col h-full transition-all duration-300 ${bgClass} ${
        isLocked ? "cursor-not-allowed" : `hover:-translate-y-2 hover:shadow-2xl ${hoverShadowClass}`
      }`}
    >
      <div className="mb-4">
        <h3 className={`font-black text-3xl tracking-tighter uppercase ${textClass}`}>
          {titulo}
        </h3>
      </div>

      <p className="text-gray-100 font-medium text-base leading-relaxed flex-grow mb-8">
        {descricao}
      </p>

      <div className="mt-auto flex justify-start">
        <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 flex items-center gap-2 text-white font-bold text-sm">
          Acessar Trilhas
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {isLocked && (
        <div className="absolute inset-0 bg-[#0a1945]/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-amber-400 font-black uppercase text-xl">Bloqueado</span>
          <span className="text-white/60 text-xs font-bold">Lança em 01/04</span>
        </div>
      )}
    </div>
  );

  if (isLocked) return cardContent;
  return <Link to={`/workshops/${id}`}>{cardContent}</Link>;
}

export default AreaCard;
