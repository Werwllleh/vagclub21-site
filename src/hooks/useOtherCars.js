import { useQuery } from '@tanstack/react-query';
import CarService from "@/services/car.service";

export function useOtherCars(count) {

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['other-cars'],
    queryFn: async () => await CarService.fetchOtherCars(count),
  });

  return {
    otherCarsData: data?.data || [],
    isLoading,
    isError,
  };
}
