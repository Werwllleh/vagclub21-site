import { useQuery } from '@tanstack/react-query';
import CmsService from "@/services/cms.service";

// серверные данные не передаём в useQuery (Date.now() запрещён при пререндере,
// см. usePartners) — запрос отключён, данные мержатся вручную
export function useHeroSlider(initialData = null) {

  const { data, isLoading } = useQuery({
    queryKey: ['hero_slider'],
    queryFn: () => CmsService.fetchHeroSlider(),
    retry: 2,
    staleTime: 10 * 60 * 1000,
    enabled: !initialData,
  });

  const slider = data?.data?.slider ?? initialData?.slider ?? null;

  return {
    isLoading: initialData ? false : isLoading,
    slider,
  };
}
