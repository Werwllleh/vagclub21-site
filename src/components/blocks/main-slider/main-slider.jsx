'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';


import MainSliderCard from "@/components/blocks/main-slider/main-slider-card";
import {useHeroSlider} from "@/hooks/useHeroSlider";

const MainSlider = () => {

  const {isLoading, slider} = useHeroSlider();

  return (
    <>
      {isLoading && <MainSliderCard loading={isLoading} />}
      <Swiper
        className="main-slider"
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        spaceBetween={0}
        loop={slides && !!Object.values(slides)?.length > 3}
        pagination={true}
        autoplay={{
          enabled: false,
          delay: 10000,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {
          slides && !!Object.values(slides)?.length && slides.map((slide) => {
            return (
              <SwiperSlide key={slide.documentId}>
                <MainSliderCard data={slide} />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  );
};

export default MainSlider;
