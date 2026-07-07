/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["pg", "@prisma/adapter-pg", "@prisma/client", "prisma"],

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