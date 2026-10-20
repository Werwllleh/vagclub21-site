import ProductList from "@/components/products/product-list";
import ProductDetail from "@/components/products/product-detail";
import {getProductsByType, getProduct, getProductsList} from "@/server/cms-data";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import JsonLd from "@/components/seo/json-ld";
import {generateProductJsonLd, generateBreadcrumbsJsonLd} from "@/lib/schema-org";

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

  if (slug && slug.length === 1) {
    const categoryKey = slug[0];
    const categoryConfig = PUBLIC_PAGES.PRODUCT_CATEGORIES?.[categoryKey];

    const title = categoryConfig?.SEO_TITLE || `${categoryConfig?.TITLE || categoryKey} — клубная атрибутика в Чебоксарах`;
    const description = categoryConfig?.SEO_DESCRIPTION || `Купить клубную атрибутику (${categoryConfig?.TITLE || categoryKey}) VAGClub21 в Чебоксарах. Высокое качество и клубная символика.`;

    return {
      title,
      description,
      alternates: { canonical: `/products/${categoryKey}` },
      openGraph: {
        type: 'website',
        locale: 'ru_RU',
        url: `https://vagclub21.ru/products/${categoryKey}`,
        siteName: 'VAGClub21',
        title,
        description,
        images: [{ url: '/images/og-main.jpg', width: 1200, height: 630 }]
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/images/og-main.jpg']
      }
    };
  }

  if (slug && slug.length === 2) {
    const product = await getProduct(slug[1]).catch(() => null);
    const productName = product?.name || product?.title;

    if (productName) {
      const price = product?.pricing?.price || product?.price;
      const priceText = price ? ` за ${price}₽` : '';
      const title = `${productName} — клубная атрибутика в Чебоксарах${priceText}`;
      const description = product?.seo?.description || `Клубный товар ${productName}${priceText}. Официальная символика VAGClub21, в наличии в Чебоксарах. Самовывоз и доставка.`;
      const imageUrl = product?.mainImage?.url || product?.image?.url || 'https://vagclub21.ru/images/og-main.jpg';

      return {
        title,
        description,
        alternates: { canonical: `/products/${slug[0]}/${slug[1]}` },
        openGraph: {
          type: 'website',
          locale: 'ru_RU',
          url: `https://vagclub21.ru/products/${slug[0]}/${slug[1]}`,
          siteName: 'VAGClub21',
          title,
          description,
          images: [{ url: imageUrl, width: 1200, height: 630, alt: productName }]
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: [imageUrl]
        }
      };
    }
  }

  return {};
}

const Page = async ({ params }) => {
  const { slug } = await params;

  if (slug && slug.length === 1) {
    const initialData = await getProductsByType(slug[0]).catch(() => null);
    const categoryTitle = PUBLIC_PAGES.PRODUCT_CATEGORIES?.[slug[0]]?.TITLE || slug[0];
    const breadcrumbs = [
      { name: 'Главная', url: '/' },
      { name: 'Атрибутика', url: '/products' },
      { name: categoryTitle, url: `/products/${slug[0]}` }
    ];

    return (
      <>
        <JsonLd data={generateBreadcrumbsJsonLd(breadcrumbs)} />
        <ProductList type={slug[0]} initialData={initialData} />
      </>
    );
  }

  if (slug && slug.length === 2) {
    const initialData = await getProduct(slug[1]).catch(() => null);
    const categoryTitle = PUBLIC_PAGES.PRODUCT_CATEGORIES?.[slug[0]]?.TITLE || slug[0];
    const breadcrumbs = [
      { name: 'Главная', url: '/' },
      { name: 'Атрибутика', url: '/products' },
      { name: categoryTitle, url: `/products/${slug[0]}` },
      { name: initialData?.name || initialData?.title || 'Товар', url: `/products/${slug[0]}/${slug[1]}` }
    ];

    return (
      <>
        <JsonLd data={generateProductJsonLd(initialData, slug[0], slug[1])} />
        <JsonLd data={generateBreadcrumbsJsonLd(breadcrumbs)} />
        <ProductDetail slug={slug[1]} initialData={initialData} />
      </>
    );
  }

  return null;
};

export default Page;
