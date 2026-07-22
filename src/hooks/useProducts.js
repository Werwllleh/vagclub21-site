import {useQuery, useQueryClient} from "@tanstack/react-query";
import productsService from "@/services/cms.service";

/*export function useProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsService.fetchProducts(),
  })

  return {
    isLoading,
    data: {
      items: data?.data?.docs,
      total: data?.data?.total
    },
  }
}

export function useProduct(slug) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => productsService.fetchProduct(slug),
    /!*placeholderData: () => {
      const productList = queryClient.getQueryData(["products"] || ["products-type"]);
      const foundProduct = productList?.find((product) => product.slug === slug);
      return foundProduct;
    }*!/
  })

  return {
    isLoading,
    product: data?.data ? data.data : null,
  }
}

export function useProductsTypes(type) {
  const { data, isLoading } = useQuery({
    queryKey: ['products-type', type],
    queryFn: () => productsService.fetchProductsTypes(type),
    staleTime: 1000 * 60 * 5,
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
}*/

const keys = {
  productsAll: ["products"],
  productsList: () => ["products", "list"],
  productsType: (type) => ["products", "type", type],
  product: (slug) => ["product", slug],
};

const primeProducts = (queryClient, docs) => {
  if (!Array.isArray(docs)) return;

  for (const p of docs) {
    if (p?.slug) {
      // кладём в кэш в формате axios response: { data: product }
      queryClient.setQueryData(keys.product(p.slug), { data: p });
    }
  }
};

// серверные данные не передаём в useQuery через initialData — react-query вызывает
// Date.now(), что запрещено при пререндере (cacheComponents). Запрос отключается,
// данные мержатся вручную.
export function useProducts(initialData = null) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: keys.productsList(),
    queryFn: () => productsService.fetchProducts(),
    staleTime: 1000 * 60 * 5,
    enabled: !initialData,
    onSuccess: (res) => {
      // твой ответ: { docs: [...], total: n }
      primeProducts(queryClient, res?.data?.docs);
    },
  });

  const merged = data?.data ?? initialData ?? null;

  return {
    isLoading: initialData ? false : isLoading,
    data: {
      products: merged?.docs ?? [],
      total: merged?.total ?? 0,
    }
  };
}

export function useProductsTypes(type, initialData = null) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: keys.productsType(type),
    queryFn: () => productsService.fetchProductsTypes(type),
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !initialData,
    onSuccess: (res) => {
      // твой ответ: { type, docs: [...], total }
      primeProducts(queryClient, res?.data?.docs);
    },
  });

  const merged = data?.data ?? initialData ?? null;

  return {
    isLoading: initialData ? false : isLoading,
    data: {
      type: merged?.type,
      items: merged?.docs ?? [],
      total: merged?.total ?? 0,
    },
  };
}

export function useProduct(slug, serverData = null) {
  const queryClient = useQueryClient();

  const cached = queryClient.getQueryData(keys.product(slug))
    ?? (serverData ? { data: serverData } : undefined);

  const { data, isLoading } = useQuery({
    queryKey: keys.product(slug),
    queryFn: () => productsService.fetchProduct(slug),

    // если есть кэш или серверные данные — запрос не делаем
    // (в useQuery их не передаём: Date.now() запрещён при пререндере)
    enabled: !!slug && !cached,

    staleTime: 1000 * 60 * 5,
  });

  return {
    isLoading: !cached && isLoading,
    product: data?.data ?? cached?.data ?? null,
  };
}
