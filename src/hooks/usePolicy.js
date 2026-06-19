import { useQuery } from '@tanstack/react-query';
import CmsService from "@/services/cms.service";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function usePolicy() {
  const { data, isLoading } = useQuery({
    queryKey: ['policy'],
    queryFn: () => CmsService.fetchPolicy(),
    staleTime: 60 * 60 * 1000,
    retry: 2,
  });

  return {
    isLoading,
    policy: data?.data ? data.data : null
  };
}
