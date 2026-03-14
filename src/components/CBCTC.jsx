function CBCTC({ onConfirm }) {
  return (
    <>
      <style>
        {`
          @keyframes shine {
            100% {
              left: 125%;
            }
          }
          .gem-shimmer::after {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.4) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            transform: skewX(-25deg);
            animation: shine 2s infinite;
          }
        `}
      </style>

      <div className="fixed inset-0 bg-[#0a1945] bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
        <div className="bg-white rounded-lg p-10 w-full max-w-lg shadow-2xl flex flex-col items-center text-center transform transition-all scale-100">
          <h2 className="text-[#0a1945] font-extrabold text-3xl mb-4">
            Cadastro Concluído!
          </h2>

          <p className="text-gray-700 mb-8 font-medium text-xl leading-relaxed">
            Para oficializar sua inscrição no processo seletivo da RioBotz, você{" "}
            <span className="underline decoration-yellow-500 decoration-2 underline-offset-4">
              precisa
            </span>{" "}
            se registrar no site do CTC.
          </p>

          <a
            href="https://www.cbctc.puc-rio.br/Paginas/MeuCB/Noticias.aspx?id=788"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onConfirm}
            className="relative overflow-hidden gem-shimmer bg-yellow-500 hover:bg-yellow-400 text-[#0a1945] font-black py-5 px-10 rounded-full shadow-lg transition-all hover:-translate-y-1 hover:shadow-yellow-500/30 mb-4 w-full text-xl uppercase tracking-wider block"
          >
            Oficializar Inscrição
          </a>

          <p className="text-base text-gray-500 mt-2">
            Após clicar, você será redirecionado para o login.
          </p>
        </div>
      </div>
    </>
  );
}

export default CBCTC;
