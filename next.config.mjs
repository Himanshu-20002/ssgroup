/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['10.175.42.138', '192.168.2.105', '192.168.31.148', 'localhost'],
}

export default nextConfig
