import {PUBLIC_PAGES} from "@/config/pages/public.config";
import Meet from "@/components/pages/_meet";

export const metadata = {
  title: PUBLIC_PAGES.MEET.SEO_TITLE,
  description: PUBLIC_PAGES.MEET.SEO_DESCRIPTION,
};

const Page = () => {
  return <Meet/>;
};

export default Page;
