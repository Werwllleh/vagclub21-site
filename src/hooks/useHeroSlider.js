import { useQuery } from '@tanstack/react-query';
import CmsService from "@/services/cms.service";

export function useHeroSlider() {

  const { data, isLoading } = useQuery({
    queryKey: ['hero_slider'],
    queryFn: () => CmsService.fetchHeroSlider(),
    retry: false,
  });

  return {
    isLoading,
    slider: data?.data?.slider ?? null,
  };
}
