import CarDetail from "@/components/cars/car-detail";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import CarsContent from "@/components/cars/cars-content";
import {getCarInfo as getCarInfoCached, getCarsList} from "@/server/cms-data";
import JsonLd from "@/components/seo/json-ld";
import {generateCarJsonLd, generateBreadcrumbsJsonLd} from "@/lib/schema-org";

// кешируемый загрузчик (cacheComponents требует кешированных данных в generateMetadata)
const getCarInfo = async (slug) => {
  const carId = decodeURIComponent(slug.split('_')[1]);

  if (!carId) {
    return {data: null};
  }

  const data = await getCarInfoCached(carId).catch(() => null);
  return {data};
};

// ISR: страница обновляется не позже чем через 10 минут
export const revalidate = 600;

// пререндерим известные авто (формат слага как в car-card: первые буквы марки/модели + id),
// новые появляются по запросу
export async function generateStaticParams() {
  const cars = await getCarsList().catch(() => null);

  return (cars?.data ?? [])
    .filter(car => car?.id)
    .map(car => ({slug: `${car.brand?.substring(0, 1) ?? ''}${car.model?.substring(0, 1) ?? ''}_${car.id}`}));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (!slug) {
    return {
      title: PUBLIC_PAGES.CARS.SEO_TITLE,
      description: PUBLIC_PAGES.CARS.SEO_DESCRIPTION,
    };
  }

  const {data} = await getCarInfo(slug);
  if (!data?.brand || !data?.model) {
    return {
      title: PUBLIC_PAGES.CARS.SEO_TITLE,
      description: PUBLIC_PAGES.CARS.SEO_DESCRIPTION,
    };
  }

  const carTitle = `${data.brand} ${data.model} ${data.year ? `(${data.year})` : ''} ${data.number || ''}`.trim();
  const pageTitle = `${carTitle} — участник автоклуба в Чебоксарах`;
  const pageDescription = data.note 
    ? `${carTitle}: ${data.note.slice(0, 110)}... Участник автоклуба VAGClub21 в г. Чебоксары.`
    : `Автомобиль ${carTitle} участника автоклуба VAGClub21 в г. Чебоксары. Фотографии, технические характеристики и доработки.`;

  const serverUrl = process.env.NEXT_PUBLIC_URL_SERVER || 'https://vagclub21.ru';
  const ogImages = (data.carsImages ?? []).map(img => ({
    url: img.source?.startsWith('http') ? img.source : `${serverUrl}/image/${img.source}`,
    width: 1200,
    height: 800,
    alt: `${data.brand} ${data.model} #${data.number || ''}`
  })).filter(img => Boolean(img.url));

  const mainImage = ogImages[0]?.url || 'https://vagclub21.ru/images/og-main.jpg';

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: `/cars/${slug}` },
    openGraph: {
      type: 'article',
      locale: 'ru_RU',
      url: `https://vagclub21.ru/cars/${slug}`,
      siteName: 'VAGClub21',
      title: pageTitle,
      description: pageDescription,
      images: ogImages.length > 0 ? ogImages : [{ url: mainImage, width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [mainImage]
    }
  };
}

const Page = async ({params}) => {
  const {slug} = await params;

  if (!slug) return <CarsContent />;

  const {data} = await getCarInfo(slug);

  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Клубные авто', url: '/cars' },
    { name: `${data?.brand || ''} ${data?.model || ''}`.trim() || 'Автомобиль', url: `/cars/${slug}` }
  ];

  return (
    <>
      <JsonLd data={generateCarJsonLd(data, slug)} />
      <JsonLd data={generateBreadcrumbsJsonLd(breadcrumbs)} />
      <CarDetail carData={data} />
    </>
  );
};

export default Page;
