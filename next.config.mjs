/** @type {import('next').NextConfig} */

const nextConfig = {
  cacheComponents: String(process.env.USE_CACHE) === 'true',
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
        pathname: 'qa.vagclub21.ru/api/image/**',
      },
    ],
  },
}

export default nextConfig
