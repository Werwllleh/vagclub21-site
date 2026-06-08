import { useQuery } from '@tanstack/react-query';
import CmsService from "@/services/cms.service";

//dayjs plugins
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);


export function useMeet() {

  const { data, isLoading } = useQuery({
    queryKey: ['meet'],
    queryFn: () => CmsService.fetchMeeting(),
    staleTime: 60 * 60 * 1000,
    retry: 2,
  });

  return {
    isLoading,
    meet: data?.data?.meet ?? null,
    currentDate: data?.data?.meet && data?.data?.meet.date ? dayjs().isBefore(dayjs(data.data.meet.date, 'h').tz(data.data.meet?.date_tz, true)) : false,
  };
}
