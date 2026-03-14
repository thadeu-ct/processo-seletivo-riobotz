import React from "react";

function CBCTC({ onConfirm }) {
  return (
    // Fundo escurecido (overlay)
    <div className="fixed inset-0 bg-[#0a1945] bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
      {/* Container do Modal */}
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl flex flex-col items-center text-center transform transition-all scale-100">
        <h2 className="text-[#0a1945] font-extrabold text-2xl mb-4">
          Cadastro Concluído! 🎉
        </h2>

        <p className="text-gray-700 mb-6 font-medium text-lg leading-relaxed">
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
          onClick={onConfirm} // Chama a função que redireciona pro login
          className="bg-yellow-500 hover:bg-yellow-400 text-[#0a1945] font-black py-4 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1 mb-4 w-full text-lg uppercase tracking-wider"
        >
          Oficializar Inscrição
        </a>

        <p className="text-sm text-gray-500 mt-2">
          Após clicar, você será redirecionado para o login.
        </p>
      </div>
    </div>
  );
}

export default CBCTC;
