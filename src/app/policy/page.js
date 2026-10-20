import {PUBLIC_PAGES} from "@/config/pages/public.config";
import PolicyContent from "@/components/pages/_policy";
import {getPolicy} from "@/server/cms-data";
import JsonLd from "@/components/seo/json-ld";
import {generateBreadcrumbsJsonLd} from "@/lib/schema-org";

export const metadata = {
  title: PUBLIC_PAGES.POLICY.SEO_TITLE,
  description: PUBLIC_PAGES.POLICY.SEO_DESCRIPTION,
  alternates: { canonical: '/policy' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://vagclub21.ru/policy',
    siteName: 'VAGClub21',
    title: PUBLIC_PAGES.POLICY.SEO_TITLE,
    description: PUBLIC_PAGES.POLICY.SEO_DESCRIPTION,
    images: [{ url: '/images/og-main.jpg', width: 1200, height: 630, alt: 'Политика конфиденциальности VAGClub21' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: PUBLIC_PAGES.POLICY.SEO_TITLE,
    description: PUBLIC_PAGES.POLICY.SEO_DESCRIPTION,
    images: ['/images/og-main.jpg']
  }
};

const Page = async () => {
  const policy = await getPolicy().catch(() => null);

  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Политика конфиденциальности', url: '/policy' }
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbsJsonLd(breadcrumbs)} />
      <PolicyContent initialData={policy}/>
    </>
  );
};

export default Page;
