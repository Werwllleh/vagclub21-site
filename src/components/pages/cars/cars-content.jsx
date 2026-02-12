'use client'

import Loader from "@/components/loader";
import CarCard from "@/components/pages/cars/car-card";
import CarSearch from "@/components/pages/cars/car-search";
import {useCarsStore} from "@/store/cars.store";
import {useUserCars} from "@/hooks/useUserCars";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Pagination} from 'antd';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const CarsContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {filteredCars, loading} = useCarsStore();

  const urlPage = useMemo(() => {
    const p = Number(searchParams.get("page") ?? 1);
    return Number.isFinite(p) && p > 0 ? p : 1;
  }, [searchParams]);

  const [page, setPage] = useState(urlPage);

  useEffect(() => {
    setPage((prev) => (prev === urlPage ? prev : urlPage));
  }, [urlPage]);

  const setPageInUrl = useCallback(
    (nextPage) => {
      const params = new URLSearchParams(searchParams.toString());

      if (nextPage > 1) params.set("page", String(nextPage));
      else params.delete("page");

      const qs = params.toString();
      const nextUrl = qs ? `${pathname}?${qs}` : pathname;

      router.replace(nextUrl, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    // важно: если URL уже соответствует page — не делаем replace
    if (page !== urlPage) setPageInUrl(page);
  }, [page, urlPage, setPageInUrl]);

  const {
    userCars,
    pages,
    isLoading,
  } = useUserCars({page, limit: 20});


  /*const searchParams = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page');

    console.log(page);

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
  }, [page]);*/

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
