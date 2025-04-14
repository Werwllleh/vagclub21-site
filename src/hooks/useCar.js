import { useQuery } from '@tanstack/react-query';
import CarService from "@/services/car.service";

export function useCar(carNumber) {

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

  const {
    data: carInfoData,
    isLoading: isCarInfoLoading,
    isError: isCarInfoError,
  } = useQuery({
    queryKey: ['car-info'],
    queryFn: async () => await CarService.fetchCarInfo(carNumber),
    enabled: !!carNumber,
  });

  return {
    cars: carsData?.data || null,
    carData: carInfoData?.data || null,
    carRegData: carsRegData?.data || null,
    isLoading: isCarsLoading || isCarInfoLoading || isCarsRegDataLoading,
    isError: isCarsError || isCarInfoError || isCarsRegDataError,
  };
}
