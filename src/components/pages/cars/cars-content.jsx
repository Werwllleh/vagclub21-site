'use client'

import Loader from "@/components/loader";
import CarCard from "@/components/pages/cars/car-card";
import CarSearch from "@/components/pages/cars/car-search";
import {useCarsStore} from "@/store/cars.store";
import {useUserCars} from "@/hooks/useUserCars";

const CarsContent = () => {

  const {cars, isLoading} = useUserCars();

  const {filteredCars, loading} = useCarsStore()

  return (
    <div className="cars-page">
      <div className="container">
        <h1 className="cars-page__title">Клубные авто</h1>
        {(isLoading || loading) && <Loader/>}
        {!!cars?.length && !isLoading && (
          <>
            <CarSearch/>
            {
              filteredCars === null ? <div className="cars-page__not-found">Ничего не найдено</div> : (
                <div className="cars-page__grid">
                  {!!filteredCars?.length ? (filteredCars.map((car) => {
                    return <CarCard key={car.car_number} car={car}/>
                  })) : (!!cars?.length && cars.map((car) => {
                      return <CarCard key={car.car_number} car={car}/>
                    })
                  )}
                </div>
              )
            }
          </>
        )}
      </div>
    </div>
  );
};

export default CarsContent;
