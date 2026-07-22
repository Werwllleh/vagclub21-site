import {PUBLIC_PAGES} from "@/config/pages/public.config";
import ProductsPage from "@/components/pages/_products";
import {getProductsList} from "@/server/cms-data";

export const metadata = {
  title: PUBLIC_PAGES.PRODUCTS.SEO_TITLE,
  description: PUBLIC_PAGES.PRODUCTS.SEO_DESCRIPTION,
};

const Page = async () => {
  const products = await getProductsList().catch(() => null);

  return <ProductsPage initialData={products} />;
};

export default Page;
