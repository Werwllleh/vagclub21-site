import { useQuery } from '@tanstack/react-query';
import CmsService from "@/services/cms.service";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// ВАЖНО (cacheComponents): серверные данные НЕ передаём в useQuery через initialData —
// react-query вызывает Date.now(), что запрещено при пререндере. Вместо этого
// запрос отключается (enabled: false) и данные мержатся вручную.
export function useTechnicalWorkStatus(initialData = null) {
  const { data, isLoading } = useQuery({
    queryKey: ['technical_work'],
    queryFn: () => CmsService.fetchTechnicalWorkStatus(),
    retry: 1,
    staleTime: 60 * 1000,
    enabled: !initialData,
  });

  const status = data?.data?.status ?? initialData?.status ?? false;

  return {
    isLoading: initialData ? false : isLoading,
    status,
  };
}
