export default function robots() {
  const BASE_URL = 'https://vagclub21.ru';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/profile',
          '/login',
          '/register',
          '/api/',
          '/*?*section=*',
          '/*?*auth=*',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
