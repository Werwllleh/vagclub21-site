import React from 'react';
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import PartnersContent from "@/components/pages/partners/partners-content";
import Container from "@/components/container";

export const metadata = {
  title: PUBLIC_PAGES.PARTNERS.SEO_TITLE,
  description: PUBLIC_PAGES.PARTNERS.SEO_DESCRIPTION,
};

const Page = () => {
  return (
    <div className="page ppt ppb">
      <Container>
        <PartnersContent />
      </Container>
    </div>
  );
};

export default Page;
