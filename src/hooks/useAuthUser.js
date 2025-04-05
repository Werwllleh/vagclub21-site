import {axiosClassic} from "@/api/axios";
import { useQuery } from '@tanstack/react-query';
import AuthTokenService from '@/services/auth-token.service';

export function useAuthUser() {
  const token = AuthTokenService.getAccessToken();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      if (!token) {
        throw new Error('No token found');
      }

      try {
        const response = await axiosClassic.post('/validate-user', {
          data: JSON.parse(token),
        });

        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const errorData = error.response.data;

          if (errorData.error === 'Authorization data expired') {
            // Запускаем процесс обновления данных
            await refreshAuthData();
            // Повторяем запрос после обновления
            return refetch();
          }
        }

        throw new Error(error.response?.data?.error || 'Failed to validate user');
      }
    },
    enabled: !!token,
  });

  return {
    isLoading,
    user: data ? data : null,
  };
}

async function refreshAuthData() {
  AuthTokenService.removeAccessToken();

  const loginButton = document.createElement('div');
  document.body.appendChild(loginButton);

  const authData = await new Promise((resolve) => {
    const button = new LoginButton({
      botUsername: process.env.NEXT_PUBLIC_BOT_USERNAME,
      onAuthCallback: (data) => resolve(data),
      lang: 'ru',
    });
    button.mount(loginButton);
  });


  document.body.removeChild(loginButton);

  AuthTokenService.saveAccessToken(JSON.stringify(authData));
}
