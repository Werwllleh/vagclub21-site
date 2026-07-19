import CarDetail from "@/components/cars/car-detail";
import {cache} from "react";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import CarService from "@/services/car.service";
import CarsContent from "@/components/cars/cars-content";

const getCarInfo = cache(async (slug) => {
  const carId = decodeURIComponent(slug.split('_')[1]);

  if (!carId) {
    return null;
  }

  return await CarService.fetchCarInfo(carId);
});

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
