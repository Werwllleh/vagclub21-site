import { useQuery } from '@tanstack/react-query';
import CarService from "@/services/car.service";

export function useCarInfo(carNumber) {

  const {
    data: carInfoData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['car-info', carNumber],
    queryFn: async () => await CarService.fetchCarInfo(carNumber),
    enabled: !!carNumber,
  });

  return {
    carData: carInfoData?.data || null,
    isLoading,
    isError,
  };
}
