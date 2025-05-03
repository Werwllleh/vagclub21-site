"use client"
import {useCar} from "@/hooks/useCar";
import CarCard from "@/components/pages/cars/car-card";
import {useEffect, useState} from "react";
import {getRandomItems} from "@/functions/getRandomItems";

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const CarsOthers = () => {

  const {cars, isLoading} = useCar();

  const [carsShuffled, setCarsShuffled] = useState([]);

  useEffect(() => {
    if (cars && !!cars.length) {
      const shuffledCars = getRandomItems(cars, 15);
      setCarsShuffled(shuffledCars)
    }

  }, [cars]);

  return (
    <>
      {cars && !!cars.length && !!carsShuffled.length && (
        <div className="cars-others">
          <h3 className="cars-others__title">Другие авто</h3>
          <div className="cars-others__cars">
            <Swiper
              spaceBetween={20}
              slidesPerView={"auto"}
            >
              {carsShuffled.map((car) => {
                return (
                  <SwiperSlide key={car.car_number}>
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
