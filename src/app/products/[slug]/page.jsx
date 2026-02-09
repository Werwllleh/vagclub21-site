import ProductDetail from "@/components/pages/products/product-detail";

const Page = async ({ params }) => {

  const { slug } = await params;

  console.log(slug);

  return (
    <div className="page ppt ppb">
      <ProductDetail slug={slug} />
    </div>
  );
};

export default Page;
