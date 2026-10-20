import {PUBLIC_PAGES} from "@/config/pages/public.config";
import Meet from "@/components/pages/_meet";
import {getMeet} from "@/server/cms-data";
import JsonLd from "@/components/seo/json-ld";
import {generateMeetJsonLd, generateBreadcrumbsJsonLd} from "@/lib/schema-org";

export const metadata = {
  title: PUBLIC_PAGES.MEET.SEO_TITLE,
  description: PUBLIC_PAGES.MEET.SEO_DESCRIPTION,
  alternates: { canonical: '/meet' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://vagclub21.ru/meet',
    siteName: 'VAGClub21',
    title: PUBLIC_PAGES.MEET.SEO_TITLE,
    description: PUBLIC_PAGES.MEET.SEO_DESCRIPTION,
    images: [{ url: '/images/og-main.jpg', width: 1200, height: 630, alt: 'Встречи VAGClub21' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: PUBLIC_PAGES.MEET.SEO_TITLE,
    description: PUBLIC_PAGES.MEET.SEO_DESCRIPTION,
    images: ['/images/og-main.jpg']
  }
};

// данные о встрече должны быть всегда актуальны — без кеша, рендер по запросу
export const dynamic = 'force-dynamic';

const Page = async () => {

  const data = await getMeet(0).catch(() => null);

  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Встречи клуба', url: '/meet' }
  ];

  return (
    <>
      <JsonLd data={generateMeetJsonLd(data)} />
      <JsonLd data={generateBreadcrumbsJsonLd(breadcrumbs)} />
      <Meet meetData={data}/>
    </>
  );
};

export default Page;
