import { useQuery } from '@tanstack/react-query';
import CmsService from "@/services/cms.service";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// серверные данные не передаём в useQuery (Date.now() запрещён при пререндере,
// см. usePartners) — запрос отключён, данные мержатся вручную
export function usePolicy(initialData = null) {
  const { data, isLoading } = useQuery({
    queryKey: ['policy'],
    queryFn: () => CmsService.fetchPolicy(),
    staleTime: 60 * 60 * 1000,
    retry: 2,
    enabled: !initialData,
  });

  const policy = data?.data ?? initialData ?? null;

  return {
    isLoading: initialData ? false : isLoading,
    policy,
  };
}
