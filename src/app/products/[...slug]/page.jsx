import ProductList from "@/components/products/product-list";
import ProductDetail from "@/components/pages/products/product-detail";

const Page = async ({ params }) => {

  const { slug } = await params;

  console.log(slug);

  return (
    <>
      {slug && slug.length === 1 ? <ProductList type={slug[0]} /> : null}
      {slug && slug.length === 2 ? <ProductDetail slug={slug[1]} /> : null}
    </>
  );
};

export default Page;
