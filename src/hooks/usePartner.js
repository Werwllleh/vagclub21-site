import {useQuery} from "@tanstack/react-query";
import PartnersService from "@/services/partners.service";

// серверные данные не передаём в useQuery (Date.now() запрещён при пререндере,
// см. usePartners) — запрос отключён, данные мержатся вручную
export function usePartner(slug, initialData = null) {

  const { data, isLoading } = useQuery({
    // slug в ключе — иначе при переходе между партнёрами показываются данные предыдущего
    queryKey: ['partner', slug],
    queryFn: async () => await PartnersService.fetchPartnerInfo(slug),
    staleTime: 10 * 60 * 1000,
    enabled: !initialData,
  });

  const partner = data?.data ?? initialData ?? null;

  return {
    isLoading: initialData ? false : isLoading,
    partner,
  };
}
