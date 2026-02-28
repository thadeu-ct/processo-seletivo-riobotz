import Video from "../components/Video";

function AboutTeam() {
  return (
    <section id="equipe" className="bg-[#0a1945] py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center">
          Um pouco mais sobre a equipe...
        </h2>
        <div className="w-full mb-12">
          <Video videoId="GkbAcwYix7I" />
        </div>
        <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-6 text-justify">
          <p>
            Fundada em 2003, sob a supervisão do professor Marco Antônio
            Meggiolaro, a RioBotz é a equipe de robótica da PUC-Rio.
          </p>

          <p>
            Nossa equipe é dividida em áreas:{" "}
            <strong className="text-white font-bold">mecânica</strong> e{" "}
            <strong className="text-white font-bold">eletrônica</strong>
            ficam responsáveis por projetar e trazer à vida os robôs de combate,
            enquanto os{" "}
            <strong className="text-white font-bold">autônomos</strong> se
            encarregam dos robôs sumô e seguidor de linha, que requerem uma
            combinação sofisticada tanto de software quanto de hardware para
            competirem. Para aqueles que não se interessam pelas áreas técnicas,
            a equipe conta com dois pilares cruciais: nossos membros de{" "}
            <strong className="text-white font-bold">comunicação</strong>{" "}
            administram as redes sociais e a mídia da RioBotz, que conta com uma
            legião enorme de seguidores, enquanto os membros de{" "}
            <strong className="text-white font-bold">gestão</strong> ficam
            encarregados de questões importantíssimas de logística e financeiro,
            tendo contato direto com empresas grandes que patrocinam a equipe.
          </p>

          <p>
            Todo ano, a RioBotz viaja Brasil e mundo a fora, representando a
            PUC-Rio em algumas das mais conceituadas competições de robótica,
            como a RCX, a maior competição da América Latina, e a NHRL, a maior
            competição do mundo.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutTeam;
