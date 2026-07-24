import {getPartners, getProductsList} from "@/server/cms-data";

const BASE_URL = 'https://vagclub21.ru';

export default async function sitemap() {
  const staticPages = [
    {url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1},
    {url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.7},
    {url: `${BASE_URL}/partners`, changeFrequency: 'weekly', priority: 0.9},
    {url: `${BASE_URL}/products`, changeFrequency: 'weekly', priority: 0.8},
    {url: `${BASE_URL}/cars`, changeFrequency: 'weekly', priority: 0.7},
    {url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.5},
    {url: `${BASE_URL}/meet`, changeFrequency: 'weekly', priority: 0.6},
    {url: `${BASE_URL}/contacts`, changeFrequency: 'monthly', priority: 0.5},
    {url: `${BASE_URL}/policy`, changeFrequency: 'yearly', priority: 0.2},
  ];

  const [partners, products] = await Promise.all([
    getPartners({page: 1, limit: 100}).catch(() => null),
    getProductsList().catch(() => null),
  ]);

  const partnerPages = (partners?.partners ?? []).filter(p => p?.slug).map(p => ({
    url: `${BASE_URL}/partner/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const productPages = (products?.docs ?? []).filter(p => p?.slug && p?.type).map(p => ({
    url: `${BASE_URL}/products/${p.type}/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticPages, ...partnerPages, ...productPages];
}
