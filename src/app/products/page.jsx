import Products from "@/app/products/products";
import {PUBLIC_PAGES} from "@/config/pages/public.config";

export const metadata = {
  title: PUBLIC_PAGES.PRODUCTS.SEO_TITLE,
  description: PUBLIC_PAGES.PRODUCTS.SEO_DESCRIPTION,
};

const Page = () => {
  return (
    <div className="page">
      <Products />
    </div>
  );
};

export default Page;
