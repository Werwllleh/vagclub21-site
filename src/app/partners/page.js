import {PUBLIC_PAGES} from "@/config/pages/public.config";
import PartnersContent from "@/components/partners/partners-content";
import {getPartners, getPartnerCategories} from "@/server/cms-data";
import JsonLd from "@/components/seo/json-ld";
import {generateBreadcrumbsJsonLd} from "@/lib/schema-org";

const SHOW_DATA_PARTNERS_LIMIT = 8;

export const metadata = {
  title: PUBLIC_PAGES.PARTNERS.SEO_TITLE,
  description: PUBLIC_PAGES.PARTNERS.SEO_DESCRIPTION,
  alternates: { canonical: '/partners' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://vagclub21.ru/partners',
    siteName: 'VAGClub21',
    title: PUBLIC_PAGES.PARTNERS.SEO_TITLE,
    description: PUBLIC_PAGES.PARTNERS.SEO_DESCRIPTION,
    images: [{ url: '/images/og-main.jpg', width: 1200, height: 630, alt: 'Партнеры VAGClub21' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: PUBLIC_PAGES.PARTNERS.SEO_TITLE,
    description: PUBLIC_PAGES.PARTNERS.SEO_DESCRIPTION,
    images: ['/images/og-main.jpg']
  }
};

// Страница динамическая (пагинация через searchParams), но данные берутся
// из fetch-кеша (revalidate 10 мин) — SSR быстрый.
// ВАЖНО: без Suspense-обёртки — React Fizz в проде заменяет большие поддеревья
// фолбэком, и в HTML попадает только лоадер (см. коммит этой правки)
const Page = async ({searchParams}) => {
  const params = await searchParams;
  const rawPage = Number(params?.page ?? 1);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const [partners, categories] = await Promise.all([
    getPartners({page, limit: SHOW_DATA_PARTNERS_LIMIT}).catch(() => null),
    getPartnerCategories().catch(() => null),
  ]);

  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Партнеры', url: '/partners' }
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbsJsonLd(breadcrumbs)} />
      <PartnersContent
        initialPartners={partners}
        initialPage={page}
        initialCategories={categories}
      />
    </>
  );
};

export default Page;
