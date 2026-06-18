/** @type {import('next').NextConfig} */

const nextConfig = {
  cacheComponents: process.env.START_MODE !== 'development',
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
