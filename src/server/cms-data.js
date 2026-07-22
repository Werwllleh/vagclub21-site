// Серверные загрузчики данных из CMS с кешированием через fetch-кеш Next
// (next: {revalidate}). Ходят напрямую на локальные порты (LOCAL_URL_*), минуя nginx.
// Контент обновляется не позже чем через REVALIDATE_CONTENT секунд.

const CMS_API = `${process.env.LOCAL_URL_CMS || process.env.NEXT_PUBLIC_URL_CMS}/api`;
const SERVER_API = `${process.env.LOCAL_URL_SERVER || process.env.NEXT_PUBLIC_URL_SERVER}/api`;

const REVALIDATE_CONTENT = 600; // 10 минут
const REVALIDATE_FAST = 60;     // статус техработ — 1 минута

async function fetchCms(path, revalidate = REVALIDATE_CONTENT) {
  const res = await fetch(`${CMS_API}${path}`, {next: {revalidate}});

  if (!res.ok) {
    throw new Error(`CMS request failed: ${path} → ${res.status}`);
  }

  return res.json();
}

export async function getHeroSlider() {
  return fetchCms('/hero_slider');
}

export async function getProductsList() {
  return fetchCms('/products/list');
}

export async function getProductsByType(type) {
  return fetchCms(`/products/${encodeURIComponent(type)}`);
}

export async function getProduct(slug) {
  return fetchCms(`/products/i/${encodeURIComponent(slug)}`);
}

export async function getPartners({page = 1, limit = 20} = {}) {
  return fetchCms(`/partner/c?page=${page}&limit=${limit}`);
}

export async function getPartnerInfo(slug) {
  return fetchCms(`/partner/c/${encodeURIComponent(slug)}`);
}

export async function getPartnerCategories() {
  return fetchCms('/partner_category/c');
}

export async function getPartnersLabels() {
  return fetchCms('/partner/labels');
}

export async function getMeet() {
  return fetchCms('/globals/meet');
}

export async function getPolicy() {
  return fetchCms('/globals/policy');
}

export async function getTechnicalWorkStatus() {
  // короткий кеш: режим техработ должен включаться быстро
  return fetchCms('/globals/technical_work', REVALIDATE_FAST);
}

export async function getCurrentYear() {
  return new Date().getFullYear();
}

/* === Backend API (server.vagclub21) === */

export async function getCarsList() {
  const res = await fetch(`${SERVER_API}/cars`, {next: {revalidate: REVALIDATE_CONTENT}});

  if (!res.ok) {
    throw new Error(`Server request failed: /cars → ${res.status}`);
  }

  return res.json();
}

export async function getCarInfo(carId) {
  // POST не кешируется fetch-кешем — страницы авто рендерятся по запросу (ISR по слагам)
  const res = await fetch(`${SERVER_API}/car-info`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({carId, carNumber: null}),
  });

  if (!res.ok) {
    throw new Error(`Server request failed: /car-info → ${res.status}`);
  }

  return res.json();
}
