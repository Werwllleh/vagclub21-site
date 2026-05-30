import CarDetail from "@/components/cars/car-detail";
import CarsOthers from "@/components/cars/cars-others";

const Page = async ({params}) => {

  const {slug} = await params;
  const carId = decodeURIComponent(slug.split('_')[1]);

  return (
    <div className="page ppt ppb">
      {carId && <CarDetail carId={carId} />}
    </div>
  );
};

export default Page;
