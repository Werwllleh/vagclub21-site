import {useQuery} from "@tanstack/react-query";
import productsService from "@/services/cms.service";

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

export function useProduct(slug) {
  const { data, isLoading } = useQuery({
    queryKey: ['product'],
    queryFn: () => productsService.fetchProduct(slug),
  })

  return {
    isLoading,
    product: data?.data ? data.data : null,
  }
}

export function useProductsTypes(type) {
  const { data, isLoading } = useQuery({
    queryKey: ['products-type'],
    queryFn: () => productsService.fetchProductsTypes(type),
    retry: false,
  })

  return {
    isLoading,
    data: {
      type: data?.data?.type,
      items: data?.data?.docs,
      total: data?.data?.total
    },
  }
}
