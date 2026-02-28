import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";
import Workshop from "../components/Workshop";
import workshopsDB from "../services/workshops.json";
import { Link } from "react-router-dom";

function Autonomos() {
  const trilhaAutonomos = workshopsDB.filter((workshop) =>
    workshop.areas.includes("autonomos"),
  );

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans">
      <PrivateHeader />

      <main className="flex-grow flex flex-col items-center py-8 px-4 md:px-8 relative">
        <div className="w-full max-w-4xl mb-8">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 font-bold transition-colors"
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
          <div className="flex-shrink-0 flex justify-center items-center w-16 h-16 md:w-20 md:h-20 bg-green-400/10 rounded-2xl border border-green-400/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-green-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
          <h1 className="text-green-400 font-black text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase font-mono m-0">
            Autônomos
          </h1>
        </div>

        <div className="w-full max-w-4xl relative">
          <div className="absolute left-[19px] md:left-[39px] top-4 bottom-0 w-1 bg-green-400/20 rounded-full"></div>

          <div className="flex flex-col gap-12">
            {trilhaAutonomos.map((item, index) => {
              if (!item) return null;

              return (
                <div key={item.id} className="relative flex items-start group">
                  <div className="absolute left-0 md:left-5 top-8 w-10 h-10 rounded-full bg-[#0a1945] border-4 border-green-400 z-10 flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(74,222,128,0.5)]">
                    <span className="text-green-400 font-black text-sm font-mono">
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

export default Autonomos;
