import {SEO_CONFIG} from "@/config/seo.config";
import ProfileContent from "@/components/profile/profile-content";
import {Suspense} from "react";
import Loading from "@/components/loading";

export const metadata = {
  title: 'Личный кабинет',
  description: 'Профиль участника автомобильного сообщества VAGClub21',
  robots: { index: false, follow: false },
};

const Page = async ({searchParams}) => {

  const params = await searchParams;

  const selectedSection = params.section

  return <Suspense fallback={<Loading />}>
    <ProfileContent activeSection={selectedSection ?? null} />
  </Suspense>
};

export default Page;
