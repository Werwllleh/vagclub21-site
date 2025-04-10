import ProfileLayout from "@/app/profile/profile-layout";
import {SEO_CONFIG} from "@/config/seo.config";
import {Suspense} from "react";

export const metadata = {
  title: SEO_CONFIG.PROFILE.SEO_TITLE,
  description: SEO_CONFIG.PROFILE.SEO_DESCRIPTION,
};

const Page = () => {

  return (
    <div className="page">
      <ProfileLayout />
    </div>);
};

export default Page;
