import { useQuery } from '@tanstack/react-query';
import CmsService from "@/services/cms.service";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// серверные данные не передаём в useQuery (Date.now() запрещён при пререндере,
// см. useTechnicalWorkStatus) — запрос отключён, данные мержатся вручную
export function useMeet(initialData) {
  const { data, isLoading } = useQuery({
    queryKey: ['meet'],
    queryFn: () => CmsService.fetchMeeting(),
    staleTime: 60 * 60 * 1000,
    retry: 2,
    enabled: !initialData?.data?.meet,
  });

  const meetData = data?.data?.meet ?? initialData?.data?.meet ?? null;

  return {
    isLoading: initialData?.data?.meet ? false : isLoading,
    meet: meetData,
    meetDate: meetData?.date || null,
    meetTimezone: meetData?.date_tz || 'UTC'
  };
}
