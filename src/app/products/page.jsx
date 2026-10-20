import {PUBLIC_PAGES} from "@/config/pages/public.config";
import ProductsPage from "@/components/pages/_products";
import {getProductsList} from "@/server/cms-data";
import JsonLd from "@/components/seo/json-ld";
import {generateBreadcrumbsJsonLd} from "@/lib/schema-org";

export const metadata = {
  title: PUBLIC_PAGES.PRODUCTS.SEO_TITLE,
  description: PUBLIC_PAGES.PRODUCTS.SEO_DESCRIPTION,
  alternates: { canonical: '/products' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://vagclub21.ru/products',
    siteName: 'VAGClub21',
    title: PUBLIC_PAGES.PRODUCTS.SEO_TITLE,
    description: PUBLIC_PAGES.PRODUCTS.SEO_DESCRIPTION,
    images: [{ url: '/images/og-main.jpg', width: 1200, height: 630, alt: 'Атрибутика VAGClub21' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: PUBLIC_PAGES.PRODUCTS.SEO_TITLE,
    description: PUBLIC_PAGES.PRODUCTS.SEO_DESCRIPTION,
    images: ['/images/og-main.jpg']
  }
};

const Page = async () => {
  const products = await getProductsList().catch(() => null);

  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Атрибутика', url: '/products' }
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbsJsonLd(breadcrumbs)} />
      <ProductsPage initialData={products} />
    </>
  );
};

export default Page;
