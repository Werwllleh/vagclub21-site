import _profile from "@/components/pages/_profile";
import {SEO_CONFIG} from "@/config/seo.config";

export const metadata = {
  title: SEO_CONFIG.PROFILE.SEO_TITLE,
  description: SEO_CONFIG.PROFILE.SEO_DESCRIPTION,
};

const Page = () => {
  return <div className="page ppt ppb">
    <_profile />
  </div>
};

export default Page;
