/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://38.60.91.19:3001/api/:path*',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "http",
        hostname: "38.60.91.19",
        port: "9000",
      },
      {
        protocol: "http",
        hostname: "38.60.91.19",
      },
      {
        protocol: "https",
        hostname: "38.60.91.19",
      },
      {
        protocol: "https",
        hostname: "blog.futurefrontier.ai",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
