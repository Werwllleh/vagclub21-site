/** @type {import('next').NextConfig} */

const nextConfig = {
  cacheComponents: false,
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
    ],
  },
}

export default nextConfig
