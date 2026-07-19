import {PUBLIC_PAGES} from "@/config/pages/public.config";
import PolicyContent from "@/components/pages/_policy";

export const metadata = {
  title: PUBLIC_PAGES.POLICY.SEO_TITLE,
  description: PUBLIC_PAGES.POLICY.SEO_DESCRIPTION,
};

const Page = async () => {
  return <PolicyContent/>;
};

export default Page;
