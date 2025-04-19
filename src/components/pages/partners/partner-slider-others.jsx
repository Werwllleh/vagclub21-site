import React from 'react';
import PartnerCard from "@/components/pages/partners/partner-card";

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const PartnerSliderOthers = ({items}) => {


  return (
    <div className="partner-slider-others">
      <h3>Другие партнеры</h3>
      {items && !!items.length && (
        <Swiper
          spaceBetween={20}
          loop={false}
          slidesPerView={"auto"}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {
            items.map((partner) => {
              return (
                <SwiperSlide key={partner.slug}>
                  <PartnerCard partner={partner}/>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      )}
    </div>
  )
    ;
};

export default PartnerSliderOthers;
