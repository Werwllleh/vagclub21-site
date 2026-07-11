import PartnerDetail from "@/components/partners/partner-detail";
import PartnersContent from "@/components/partners/partners-content";
import CmsService from "@/services/cms.service";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {cache} from "react";

const getPartnerInfo = cache(async (slug) => {
  return await CmsService.fetchPartnerInfo(slug);
});

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (!slug) {
    return {
      title: PUBLIC_PAGES.PARTNERS.SEO_TITLE,
      description: PUBLIC_PAGES.PARTNERS.SEO_DESCRIPTION,
    };
  }

  const {data} = await getPartnerInfo(slug);

  return {
    title: data?.seo?.title || 'Информация о партнере',
    description: data?.seo?.description || `Подробнее о партнере ${slug}`,
    openGraph: {
      title: data?.seo?.title || 'Информация о партнере',
      description: data?.seo?.description || `Подробнее о партнере ${slug}`,
      images: data?.logo?.url ? [data.logo.url] : [],
    },
  };
}

const Page = async ({params}) => {

  const {slug} = await params;

  if (!slug) return <PartnersContent />;

  const {data} = await getPartnerInfo(slug);

  return <PartnerDetail partnerData={data} />;
};

export default Page;
