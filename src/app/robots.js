export default function robots() {
  return {
    rules: {
      userAgent: 'Yandex',
      allow: '/',
      disallow: '/private/',
    },
    // sitemap: 'https://acme.com/sitemap.xml',
  }
}