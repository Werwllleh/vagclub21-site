import React from 'react';
import {PUBLIC_PAGES} from "@/config/pages/public.config";

export const metadata = {
  title: PUBLIC_PAGES.PARTNERS.SEO_TITLE,
  description: PUBLIC_PAGES.PARTNERS.SEO_DESCRIPTION,
};

const Page = () => {
  return (
    <div className="page">
      <div className="container">PARTNERS</div>
    </div>
  );
};

export default Page;
