import PartnerDetail from "@/components/partners/partner-detail";
import PartnersContent from "@/components/partners/partners-content";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {getPartnerInfo as getPartnerInfoCached} from "@/server/cms-data";
import JsonLd from "@/components/seo/json-ld";
import {generatePartnerJsonLd, generateBreadcrumbsJsonLd} from "@/lib/schema-org";

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
  if (!data?.title) return {};

  const discountText = data.discount ? ` (клубная скидка до ${data.discount}%)` : '';
  const title = `${data.title}${discountText} — партнер автоклуба в Чебоксарах`;
  const description = data.seo?.description || `${data.title} — официальный партнер автоклуба VAGClub21 в Чебоксарах: ${data.description?.slice(0, 100) || 'автосервис, обслуживание VAG'}. Скидки для одноклубников.`;
  const imageUrl = data.logo?.url || data.gallery?.[0]?.url || 'https://vagclub21.ru/images/og-main.jpg';

  return {
    title,
    description,
    alternates: { canonical: `/partner/${slug}` },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: `https://vagclub21.ru/partner/${slug}`,
      siteName: 'VAGClub21',
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: data.title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  };
}

const Page = async ({params}) => {
  const {slug} = await params;

  if (!slug) return <PartnersContent />;

  const {data} = await getPartnerInfo(slug);

  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Партнеры', url: '/partners' },
    { name: data?.title || 'Партнер', url: `/partner/${slug}` }
  ];

  return (
    <>
      <JsonLd data={generatePartnerJsonLd(data, slug)} />
      <JsonLd data={generateBreadcrumbsJsonLd(breadcrumbs)} />
      <PartnerDetail partnerData={data} />
    </>
  );
};

export default Page;
