import {SEO_CONFIG} from "@/config/seo.config";
import ProfileContent from "@/components/profile/profile-content";
import {Suspense} from "react";
import Loading from "@/app/loading";

export const metadata = {
  title: SEO_CONFIG.PROFILE.SEO_TITLE,
  description: SEO_CONFIG.PROFILE.SEO_DESCRIPTION,
};

const Page = async ({searchParams}) => {

  const params = await searchParams;

  const selectedSection = params.section

  // console.log(params);

  return <Suspense fallback={<Loading />}>
    <ProfileContent activeSection={selectedSection ?? null} />
  </Suspense>
};

export default Page;
