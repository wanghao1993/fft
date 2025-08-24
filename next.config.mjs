/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  // Add any other Next.js configurations here
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://http://38.60.91.19:3001/:path*",
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
