import React from 'react';
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import Blog from "@/components/pages/_blog";

export const metadata = {
  title: PUBLIC_PAGES.BLOG.SEO_TITLE,
  description: PUBLIC_PAGES.BLOG.SEO_DESCRIPTION,
};

const Page = () => {
  return <Blog />;
};

export default Page;
