import { useQuery } from '@tanstack/react-query';
import CarService from "@/services/car.service";

export function useCarInfo(carId) {

  const {
    data: carInfoData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['car-info', carId],
    queryFn: async () => await CarService.fetchCarInfo(carId),
    staleTime: 60 * 60 * 1000,
    enabled: !!carId
  });

  return {
    carData: carInfoData?.data || null,
    isLoading,
    isError,
  };
}
