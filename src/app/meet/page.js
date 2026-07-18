import {PUBLIC_PAGES} from "@/config/pages/public.config";
import Meet from "@/components/pages/_meet";
import {cache} from "react";
import CmsService from "@/services/cms.service";

export const metadata = {
  title: PUBLIC_PAGES.MEET.SEO_TITLE,
  description: PUBLIC_PAGES.MEET.SEO_DESCRIPTION,
};

const getMeetInfo = cache(async ()  => {
  return await CmsService.fetchMeeting();
})

const Page = async () => {

  const {data} = await getMeetInfo()

  return <Meet meetData={data}/>;
};

export default Page;
