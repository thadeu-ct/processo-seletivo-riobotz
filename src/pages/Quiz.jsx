import { useState, useEffect } from "react";
import { navigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import PrivateHeader from "../components/PrivateHeader";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

function Quiz() {
  const { id } = useParams();
  const [perguntas, setPerguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [pontuacao, setPontuacao] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const matricula = sessionStorage.getItem("matriculaUsuario");

  useEffect(() => {
    const verificarConclusao = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/quiz/resultados`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workshop_id: id }),
        });
        const resultados = await res.json();
        const jaFez = resultados.some(
          (r) => String(r.matricula) === String(matricula),
        );
        if (jaFez) {
          toast.error(
            "Você já completou este quiz! Os Botcoins são creditados apenas uma vez.",
            {
              duration: 5000,
            },
          );
          navigate("/home");
        }
      } catch (err) {
        console.error(err);
        toast.error(err);
      }
    };
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`${API_URL}/quiz/get?id=${id}&qtd=5`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setPerguntas(data);
        } else {
          toast.error("Não há perguntas suficientes para este quiz.");
        }
      } catch (err) {
        console.error("Erro ao carregar quiz:", err);
        toast.error("Erro ao conectar com o servidor.");
      } finally {
        setLoading(false);
      }
    };
    verificarConclusao();
    fetchQuiz();
  }, [id, matricula]);

  const enviarResultado = async (pontosFinais) => {
    const totalMoedas = pontosFinais * 50;
    try {
      const formData = new FormData();
      formData.append("matricula", matricula);
      formData.append("botcoin", totalMoedas);
      await fetch(`${API_URL}/alteracaoBotcoin`, {
        method: "POST",
        body: formData,
      });
      toast.success(`Você ganhou ${totalMoedas} Botcoins!`, {
        icon: "💰",
      });
    } catch (err) {
      console.error("Erro ao salvar resultado", err);
      toast.error("Erro ao creditar suas moedas.");
    }
  };

  const handleResponder = () => {
    if (opcaoSelecionada === null) return;

    const respostaEhCorreta =
      perguntas[perguntaAtual].opcoes[opcaoSelecionada].correta;

    let novaPontuacao = pontuacao;
    if (respostaEhCorreta) {
      novaPontuacao = pontuacao + 1;
      setPontuacao(novaPontuacao);
    }

    const proximaPergunta = perguntaAtual + 1;
    if (proximaPergunta < perguntas.length) {
      setPerguntaAtual(proximaPergunta);
      setOpcaoSelecionada(null);
    } else {
      setMostrarResultado(true);
      enviarResultado(novaPontuacao);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a1945] flex items-center justify-center text-white">
        Carregando Quiz...
      </div>
    );

  if (perguntas.length === 0)
    return (
      <div className="min-h-screen bg-[#0a1945] flex items-center justify-center text-white">
        Quiz não encontrado.
      </div>
    );

  const moedasGanhas = pontuacao * 50;
  const pergunta = perguntas[perguntaAtual];

  return (
    <div className="min-h-screen bg-[#0a1945] flex flex-col font-sans">
      <PrivateHeader />

      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4 md:px-8 relative">
        <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <svg
              className="absolute -top-10 -right-10 w-48 h-48 text-yellow-400 opacity-5 rotate-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <svg
              className="absolute -bottom-16 -left-10 w-56 h-56 text-orange-400 opacity-5 -rotate-45"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
            </svg>
            <svg
              className="absolute top-10 -left-12 w-40 h-40 text-green-400 opacity-5 -rotate-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            <svg
              className="absolute -bottom-4 right-10 w-32 h-32 text-cyan-400 opacity-5 rotate-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <svg
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-fuchsia-400 opacity-[0.03]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
            </svg>
          </div>

          {mostrarResultado ? (
            <div className="text-center animate-fade-in relative z-10">
              <div className="inline-flex justify-center items-center w-24 h-24 bg-yellow-400/20 rounded-full mb-6 border-4 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.4)]">
                <svg
                  className="w-12 h-12 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h2 className="text-white font-black text-4xl md:text-5xl mb-4 uppercase tracking-tight">
                Desafio Concluído!
              </h2>
              <p className="text-gray-300 text-xl mb-8 font-medium">
                Você acertou{" "}
                <span className="text-yellow-400 font-black text-2xl">
                  {pontuacao}
                </span>{" "}
                de {perguntas.length} perguntas.
              </p>

              <div className="bg-[#0a1945] border border-yellow-400/30 rounded-2xl p-6 inline-block mb-10 shadow-inner">
                <p className="text-sm text-gray-400 uppercase font-bold tracking-widest mb-2">
                  Recompensa Obtida
                </p>
                <div className="flex items-center justify-center gap-3 font-black text-yellow-400 text-3xl">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm1-13h-2v2H9v2h2v2H9v2h2v2h2v-2h2v-2h-2v-2h2V9h-2V7z" />
                  </svg>
                  +{moedasGanhas} ₿
                </div>
              </div>

              <div>
                <Link
                  to="/home"
                  className="inline-block w-full md:w-auto px-10 py-4 rounded-full bg-yellow-400 text-[#0a1945] font-black text-xl hover:bg-white hover:scale-105 transition-all shadow-xl"
                >
                  Voltar para Trilhas
                </Link>
              </div>
            </div>
          ) : (
            <div className="relative z-10 animate-fade-in">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <span className="text-yellow-400 font-bold uppercase tracking-widest text-sm">
                  Questão {perguntaAtual + 1} de {perguntas.length}
                </span>
                <span className="text-white/50 font-mono text-sm">
                  ID: {id}
                </span>
              </div>

              <h2 className="text-white font-black text-2xl md:text-3xl mb-6 leading-tight">
                {pergunta.pergunta}
              </h2>

              {pergunta.imagem && (
                <div className="mb-8 w-full rounded-xl overflow-hidden border-2 border-white/10 shadow-lg">
                  <img
                    src={pergunta.imagem}
                    alt="Ilustração da pergunta"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col gap-4 mb-10">
                {pergunta.opcoes.map((opcao, index) => (
                  <button
                    key={index}
                    onClick={() => setOpcaoSelecionada(index)}
                    className={`text-left w-full p-5 rounded-xl border-2 font-medium text-lg transition-all duration-200 ${
                      opcaoSelecionada === index
                        ? "bg-yellow-400 border-yellow-400 text-[#0a1945] shadow-[0_0_15px_rgba(250,204,21,0.4)] transform scale-[1.02]"
                        : "bg-[#0a1945]/50 border-white/20 text-gray-200 hover:border-yellow-400/50 hover:bg-white/5"
                    }`}
                  >
                    {opcao}
                  </button>
                ))}
              </div>

              <button
                onClick={handleResponder}
                disabled={opcaoSelecionada === null}
                className={`w-full py-5 rounded-xl font-black text-xl transition-all uppercase tracking-wider ${
                  opcaoSelecionada !== null
                    ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg hover:-translate-y-1"
                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
              >
                {perguntaAtual === perguntas.length - 1
                  ? "Finalizar Quiz"
                  : "Confirmar Resposta"}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Quiz;
