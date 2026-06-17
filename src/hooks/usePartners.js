import {useQuery} from "@tanstack/react-query";
import cmsService from "@/services/cms.service";

export function usePartners({ page = 1, limit = 20, number } = {}) {

  const { data, isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: () => cmsService.fetchPartners({
      page,
      limit,
      number,
    }),
    staleTime: 60 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });

  return {
    isLoading,
    partnerData: data?.data ? data.data : null,
  };
}
