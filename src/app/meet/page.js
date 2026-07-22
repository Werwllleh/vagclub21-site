import {PUBLIC_PAGES} from "@/config/pages/public.config";
import Meet from "@/components/pages/_meet";
import {getMeet} from "@/server/cms-data";

export const metadata = {
  title: PUBLIC_PAGES.MEET.SEO_TITLE,
  description: PUBLIC_PAGES.MEET.SEO_DESCRIPTION,
};

const Page = async () => {

  const data = await getMeet().catch(() => null);

  return <Meet meetData={data}/>;
};

export default Page;
