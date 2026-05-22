"use client"

import CarCard from "@/components/pages/cars/car-card";

// Import Swiper React components
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import {useOtherCars} from "@/hooks/useOtherCars";
import {useRef} from "react";
import SvgIcon from "@/components/svg-icon";

const CarsOthers = () => {

  const {otherCarsData} = useOtherCars(15);

  const swiperRef = useRef(null);

  return (
    <>
      {!!otherCarsData.length && (
        <div className="cars-others">
          <div className="cars-others__header">
            <h3 className="cars-others__title h2">Другие авто</h3>
            <div className="cars-others__navigation">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Предыдущий"
              >
                <SvgIcon name={"arrow"} />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Следующий"
              >
                <SvgIcon name={"arrow"} />
              </button>
            </div>
          </div>
          <div className="cars-others__cars">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              // noSwipingSelector={'.car-card__image'}
              spaceBetween={20}
              slidesPerView={"auto"}
            >
              {otherCarsData.map((car) => {
                return (
                  <SwiperSlide key={car.id}>
                    <CarCard car={car}/>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default CarsOthers;
