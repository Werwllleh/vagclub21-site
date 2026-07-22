import PartnerDetail from "@/components/partners/partner-detail";
import PartnersContent from "@/components/partners/partners-content";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {getPartnerInfo as getPartnerInfoCached} from "@/server/cms-data";

// кешируемый загрузчик возвращает JSON; оборачиваем в {data} для совместимости
const getPartnerInfo = async (slug) => {
  const data = await getPartnerInfoCached(slug).catch(() => null);
  return {data};
};

// известные слаги партнёров пререндерим статически, новые — по запросу
export async function generateStaticParams() {
  const partners = await import("@/server/cms-data")
    .then(m => m.getPartners({page: 1, limit: 100}))
    .catch(() => null);

  return (partners?.partners ?? []).filter(p => p?.slug).map(p => ({slug: p.slug}));
}

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
