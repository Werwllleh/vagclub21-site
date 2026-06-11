import { useQuery } from '@tanstack/react-query';
import CmsService from "@/services/cms.service";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function useTechnicalWorkStatus() {
  const { data, isLoading } = useQuery({
    queryKey: ['technical_work'],
    queryFn: () => CmsService.fetchTechnicalWorkStatus(),
    retry: 2,
  });

  return {
    isLoading,
    status: data?.data?.status || false,
  };
}
