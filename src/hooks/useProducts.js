import {useQuery} from "@tanstack/react-query";
import productsService from "@/services/products.service";

export function useProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsService.fetchProducts(),
  })

  return {
    isLoading,
    products: data?.data ? Object.values(data.data) : null,
  }
}
