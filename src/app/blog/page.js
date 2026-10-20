import React from 'react';
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import Blog from "@/components/pages/_blog";
import JsonLd from "@/components/seo/json-ld";
import {generateBreadcrumbsJsonLd} from "@/lib/schema-org";

export const metadata = {
  title: PUBLIC_PAGES.BLOG.SEO_TITLE,
  description: PUBLIC_PAGES.BLOG.SEO_DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://vagclub21.ru/blog',
    siteName: 'VAGClub21',
    title: PUBLIC_PAGES.BLOG.SEO_TITLE,
    description: PUBLIC_PAGES.BLOG.SEO_DESCRIPTION,
    images: [{ url: '/images/og-main.jpg', width: 1200, height: 630, alt: 'Блог VAGClub21' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: PUBLIC_PAGES.BLOG.SEO_TITLE,
    description: PUBLIC_PAGES.BLOG.SEO_DESCRIPTION,
    images: ['/images/og-main.jpg']
  }
};

const Page = () => {
  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Блог', url: '/blog' }
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbsJsonLd(breadcrumbs)} />
      <Blog />
    </>
  );
};

export default Page;
