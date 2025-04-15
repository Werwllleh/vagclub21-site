import { useQuery } from '@tanstack/react-query';
import UserService from '@/services/user.service';

export function useUser() {

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await UserService.fetchUser(),
  });

  return {
    isLoading,
    user: data?.data?.user ? data?.data?.user : null,
  };
}
