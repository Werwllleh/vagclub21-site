'use client'

import Loader from "@/components/loader";
import CarCard from "@/components/pages/cars/car-card";
import CarSearch from "@/components/pages/cars/car-search";
import {useCarsStore} from "@/store/cars.store";
import {useUserCars} from "@/hooks/useUserCars";
import {useCallback, useEffect, useState} from "react";
import {Pagination} from 'antd';
import {useSearchParams} from "next/navigation";

const CarsContent = () => {

  const {filteredCars, loading} = useCarsStore();

  const [page, setPage] = useState(1);

  const {
    userCars,
    pages,
    isLoading,
  } = useUserCars({page, limit: 20});


  const searchParams = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page');
    if (page) {
      setPage(Number(page));
    } else {
      setPage(1);
    }
  }, [searchParams]);

  const createQueryString = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set('page', value);
      } else {
        params.delete('page');
      }
      window.history.pushState(null, '', `?${params.toString()}` || '/');
    }, [searchParams]);

  useEffect(() => {
    createQueryString(page)
  }, [page]);

  return (
    <div className="cars-page ppt ppb">
      <div className="container">
        <h1 className="cars-page__title h1">Клубные авто</h1>
        {(isLoading || loading) && <Loader/>}
        {!!userCars?.data?.length && !isLoading && (
          <>
            <CarSearch/>
            {filteredCars === null ? (
              <div className="cars-page__not-found">Ничего не найдено</div>
            ) : (
              <>
                {filteredCars?.length > 0 ? (
                  <div className="cars-page__grid">
                    {(filteredCars.map((car) => {
                      return <CarCard key={car.id} car={car}/>
                    }))}
                  </div>
                ) : null}
                {!!userCars?.data.length && !filteredCars?.length ? (
                  <>
                    <div className="cars-page__grid">
                      {(userCars.data.map((car) => {
                        return <CarCard key={car.id} car={car}/>
                      }))}
                    </div>
                    {userCars?.total && !!!filteredCars?.length &&
                      <div className="cars-page__pagination">
                        <Pagination
                          current={page}
                          total={userCars.total}
                          pageSize={userCars.limit}
                          onChange={(newPage) => setPage(newPage)}
                          showSizeChanger={false}
                        />
                      </div>
                    }
                  </>
                ) : null}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CarsContent;
