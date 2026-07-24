'use client'

import Loader from "@/components/loader";
import CarCard from "@/components/cars/car-card";
import CarSearch from '@/components/cars/car-search';
import {useCarsStore} from "@/store/cars.store";
import {useUserCars} from "@/hooks/useUserCars";
import {useCallback, useMemo} from "react";
import {Pagination} from 'antd';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import H1 from "@/components/UI/h1";
import { createStaticStyles } from 'antd-style';

const SHOW_DATA_CARS_LIMIT = 12;

const CarsContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {filteredCars, loading} = useCarsStore();

  const page = useMemo(() => {
    const p = Number(searchParams.get("page") ?? 1);
    return Number.isFinite(p) && p > 0 ? p : 1;
  }, [searchParams]);

  const {userCars, isLoading} = useUserCars({page, limit: SHOW_DATA_CARS_LIMIT});

  const handlePageChange = useCallback(
    (nextPage) => {
      const params = new URLSearchParams(searchParams.toString());

      if (nextPage > 1) {
        params.set("page", String(nextPage));
      } else {
        params.delete("page");
      }

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, {scroll: true});
    },
    [router, pathname, searchParams]
  );

  const serverCarsList = userCars?.data.data ?? [];
  const hasServerCars = serverCarsList?.length > 0;
  const isDataLoading = isLoading || loading;
  const hasFilteredCars = filteredCars?.length > 0;

  return (
    <div className="page cars-page ppt ppb">
      <div className="container">
        <H1 className="cars-page__title pageTitle">Список автомобилей</H1>

        {isDataLoading && <Loader/>}

        {hasServerCars && !isLoading && (
          <>
            <CarSearch/>

            {filteredCars === null ? (
              <div className="cars-page__not-found">Ничего не найдено</div>
            ) : (
              <>
                {hasFilteredCars ? (
                  <div className="cars-page__grid">
                    {filteredCars.map((car, index) => (
                      <CarCard key={car.id} car={car} cardIndex={index} />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="cars-page__grid">
                      {serverCarsList?.map((car, index) => (
                        <CarCard key={car.id} car={car} cardIndex={index}/>
                      ))}
                    </div>
                    {userCars?.data?.total > 0 && (
                      <div className="cars-page__pagination">
                        <Pagination
                          responsive={true}
                          current={page}
                          total={userCars.data.total}
                          pageSize={SHOW_DATA_CARS_LIMIT}
                          onChange={handlePageChange}
                          showSizeChanger={false}
                        />
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CarsContent;
