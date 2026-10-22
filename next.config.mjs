/** @type {import('next').NextConfig} */

const nextConfig = {
  // cacheComponents (PPR) отключён осознанно: в Next 16.2 пререндер обрезает большие
  // клиентские деревья (styled-components) до Suspense-фолбэка — сайт отдавал только лоадер.
  // Вместо него — классический SSR/ISR + fetch-кеш с revalidate (см. src/server/cms-data.js)
  allowedDevOrigins: ['qa.vagclub21.ru', 'vagclub21.ru', 'localhost:3080', 'localhost:3090'],
  cacheComponents: false,
  compress: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 дней кеширования оптимизированных картинок
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3060',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vagclub21.ru',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'qa.vagclub21.ru',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.vagclub21.ru',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 't.me',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.vagclub21.ru',
          },
        ],
        destination: 'https://vagclub21.ru/:path*',
        permanent: true,
      },
    ];
  },
}

export default nextConfig
