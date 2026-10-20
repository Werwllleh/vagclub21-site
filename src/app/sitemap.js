import {getPartners, getProductsList, getCarsList} from "@/server/cms-data";

const BASE_URL = 'https://vagclub21.ru';

export default async function sitemap() {
  const now = new Date();

  // 1. Статические разделы сайта
  const staticPages = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/cars`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/partners`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/meet`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/contacts`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  // 2. Параллельный сбор данных из CMS и Backend API
  const [partnersRes, productsRes, carsRes] = await Promise.all([
    getPartners({page: 1, limit: 200}).catch(() => null),
    getProductsList().catch(() => null),
    getCarsList().catch(() => null),
  ]);

  // 3. Категории товаров (/products/[type])
  const productDocs = (productsRes?.docs ?? []).filter(p => p?.slug && p?.type);
  const uniqueTypes = [...new Set(productDocs.map(p => p.type))];
  const productCategoryPages = uniqueTypes.map(type => ({
    url: `${BASE_URL}/products/${type}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 4. Карточки товаров (/products/[type]/[slug])
  const productPages = productDocs.map(p => ({
    url: `${BASE_URL}/products/${p.type}/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 5. Партнеры (/partner/[slug])
  const partnerPages = (partnersRes?.partners ?? []).filter(p => p?.slug).map(p => ({
    url: `${BASE_URL}/partner/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 6. Карточки клубных автомобилей (/cars/[slug])
  const carPages = (carsRes?.data ?? [])
    .filter(car => car?.id && car?.brand)
    .map(car => {
      const brandLetter = car.brand?.substring(0, 1) ?? '';
      const modelLetter = car.model?.substring(0, 1) ?? '';
      const slug = `${brandLetter}${modelLetter}_${car.id}`;
      return {
        url: `${BASE_URL}/cars/${slug}`,
        lastModified: car.updatedAt ? new Date(car.updatedAt) : now,
        changeFrequency: 'weekly',
        priority: 0.7,
      };
    });

  return [
    ...staticPages,
    ...productCategoryPages,
    ...productPages,
    ...partnerPages,
    ...carPages,
  ];
}
