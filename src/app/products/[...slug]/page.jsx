import ProductList from "@/components/products/product-list";
import ProductDetail from "@/components/products/product-detail";
import {getProductsByType, getProduct, getProductsList} from "@/server/cms-data";

// известные типы и слаги товаров пререндерим статически, новые — по запросу
export async function generateStaticParams() {
  const products = await getProductsList().catch(() => null);
  const docs = (products?.docs ?? []).filter(p => p?.slug && p?.type);

  const types = [...new Set(docs.map(p => p.type))].map(type => ({slug: [type]}));
  const items = docs.map(p => ({slug: [p.type, p.slug]}));

  return [...types, ...items];
}

export async function generateMetadata({params}) {
  const {slug} = await params;

  if (slug && slug.length === 2) {
    const product = await getProduct(slug[1]).catch(() => null);

    if (product?.title) {
      return {
        title: `${product.title} — VAGCLUB21`,
        description: product?.seo?.description || product?.description || `Атрибутика клуба VAGCLUB21: ${product.title}`,
        openGraph: product?.image?.url ? {images: [product.image.url]} : undefined,
      };
    }
  }

  return {};
}

const Page = async ({ params }) => {

  const { slug } = await params;

  if (slug && slug.length === 1) {
    const initialData = await getProductsByType(slug[0]).catch(() => null);
    return <ProductList type={slug[0]} initialData={initialData} />;
  }

  if (slug && slug.length === 2) {
    const initialData = await getProduct(slug[1]).catch(() => null);
    return <ProductDetail slug={slug[1]} initialData={initialData} />;
  }

  return null;
};

export default Page;
