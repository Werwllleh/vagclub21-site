import {useQuery} from "@tanstack/react-query";
import PartnersService from "@/services/partners.service";

export function usePartner(slug) {

  const { data, isLoading } = useQuery({
    queryKey: ['partner'],
    queryFn: async () => await PartnersService.fetchPartnerInfo(slug),
  });

  return {
    isLoading,
    partner: data?.data ? data.data : null,
  };
}
