'use client'

import Loader from "@/components/loader";
import CarCard from "@/components/cars/car-card";
import CarSearch from '@/components/cars/car-search';
import {useCarsStore} from "@/store/cars.store";
import {useUserCars} from "@/hooks/useUserCars";
import {useCallback, useEffect, useMemo} from "react";
import {Pagination} from 'antd';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const CarsContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {filteredCars, loading} = useCarsStore();

  const page = useMemo(() => {
    const p = Number(searchParams.get("page") ?? 1);
    return Number.isFinite(p) && p > 0 ? p : 1;
  }, [searchParams]);

  const {userCars, isLoading} = useUserCars({page, limit: 20});

  const handlePageChange = useCallback(
    (nextPage) => {
      const params = new URLSearchParams(searchParams.toString());
      if (nextPage > 1) params.set("page", String(nextPage));
      else params.delete("page");

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, {scroll: false});
    },
    [router, pathname, searchParams]
  );

  const serverCarsList = userCars?.data.data ?? [];
  const hasServerCars = serverCarsList?.length > 0;
  const isDataLoading = isLoading || loading;
  const hasFilteredCars = filteredCars?.length > 0;

  return (
    <div className="cars-page ppt ppb">
      <div className="container">
        <h1 className="cars-page__title h1">Список автомобилей</h1>

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
                    {filteredCars.map((car) => (
                      <CarCard key={car.id} car={car}/>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="cars-page__grid">
                      {serverCarsList?.map((car) => (
                        <CarCard key={car.id} car={car}/>
                      ))}
                    </div>
                    {userCars?.data?.total > 0 && (
                      <div className="cars-page__pagination">
                        <Pagination
                          current={page}
                          total={userCars.data.total}
                          pageSize={20}
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
