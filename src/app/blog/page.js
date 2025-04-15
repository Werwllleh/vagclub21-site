import React from 'react';
import {PUBLIC_PAGES} from "@/config/pages/public.config";

export const metadata = {
  title: PUBLIC_PAGES.BLOG.SEO_TITLE,
  description: PUBLIC_PAGES.BLOG.SEO_DESCRIPTION,
};

const Page = () => {
  return (
    <div className="page">
      <div className="container">BLOG</div>
    </div>
  );
};

export default Page;
