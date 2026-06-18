/** @type {import('next').NextConfig} */

const nextConfig = {
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
