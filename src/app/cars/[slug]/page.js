import CarDetail from "@/components/pages/cars/car-detail";
import CarsOthers from "@/components/pages/cars/cars-others";

const Page = async ({params}) => {

  const {slug} = await params;
  const carId = decodeURIComponent(slug.split('_')[1]);

  return (
    <div className="page">
      <div className="container">
        {carId && <CarDetail carId={carId} />}
      </div>
    </div>
  );
};

export default Page;
