import {SEO_CONFIG} from "@/config/seo.config";
import Profile from "@/components/pages/_profile";

export const metadata = {
  title: SEO_CONFIG.PROFILE.SEO_TITLE,
  description: SEO_CONFIG.PROFILE.SEO_DESCRIPTION,
};

const Page = () => {
  return <Profile />
};

export default Page;
