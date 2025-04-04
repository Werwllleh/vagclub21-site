import ProductDetail from "@/app/products/product-detail";

const Page = async ({ params }) => {

  const { slug } = await params;

  return (
    <div className="page">
      <ProductDetail slug={slug} />
    </div>
  );
};

export default Page;
