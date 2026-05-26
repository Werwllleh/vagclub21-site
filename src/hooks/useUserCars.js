import { useQuery, keepPreviousData } from '@tanstack/react-query';
import UserService from "@/services/user.service";

export function useUserCars({ page = 1, limit = 20, number } = {}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user-cars', page, limit, number],
    queryFn: () =>
        UserService.getUserCars({
          page,
          limit,
          number,
        }),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });

  return {
    userCars: data,
    isLoading,
    isError,
  };
}