import { useQuery } from '@tanstack/react-query';
import CmsService from "@/services/cms.service";

export function useMeet() {

  const { data, isLoading } = useQuery({
    queryKey: ['meet'],
    queryFn: () => CmsService.fetchMeeting(),
    retry: false,
  });

  return {
    isLoading,
    meet: data?.data?.meet ?? null,
  };
}
