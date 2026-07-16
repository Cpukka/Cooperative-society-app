/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // This is the correct property name for Next.js 16
  serverExternalPackages: ["pg", "@prisma/adapter-pg", "@prisma/client", "prisma"],

  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS images
      },
    ],
  },

  transpilePackages: [
    "next-auth",
    "@auth/prisma-adapter",
    "@next-auth/prisma-adapter",
    "lucide-react",
    "recharts",
    "bcryptjs",
  ],
};

module.exports = nextConfig;