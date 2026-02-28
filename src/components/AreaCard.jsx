import { Link } from "react-router-dom";

function AreaCard({
  id,
  titulo,
  descricao,
  bgClass,
  textClass,
  hoverShadowClass,
  iconeBg,
}) {
  return (
    <Link
      to={`/workshops/${id}`}
      className={`relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${hoverShadowClass} group ${bgClass}`}
    >
      <svg
        className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 text-white transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {iconeBg}
      </svg>
      <div className="relative z-10 flex flex-col h-full">
        <h2
          className={`font-black text-3xl mb-3 tracking-wide uppercase ${textClass}`}
        >
          {titulo}
        </h2>
        <p className="text-white/90 font-medium text-lg leading-relaxed mb-6">
          {descricao}
        </p>
        <div className="mt-auto">
          <span className="inline-flex items-center gap-2 font-bold text-white bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
            Acessar Trilhas
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default AreaCard;
