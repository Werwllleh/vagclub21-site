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
    enabled: !!carId
  });

  return {
    carData: carInfoData?.data || null,
    isLoading,
    isError,
  };
}
