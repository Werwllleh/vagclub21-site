import {PUBLIC_PAGES} from "@/config/pages/public.config";
import PartnersContent from "@/components/partners/partners-content";
import {Suspense} from "react";
import Loading from "@/app/loading";

export const metadata = {
  title: PUBLIC_PAGES.PARTNERS.SEO_TITLE,
  description: PUBLIC_PAGES.PARTNERS.SEO_DESCRIPTION,
};

const Page = () => {
  return <Suspense fallback={<Loading/>}>
    <PartnersContent />
  </Suspense>;
};

export default Page;
