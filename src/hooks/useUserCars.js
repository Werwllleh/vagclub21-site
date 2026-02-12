import { useQuery, keepPreviousData } from '@tanstack/react-query';
import UserService from "@/services/user.service";

/*export function useUserCars() {

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user-cars'],
    queryFn: async () => await UserService.getUserCars(),
  });

  return {
    userCars: data?.data || null,
    isLoading,
    isError,
  };
}*/

export function useUserCars({ page = 1, limit = 20, number } = {}) {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user-cars', page, limit, number],
    queryFn: () =>
      UserService.getUserCars({
        page,
        limit,
        number,
      }),
    staleTime: 1000 * 60 * 5,
    // placeholderData: keepPreviousData,
    keepPreviousData: true,
  });

  return {
    userCars: data?.data ?? [],
    total: data?.total ?? 0,
    pages: data?.pages ?? 1,
    page,
    limit,
    isLoading,
    isError,
  };
}
