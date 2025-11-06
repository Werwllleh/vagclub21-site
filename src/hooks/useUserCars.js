import { useQuery } from '@tanstack/react-query';
import UserService from "@/services/user.service";

export function useUserCars() {

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user-cars'],
    queryFn: async () => await UserService.getUserCars(),
    retry: false,
  });

  return {
    userCars: data?.data || null,
    isLoading,
    isError,
  };
}
