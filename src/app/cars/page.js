import {Suspense} from 'react';
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import CarsContent from "@/components/cars/cars-content";
import Loading from "@/app/loading";

export const metadata = {
  title: PUBLIC_PAGES.CARS.SEO_TITLE,
  description: PUBLIC_PAGES.CARS.SEO_DESCRIPTION,
};

const Page = async () => {

  return (
    <Suspense fallback={<Loading/>}>
      <CarsContent/>
    </Suspense>
  );
};

export default Page;
