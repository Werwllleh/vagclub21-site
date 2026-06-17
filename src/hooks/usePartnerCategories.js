import {useQuery} from "@tanstack/react-query";
import CmsService from "@/services/cms.service";

export function usePartnerCategories() {

  const { data, isLoading } = useQuery({
    queryKey: ['partner_categories'],
    queryFn: async () => await CmsService.fetchPartnerCategories(),
  });

  return {
    isLoading,
    partnerCategories: data?.data?.categories ? data.data.categories : null,
  };
}
