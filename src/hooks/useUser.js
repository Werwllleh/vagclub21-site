import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import UserService from '@/services/user.service';
import AuthTokenService from '@/services/auth-token.service';

export function useUser() {

  // Проверяем маркер сессии только на клиенте (js-cookie недоступен при SSR).
  // До проверки считаем состояние «загрузкой», чтобы UI не мигал и не падал.
  const [checked, setChecked] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const updateSession = () => {
      setEnabled(AuthTokenService.hasSession());
    };

    updateSession();
    setChecked(true);

    window.addEventListener('auth-session-change', updateSession);
    return () => {
      window.removeEventListener('auth-session-change', updateSession);
    };
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => UserService.fetchUser(),
    retry: false,
    enabled, // аноним (нет маркера) → запрос не уходит, никаких 401
  });

  return {
    // пока не проверили маркер — держим загрузку; аноним после проверки → false
    isLoading: !checked || (enabled && isLoading),
    user: enabled ? (data?.data?.user ?? null) : null,
  };
}
