import { useQuery } from '@tanstack/react-query';
import UserService from '@/services/user.service';

export function useUser() {

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => UserService.fetchUser(),
    retry: false,
  });

  return {
    isLoading,
    user: data?.data?.user ?? null,
  };
}
