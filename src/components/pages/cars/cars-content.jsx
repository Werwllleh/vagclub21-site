'use client'
import {useCar} from "@/hooks/useCar";
import Loader from "@/components/loader";
import CarCard from "@/components/pages/cars/car-card";

const CarsContent = () => {

  const {cars, isLoading} = useCar();

  return (
    <div className="cars-page">
      <div className="container">
        <h1 className="cars-page__title">Клубные авто</h1>
        {isLoading && <Loader />}
        {!!cars?.length && !isLoading && (
          <div className="cars-page__grid">
            {cars.map((car) => {
              return <CarCard key={car.car_number} car={car} />
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarsContent;
