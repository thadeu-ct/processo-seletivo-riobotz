import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Video from "../components/Video";

const combatVideos = [
  {
    id: 1,
    title: "Combates de alto impacto.",
    location: "BattleBots - Las Vegas, EUA",
    videoId: "GkbAcwYix7I", //https://www.youtube.com/watch?v=GkbAcwYix7I
    startSeconds: 0,
  },
  {
    id: 2,
    title: "Em competições internacionais.",
    location: "NHRL - Norwalk, EUA",
    videoId: "fqgrigHtMI4", // https://www.youtube.com/live/fqgrigHtMI4?si=HBtOuM7IEqZ1B9ec&t=13266
    startSeconds: 13266,
  },
  {
    id: 3,
    title: "Por todo o Brasil.",
    location: "Bots Fight Club - São Paulo, Brasil",
    videoId: "OF76Ie9mRQc", // https://www.youtube.com/live/OF76Ie9mRQc?si=4DBKXISI0IMV-I5s&t=29442
    startSeconds: 29442,
  },
];

function CombatCarousel() {
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleVideoEnd = () => {
    if (swiperInstance) {
      setTimeout(() => {
        swiperInstance.slideNext();
      }, 200);
    }
  };

  return (
    <section id="combates" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white border-4 border-[#0a1945] rounded-xl overflow-hidden shadow-2xl pb-10">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            loop={true}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            className="w-full h-full"
          >
            {combatVideos.map((video) => (
              <SwiperSlide key={video.id}>
                <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1945] mb-8">
                    {video.title}
                  </h2>

                  <Video
                    videoId={video.videoId}
                    startSeconds={video.startSeconds}
                    onEnd={handleVideoEnd}
                    className="max-w-4xl"
                  />

                  <p className="mt-6 text-[#0a1945] font-bold text-lg">
                    {video.location}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default CombatCarousel;
