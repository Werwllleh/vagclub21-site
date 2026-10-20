import {PUBLIC_PAGES} from "@/config/pages/public.config";
import CarsContent from "@/components/cars/cars-content";
import JsonLd from "@/components/seo/json-ld";
import {generateBreadcrumbsJsonLd} from "@/lib/schema-org";

export const metadata = {
  title: PUBLIC_PAGES.CARS.SEO_TITLE,
  description: PUBLIC_PAGES.CARS.SEO_DESCRIPTION,
  alternates: { canonical: '/cars' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://vagclub21.ru/cars',
    siteName: 'VAGClub21',
    title: PUBLIC_PAGES.CARS.SEO_TITLE,
    description: PUBLIC_PAGES.CARS.SEO_DESCRIPTION,
    images: [{ url: '/images/og-main.jpg', width: 1200, height: 630, alt: 'Клубные авто VAGClub21' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: PUBLIC_PAGES.CARS.SEO_TITLE,
    description: PUBLIC_PAGES.CARS.SEO_DESCRIPTION,
    images: ['/images/og-main.jpg']
  }
};

// SSR по запросу: CarsContent использует useSearchParams (пагинация/поиск),
// а Suspense-обёртку убрали намеренно (React Fizz заменял контент фолбэком)
export const dynamic = 'force-dynamic';

const Page = async () => {
  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Клубные авто', url: '/cars' }
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbsJsonLd(breadcrumbs)} />
      <CarsContent/>
    </>
  );
};

export default Page;
