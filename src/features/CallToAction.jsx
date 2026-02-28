import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <section id="palestra" className="bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-10">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#0a1945] decoration-4 leading-tight">
          Venha nos conhecer na palestra de <br className="hidden md:block" />
          abertura do processo seletivo!
        </h2>
        <Link
          to="/cadastro"
          className="bg-yellow-400 text-[#0a1945] font-black py-4 px-16 rounded-lg text-3xl transition-transform hover:scale-105 shadow-md hover:shadow-xl"
        >
          Dia XX/XX
        </Link>
        <div className="space-y-6 mt-2">
          <p className="text-[#0a1945] font-extrabold text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            Nosso laboratório fica no pilotis do Cardeal Leme, entre o Rei do
            Matte e o Geneal.
          </p>

          <p className="text-[#0a1945] font-extrabold text-xl md:text-2xl">
            Estamos ansiosos para conhecê-los!
          </p>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
