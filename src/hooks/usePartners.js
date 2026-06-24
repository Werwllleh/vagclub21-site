import {useQuery} from "@tanstack/react-query";
import cmsService from "@/services/cms.service";

export function usePartners({ page = 1, limit = 20 } = {}) {

  const { data, isLoading } = useQuery({
    queryKey: ['partners', page, limit],
    queryFn: () => cmsService.fetchPartners({
      page,
      limit
    }),
    staleTime: 60 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });

  return {
    isLoading,
    partnerData: data?.data ? data.data : null,
  };
}

export function usePartnersLabels() {

  const { data, isLoading } = useQuery({
    queryKey: ['partners_lebels'],
    queryFn: () => cmsService.fetchPartnersLabels(),
    staleTime: 60 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });

  return {
    isLoading,
    partnerLabelsData: data?.data ? data.data : null,
  };
}
