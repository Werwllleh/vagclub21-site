import {PUBLIC_PAGES} from "@/config/pages/public.config";
import CarsContent from "@/components/cars/cars-content";

export const metadata = {
  title: PUBLIC_PAGES.CARS.SEO_TITLE,
  description: PUBLIC_PAGES.CARS.SEO_DESCRIPTION,
};

// SSR по запросу: CarsContent использует useSearchParams (пагинация/поиск),
// а Suspense-обёртку убрали намеренно (React Fizz заменял контент фолбэком)
export const dynamic = 'force-dynamic';

const Page = async () => {

  return (
    <CarsContent/>
  );
};

export default Page;
