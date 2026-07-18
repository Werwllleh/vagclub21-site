/** @type {import('next').NextConfig} */

const nextConfig = {
  cacheComponents: process.env.START_MODE === 'production',
  allowedDevOrigins: ['qa.vagclub21.ru', 'www.qa.vagclub21.ru', '127.0.0.1'],
  images: {
    unoptimized: process.env.START_MODE === 'development',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3060',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
