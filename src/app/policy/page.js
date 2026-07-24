import {PUBLIC_PAGES} from "@/config/pages/public.config";
import PolicyContent from "@/components/pages/_policy";
import {getPolicy} from "@/server/cms-data";

export const metadata = {
  title: PUBLIC_PAGES.POLICY.SEO_TITLE,
  description: PUBLIC_PAGES.POLICY.SEO_DESCRIPTION,
};

const Page = async () => {
  const policy = await getPolicy().catch(() => null);

  return <PolicyContent initialData={policy}/>;
};

export default Page;
