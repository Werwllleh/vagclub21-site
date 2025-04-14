import React from 'react';
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import CarsContent from "@/components/pages/cars/cars-content";

export const metadata = {
  title: PUBLIC_PAGES.CARS.SEO_TITLE,
  description: PUBLIC_PAGES.CARS.SEO_DESCRIPTION,
};

const Page = () => {
  return (
    <div className="page">
      <CarsContent />
    </div>
  );
};

export default Page;
