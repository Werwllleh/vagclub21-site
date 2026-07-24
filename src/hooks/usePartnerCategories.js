import {useQuery} from "@tanstack/react-query";
import CmsService from "@/services/cms.service";

// серверные данные не передаём в useQuery (Date.now() запрещён при пререндере,
// см. usePartners) — запрос отключён, данные мержатся вручную
export function usePartnerCategories(initialData = null) {

  const { data, isLoading } = useQuery({
    queryKey: ['partner_categories'],
    queryFn: async () => await CmsService.fetchPartnerCategories(),
    staleTime: 60 * 60 * 1000,
    enabled: !initialData,
  });

  const partnerCategories = data?.data?.categories ?? initialData?.categories ?? null;

  return {
    isLoading: initialData ? false : isLoading,
    partnerCategories,
  };
}
