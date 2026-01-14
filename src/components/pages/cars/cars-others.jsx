"use client"

import CarCard from "@/components/pages/cars/car-card";

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import {useOtherCars} from "@/hooks/useOtherCars";

const CarsOthers = () => {

  const {otherCarsData} = useOtherCars(15);

  return (
    <>
      {!!otherCarsData.length && (
        <div className="cars-others">
          <h3 className="cars-others__title">Другие авто</h3>
          <div className="cars-others__cars">
            <Swiper
              spaceBetween={20}
              slidesPerView={"auto"}
            >
              {otherCarsData.map((car) => {
                return (
                  <SwiperSlide key={car.id}>
                    <CarCard car={car} />
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
