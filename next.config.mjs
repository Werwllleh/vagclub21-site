/** @type {import('next').NextConfig} */

const nextConfig = {
  // cacheComponents (PPR) отключён осознанно: в Next 16.2 пререндер обрезает большие
  // клиентские деревья (styled-components) до Suspense-фолбэка — сайт отдавал только лоадер.
  // Вместо него — классический SSR/ISR + fetch-кеш с revalidate (см. src/server/cms-data.js)
  cacheComponents: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: process.env.START_MODE === 'development',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3060',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vagclub21.ru',
        pathname: '/api/image/**',
      },
      {
        protocol: 'https',
        hostname: 'qa.vagclub21.ru',
        pathname: '/api/image/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.vagclub21.ru',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 't.me',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
