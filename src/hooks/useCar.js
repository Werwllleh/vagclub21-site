import { useQuery } from '@tanstack/react-query';
import CarService from "@/services/car.service";

export function useCar(carNumber) {

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
    isLoading: isCarsLoading || isCarInfoLoading,
    isError: isCarsError || isCarInfoError,
  };
}
