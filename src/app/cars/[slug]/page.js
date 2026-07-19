import CarDetail from "@/components/cars/car-detail";
import {cache, Suspense} from "react";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import CarService from "@/services/car.service";
import CarsContent from "@/components/cars/cars-content";
import Loading from "@/app/loading";
import {connection} from "next/server";

/*const getCarInfo = cache(async (slug) => {
  const carId = decodeURIComponent(slug.split('_')[1]);

  if (!carId) {
    return null;
  }

  return await CarService.fetchCarInfo(carId);
});

export async function generateMetadata({params}) {
  const {slug} = await params;

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
}*/

export const metadata = {
  title: 'Информация об авто | VagClub21',
  description: 'Информация об авто | VagClub21',
};

const Page = async ({params}) => {
  'use cache'
  const {slug} = await params;
  const carId = decodeURIComponent(slug.split('_')[1]);

  if (!slug) return <CarsContent/>;

  const {data} = await CarService.fetchCarInfo(carId);

  return (
    <Suspense fallback={<Loading/>}>
      <CarDetail carData={data}/>
    </Suspense>
  );
};

export default Page;
