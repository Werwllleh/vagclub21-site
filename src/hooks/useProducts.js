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

export function useProductsTypes() {
  const { data, isLoading } = useQuery({
    queryKey: ['products-types'],
    queryFn: () => productsService.fetchProductsTypes(),
  })

  return {
    isLoading,
    types: data?.data ? data.data : null,
  }
}
