
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

export const SERVER_URL = typeof window === 'undefined' ? String(process.env.LOCAL_URL_SERVER) : String(process.env.NEXT_PUBLIC_URL_SERVER);
export const API_URL = `${SERVER_URL}/api`;

export const CMS_URL =
  (isBuildTime || typeof window !== 'undefined')
    ? process.env.NEXT_PUBLIC_URL_CMS
    : process.env.LOCAL_URL_CMS;

export const API_CMS_URL = `${CMS_URL}/api`;

export const BACKEND_SOCIAL_AUTH_URL = `${API_URL}/auth`
export const TG_AUTH_REDIRECT_URL = `${BACKEND_SOCIAL_AUTH_URL}/telegram/redirect`

export const AuthToken = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken'
}

export const PRODUCT_TYPE = {
  STICKERS: 'stickers',
  FLAVOURS: 'flavours',
  MERCH: 'merch',
  FRAMES: 'frames',
}

export const SOCIAL = {
  TELEGRAM: 'https://t.me/+A6S11dagaDA2OWMy',
  INSTAGRAM: 'https://www.instagram.com/vag_club21',
  EMAIL: 'connect@vagclub21.ru'
}

/* === YANDEX METRIKA === */

export const YM_METHOD = {
  HIT: 'hit',
  REACH_GOAL: 'reachGoal',
}

export const YM_ACTION = {
  TELEGRAM_GROUP: 'Telegram',
  INSTAGRAM: 'Instagram',
}

/* === /YANDEX METRIKA === */

export const PAGE = {
  MAIN: '/',
  CARS: 'cars',
  PRODUCTS: 'products',
  PARTNERS: 'partners',
  ABOUT: 'about',
  BLOG: 'blog',
  MEET: 'meet',
  PROFILE: 'profile',
}

export const TYPE = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
}
