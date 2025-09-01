/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "i9.ytimg.com",
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
