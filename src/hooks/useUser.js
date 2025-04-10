import { useQuery } from '@tanstack/react-query';
import UserService from '@/services/user.service';
import AuthTokenService from '@/services/auth-token.service';

export function useUser() {

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => UserService.fetchUser(),
  });

  return {
    isLoading,
    user: data?.data?.user ? data?.data?.user : null,
  };
}
