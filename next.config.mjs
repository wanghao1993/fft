/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  // Add any other Next.js configurations here
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://www.futurefrontier.ai/api/:path*",
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
