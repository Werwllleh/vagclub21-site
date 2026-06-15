import {useQuery} from "@tanstack/react-query";
import cmsService from "@/services/cms.service";

export function usePartners() {

  const { data, isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: () => cmsService.fetchPartners(),
    staleTime: 60 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });

  return {
    isLoading,
    partners: data?.data ? data.data : null,
  };
}
