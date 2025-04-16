import { useQuery } from '@tanstack/react-query';
import CarService from "@/services/car.service";

export function useCar() {

  const {
    data: carsRegData,
    isLoading: isCarsRegDataLoading,
    isError: isCarsRegDataError,
  } = useQuery({
    queryKey: ['cars-reg-data'],
    queryFn: async () => await CarService.fetchCarsAndModels(),
  });

  const {
    data: carsData,
    isLoading: isCarsLoading,
    isError: isCarsError,
  } = useQuery({
    queryKey: ['cars'],
    queryFn: async () => await CarService.fetchUsersCars(),
  });

  return {
    cars: carsData?.data || null,
    carRegData: carsRegData?.data || null,
    isLoading: isCarsLoading || isCarsRegDataLoading,
    isError: isCarsError || isCarsRegDataError,
  };
}
