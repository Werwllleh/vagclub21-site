'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import {slides} from "@/data/main-slider";
import MainSliderCard from "@/components/blocks/main-slider/main-slider-card";

const MainSlider = () => {
  return (
    <Swiper
      className="main-slider"
      modules={[EffectFade, Autoplay, Pagination]}
      effect="fade"
      spaceBetween={0}
      loop={true}
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
        !!slides.length && slides.map((slide, index) => {
          return (
          <SwiperSlide key={index}>
            <MainSliderCard data={slide} />
          </SwiperSlide>
          )
        })
      }
    </Swiper>
  );
};

export default MainSlider;
