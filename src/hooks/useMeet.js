import { useQuery } from '@tanstack/react-query';
import CmsService from "@/services/cms.service";

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
  };
}
