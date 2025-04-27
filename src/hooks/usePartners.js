import {useQuery} from "@tanstack/react-query";
import PartnersService from "@/services/partners.service";

export function usePartners() {

  const { data, isLoading: partnersLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: async () => await PartnersService.fetchPartners(),
  });

  const { data: partnersCategories, isLoading: partnersCategoriesLoading } = useQuery({
    queryKey: ['partners-categories'],
    queryFn: async () => await PartnersService.fetchPartnersCategories(),
  });

  return {
    isLoading: partnersLoading || partnersCategoriesLoading,
    partners: data?.data ? data.data : null,
    categories: partnersCategories?.data ? partnersCategories.data : null,
  };
}
