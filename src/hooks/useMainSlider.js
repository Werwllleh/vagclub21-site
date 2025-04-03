import {useQuery} from "@tanstack/react-query";
import mainSliderService from "@/services/mainSlider.service";


export function useMainSlider() {
  const { data, isLoading } = useQuery({
    queryKey: ['slides'],
    queryFn: () => mainSliderService.fetchSlides(),
  })

  return {
    isLoading,
    slides: data?.data ? Object.values(data.data) : null,
  }
}