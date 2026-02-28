import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import Workshop from "../components/Workshop";
import workshopsDB from "../services/workshops.json";
import { Link } from "react-router-dom";

function Mecanica() {
  const trilhaMecanica = workshopsDB.filter((workshop) =>
    workshop.areas.includes("mecanica"),
  );

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans">
      <PrivateHeader />

      <main className="flex-grow flex flex-col items-center py-8 px-4 md:px-8 relative">
        <div className="w-full max-w-4xl mb-8">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 font-bold transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar
          </Link>
        </div>

        <div className="mb-12 w-full max-w-4xl flex items-center gap-4 md:gap-6">
          <div className="flex-shrink-0 flex justify-center items-center w-16 h-16 md:w-20 md:h-20 bg-orange-400/10 rounded-2xl border border-orange-400/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-orange-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
            </svg>
          </div>
          <h1 className="text-orange-400 font-black text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase font-mono m-0">
            Mecânica
          </h1>
        </div>

        <div className="w-full max-w-4xl relative">
          <div className="absolute left-[19px] md:left-[39px] top-4 bottom-0 w-1 bg-orange-400/20 rounded-full"></div>

          <div className="flex flex-col gap-12">
            {trilhaMecanica.map((item, index) => {
              if (!item) return null;

              return (
                <div key={item.id} className="relative flex items-start group">
                  <div className="absolute left-0 md:left-5 top-8 w-10 h-10 rounded-full bg-[#0a1945] border-4 border-orange-400 z-10 flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                    <span className="text-orange-400 font-black text-sm font-mono">
                      {index + 1}
                    </span>
                  </div>

                  <div className="ml-14 md:ml-24 w-full">
                    <Workshop {...item} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Mecanica;
