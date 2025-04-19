import {useQuery} from "@tanstack/react-query";
import PartnersService from "@/services/partners.service";

export function usePartners(filter) {

  const { data, isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: async () => await PartnersService.fetchPartners(filter),
  });

  return {
    isLoading,
    partners: data?.data ? data.data : null,
  };
}
