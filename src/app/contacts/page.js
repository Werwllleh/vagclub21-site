import React from 'react';
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import ContactsContent from "@/components/pages/contacts/contacts-content";
import JsonLd from "@/components/seo/json-ld";
import {generateBreadcrumbsJsonLd} from "@/lib/schema-org";

export const metadata = {
  title: PUBLIC_PAGES.CONTACTS.SEO_TITLE,
  description: PUBLIC_PAGES.CONTACTS.SEO_DESCRIPTION,
  alternates: { canonical: '/contacts' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://vagclub21.ru/contacts',
    siteName: 'VAGClub21',
    title: PUBLIC_PAGES.CONTACTS.SEO_TITLE,
    description: PUBLIC_PAGES.CONTACTS.SEO_DESCRIPTION,
    images: [{ url: '/images/og-main.jpg', width: 1200, height: 630, alt: 'Контакты VAGClub21' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: PUBLIC_PAGES.CONTACTS.SEO_TITLE,
    description: PUBLIC_PAGES.CONTACTS.SEO_DESCRIPTION,
    images: ['/images/og-main.jpg']
  }
};

const Page = () => {
  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Контакты', url: '/contacts' }
  ];

  return (
    <div className="page">
      <JsonLd data={generateBreadcrumbsJsonLd(breadcrumbs)} />
      <ContactsContent />
    </div>
  );
};

export default Page;
