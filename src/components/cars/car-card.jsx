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
import Image from "next/image";

const CarCard = ({car, non_gallery = false, cardIndex}) => {

  const router = useRouter()
  const link = `/cars/${car.brand?.substring(0, 1)}${car.model?.substring(0, 1)}_${car.id}`;

  return (
    <div className="car-card" onClick={() => router.push(link)}>
      <div className="car-card__body">
        <div className="car-card__images">
          {!non_gallery ? (
            <Swiper
              modules={[Pagination]}
              spaceBetween={0}
              className="custom-pagination"
              speed={1200}
              pagination={{
                enabled: true,
                clickable: true,
              }}
              slidesPerView={1}
            >
              {car.carsImages?.map((image, index) => {
                return (
                  <SwiperSlide key={image.id}>
                    <div className="car-card__image">
                      <Image
                        width={400}
                        height={400}
                        style={{width: '100%', height: 'auto'}}
                        loading={cardIndex < 3 ? "eager" : "lazy"}
                        className="car-card__image--main"
                        src={`${API_URL}/image/${image.source}`}
                        alt=""
                      />
                      <Image
                        width={400}
                        height={400}
                        style={{width: "100%", height: "100%"}}
                        loading="lazy"
                        className="car-card__image--bg"
                        src={`${API_URL}/image/${image.source}`}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          ) : (
            <div className="car-card__image">
              <Image
                width={400}
                height={400}
                loading={cardIndex < 3 ? "eager" : "lazy"}
                className="car-card__image--main"
                src={`${API_URL}/image/${car?.carsImages[0].source}`}
                alt=""
              />
              <Image
                width={400}
                height={400}
                loading="lazy"
                className="car-card__image--bg"
                src={`${API_URL}/image/${car?.carsImages[0].source}`}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="car-card__info"></div>
      </div>
      <Link className="car-card__link" href={link}/>
    </div>
  )
};

export default CarCard;
