import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Input} from "antd";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import CarService from "@/services/car.service";
import {useCarsStore} from "@/store/cars.store";
import {debounce} from "@/functions/debounce";

/*const CarSearch = () => {

  const {updateFilteredCars, updateLoading, loading} = useCarsStore()
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const number = searchParams.get('number');
    if (number) {
      setSearch(number);
    } else {
      setSearch("");
    }
  }, [searchParams]);

  const createQueryString = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set('number', value);
      } else {
        params.delete('number');
      }
      window.history.pushState(null, '', `?${params.toString()}` || '/');
    }, [searchParams]);

  const searchCars = async (search) => {
    updateLoading(true);
    try {
      const response = await CarService.fetchUsersCars(search);

      if (!!response.data?.data.length) {
        updateLoading(false);
        updateFilteredCars(response.data.data);
      } else {
        updateLoading(false);
        updateFilteredCars(null);
      }
    } catch (error) {
      updateLoading(false);
      console.error('Ошибка при поиске автомобилей:', error);
    } finally {
      updateLoading(false);
    }
  };

  const debouncedSearchCars = useCallback(debounce(searchCars, 700), []);

  useEffect(() => {
    createQueryString(search);

    if (search) {
      debouncedSearchCars(search);
    } else {
      updateFilteredCars([]);
    }
  }, [search, createQueryString, debouncedSearchCars]);

  return (
    <div className="car-search">
      <Input
        allowClear={true}
        placeholder="Поиск авто по номеру"
        className="car-search_input"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  );
};*/

const CarSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {updateFilteredCars, updateLoading} = useCarsStore();

  // 1. Инициализируем стейт из URL ОДИН раз при монтировании
  const initialSearch = searchParams.get("number") ?? "";
  const [search, setSearch] = useState(initialSearch);

  // 2. Функция самого запроса
  const searchCars = async (searchValue) => {
    if (!searchValue) {
      updateFilteredCars([]);
      return;
    }

    updateLoading(true);
    try {
      const response = await CarService.fetchUsersCars(searchValue);
      const cars = response.data?.data;

      if (cars && cars.length > 0) {
        updateFilteredCars(cars);
      } else {
        updateFilteredCars(null); // Ничего не найдено
      }
    } catch (error) {
      console.error("Ошибка при поиске автомобилей:", error);
      updateFilteredCars(null);
    } finally {
      updateLoading(false);
    }
  };

  // 3. Создаем дебаунс-функцию, которая ОДНОВРЕМЕННО обновляет URL и делает запрос
  // Используем useMemo, чтобы дебаунс не пересоздавался и не терял таймер
  const debouncedSyncAndSearchRef = useRef(
    debounce((value, currentParams, currentPathname) => {
      searchCars(value);

      const params = new URLSearchParams(currentParams.toString());
      params.delete("page");

      if (value) {
        params.set("number", value);
      } else {
        params.delete("number");
      }

      const qs = params.toString();
      const nextUrl = qs ? `${currentPathname}?${qs}` : currentPathname;

      router.replace(nextUrl, {scroll: false});
    }, 600)
  );

// 2. Очищаем таймер при размонтировании (теперь .cancel() точно на месте)
  useEffect(() => {
    const debouncedFn = debouncedSyncAndSearchRef.current;
    return () => {
      debouncedFn.cancel();
    };
  }, []);

// 3. В обработчике вызываем функцию из рефа
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Вызов через .current
    debouncedSyncAndSearchRef.current(value, searchParams, pathname);
  };

  return (
    <div className="car-search">
      <Input
        allowClear={true}
        placeholder="Поиск авто по номеру"
        className="car-search_input"
        onChange={handleInputChange}
        value={search}
      />
    </div>
  );
};

export default CarSearch;
