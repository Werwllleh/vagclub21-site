import {PUBLIC_PAGES} from "@/config/pages/public.config";
import AboutContent from "@/components/pages/about/about-content";
import JsonLd from "@/components/seo/json-ld";
import {generateBreadcrumbsJsonLd} from "@/lib/schema-org";

export const metadata = {
  title: PUBLIC_PAGES.ABOUT.SEO_TITLE,
  description: PUBLIC_PAGES.ABOUT.SEO_DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://vagclub21.ru/about',
    siteName: 'VAGClub21',
    title: PUBLIC_PAGES.ABOUT.SEO_TITLE,
    description: PUBLIC_PAGES.ABOUT.SEO_DESCRIPTION,
    images: [{ url: '/images/og-main.jpg', width: 1200, height: 630, alt: 'О клубе VAGClub21' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: PUBLIC_PAGES.ABOUT.SEO_TITLE,
    description: PUBLIC_PAGES.ABOUT.SEO_DESCRIPTION,
    images: ['/images/og-main.jpg']
  }
};

const Page = async () => {
  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'О клубе', url: '/about' }
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbsJsonLd(breadcrumbs)} />
      <AboutContent/>
    </>
  );
};

export default Page;
