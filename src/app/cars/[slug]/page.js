import CarDetail from "@/components/pages/cars/car-detail";

const Page = async ({params}) => {

  const {slug} = await params;

  const carNumber = decodeURIComponent(slug.split('_')[2]);

  return (
    <div className="page">
      <div className="container">
        {carNumber && <CarDetail carNumber={carNumber} />}
      </div>
    </div>
  );
};

export default Page;
