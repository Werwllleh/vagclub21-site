import CarDetail from "@/components/cars/car-detail";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import CarsContent from "@/components/cars/cars-content";
import {getCarInfo as getCarInfoCached, getCarsList} from "@/server/cms-data";

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

  return {
    title: `${data?.brand} ${data?.model} ${data?.number} | VagClub21` || 'Информация об авто | VagClub21',
    openGraph: {
      title: `${data?.brand} ${data?.model} ${data?.number} | VagClub21` || 'Информация об авто | VagClub21',
    },
  };
}

const Page = async ({params}) => {
  const {slug} = await params;

  if (!slug) return <CarsContent />;

  const {data} = await getCarInfo(slug);

  return (
    <CarDetail carData={data} />
  );
};

export default Page;
