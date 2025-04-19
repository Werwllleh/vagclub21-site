import React from 'react';
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import PartnersContent from "@/components/pages/partners/partners-content";

export const metadata = {
  title: PUBLIC_PAGES.PARTNERS.SEO_TITLE,
  description: PUBLIC_PAGES.PARTNERS.SEO_DESCRIPTION,
};

const Page = () => {
  return (
    <div className="page">
      <PartnersContent />
    </div>
  );
};

export default Page;
