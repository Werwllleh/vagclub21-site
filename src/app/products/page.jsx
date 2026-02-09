import {PUBLIC_PAGES} from "@/config/pages/public.config";
import ProductsPage from "@/components/pages/products";

export const metadata = {
  title: PUBLIC_PAGES.PRODUCTS.SEO_TITLE,
  description: PUBLIC_PAGES.PRODUCTS.SEO_DESCRIPTION,
};

const Page = () => {
  return (
    <div className="page ppt ppb">
      <ProductsPage />
    </div>
  );
};

export default Page;
