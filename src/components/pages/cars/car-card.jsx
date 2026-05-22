import getRandomNumber from "@/functions/getRandomNumber";
import Link from "next/link";
import {API_URL} from "@/constants";

// Import Swiper
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import React from "react";
import {useRouter} from "next/navigation";

const CarCard = ({car}) => {

  const router = useRouter()
  const link = `/cars/${car.brand?.substring(0,1)}${car.model?.substring(0,1)}_${car.id}`;

  return (
    <div className="car-card" onClick={() => router.push(link)}>
      <div className="car-card__body">
        <div className="car-card__images">
          <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            pagination={{
              enabled: true,
              clickable: true,
            }}
            slidesPerView={1}
          >
            {car.carsImages?.map((image) => {
              return (
                <SwiperSlide key={image.id}>
                  <div className="car-card__image">
                    <img className="car-card__image--main" src={`${API_URL}/image/${image.source}`} alt=""/>
                    <img className="car-card__image--bg" src={`${API_URL}/image/${image.source}`} alt=""/>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <div className="car-card__info"></div>
      </div>
      <Link className="car-card__link" href={link} />
    </div>
  )
};

export default CarCard;
