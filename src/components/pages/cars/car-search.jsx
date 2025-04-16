import React, {useCallback, useEffect, useState} from 'react';
import {Input} from "antd";
import {useSearchParams} from "next/navigation";
import CarService from "@/services/car.service";
import {useCarsStore} from "@/store/cars.store";
import {debounce} from "@/functions/debounce";

const CarSearch = () => {

  const {updateFilteredCars, updateLoading, loading} = useCarsStore()
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const number = searchParams.get('number');
    if (number) {
      setSearch(number);
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

      if (!!response.data.length) {
        updateLoading(false);
        updateFilteredCars(response.data);
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

  const debouncedSearchCars = useCallback(debounce(searchCars, 500), []);

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
      <div className="container">
        <Input
          allowClear={true}
          placeholder="Поиск авто по номеру"
          className="car-search_input"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
    </div>
  );
};

export default CarSearch;
