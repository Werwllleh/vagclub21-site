import { useQuery } from '@tanstack/react-query';
import CarService from "@/services/car.service";

export function useRegisterCars() {

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['register-cars'],
    queryFn: async () => await CarService.getRegisterCars(),
  });

  return {
    brands: data?.data?.brands || null,
    models: data?.data?.models || null,
    isLoading,
    isError,
  };
}
