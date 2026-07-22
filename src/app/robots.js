export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/profile', '/login', '/register', '/api/'],
    },
    sitemap: 'https://vagclub21.ru/sitemap.xml',
  };
}
