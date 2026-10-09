/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  allowedDevOrigins: [
    '192.168.1.36',
    '192.168.1.36:3000',
    'localhost',
    'localhost:3000',
    '127.0.0.1',
    '127.0.0.1:3000',
    '10.175.42.138',
    '192.168.2.105',
    '192.168.31.148',
    '192.168.31.27',
  ],
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/icons/favicon.ico',
      },
      {
        source: '/og-image.png',
        destination: '/icons/og-image.png',
      },
      {
        source: '/apple-icon.png',
        destination: '/icons/apple-icon.png',
      },
    ]
  },
}

export default nextConfig
