import {PUBLIC_PAGES} from "@/config/pages/public.config";
import Meet from "@/components/pages/_meet";
import {getMeet} from "@/server/cms-data";

export const metadata = {
  title: PUBLIC_PAGES.MEET.SEO_TITLE,
  description: PUBLIC_PAGES.MEET.SEO_DESCRIPTION,
};

// данные о встрече должны быть всегда актуальны — без кеша, рендер по запросу
export const dynamic = 'force-dynamic';

const Page = async () => {

  const data = await getMeet(0).catch(() => null);

  return <Meet meetData={data}/>;
};

export default Page;
