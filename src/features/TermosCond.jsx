import React from "react";

function TermosCond({ onClose }) {
  return (
    <div className="fixed inset-0 bg-[#0a1945] bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
      {/* Container do Modal com altura máxima para gerar scroll se a tela for pequena */}
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[85vh] shadow-2xl flex flex-col relative overflow-hidden">
        {/* Botão de Fechar no canto */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Fechar termos"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-[#0a1945] font-extrabold text-2xl mb-6 border-b pb-4">
          Termos e Condições (LGPD)
        </h2>

        {/* Área de rolagem para o texto longo */}
        <div className="overflow-y-auto pr-2 text-gray-700 space-y-4 text-sm md:text-base leading-relaxed mb-6">
          <p>
            Ao concluir e enviar a sua inscrição por meio deste formulário, você
            concorda e autoriza que a PUC-Rio realize o tratamento dos seus
            dados pessoais aqui informados para viabilizar a sua inscrição e
            participação no processo seletivo da Equipe de Competição RioBotz do
            CTC da PUC-Rio, e receber informações sobre o mesmo e outros eventos
            realizados pela Universidade.
          </p>
          <p>
            Informamos que a PUC-Rio manterá seus dados pessoais em ambiente
            digital seguro, e que o acesso a esses dados será realizado
            exclusivamente pela Equipe de Competição RioBotz do CTC da PUC-Rio
            envolvida na organização e realização do evento.
          </p>
          <p>
            Nenhuma informação será compartilhada com terceiros pela PUC-Rio,
            exceto caso seja necessário para viabilizar a sua participação no
            processo seletivo, observado o disposto na legislação aplicável, ou
            se de forma anonimizada.
          </p>
          <p>
            Você poderá solicitar via e-mail (encarregado-lgpd@puc-rio.br), a
            qualquer momento, que sejam eliminados os seus dados pessoais não
            anonimizados. Ao solicitar a eliminação, você fica ciente de que
            será inviável para a PUC-Rio manter a sua inscrição e participação
            do processo seletivo.
          </p>
          <p>
            Para maiores informações, acesse a nossa Política de Privacidade:{" "}
            <a
              href="https://www.puc-rio.br/sobrepuc/lgpd/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold break-all"
            >
              https://www.puc-rio.br/sobrepuc/lgpd/
            </a>
          </p>
        </div>

        {/* Botão de Ciente no final */}
        <button
          onClick={onClose}
          className="w-full bg-[#0a1945] hover:bg-blue-900 text-white font-bold py-4 px-8 rounded transition-colors mt-auto"
        >
          Li e estou ciente
        </button>
      </div>
    </div>
  );
}

export default TermosCond;
