import {useQuery} from "@tanstack/react-query";
import cmsService from "@/services/cms.service";

// серверные данные не передаём в useQuery через initialData — react-query вызывает
// Date.now(), что запрещено при пререндере (cacheComponents). Запрос отключается,
// данные мержатся вручную.
export function usePartners({ page = 1, limit = 20, initialData = null, initialPage = 1 } = {}) {

  const hasServerData = !!initialData && page === initialPage;

  const { data, isLoading } = useQuery({
    queryKey: ['partners', page, limit],
    queryFn: () => cmsService.fetchPartners({
      page,
      limit
    }),
    staleTime: 60 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    enabled: !hasServerData,
  });

  const partnerData = data?.data ?? (hasServerData ? initialData : null);

  return {
    isLoading: hasServerData ? false : isLoading,
    partnerData,
  };
}

export function usePartnersLabels(initialData = null) {

  const { data, isLoading } = useQuery({
    queryKey: ['partners_lebels'],
    queryFn: () => cmsService.fetchPartnersLabels(),
    staleTime: 60 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    enabled: !initialData,
  });

  const partnerLabelsData = data?.data ?? initialData ?? null;

  return {
    isLoading: initialData ? false : isLoading,
    partnerLabelsData,
  };
}
