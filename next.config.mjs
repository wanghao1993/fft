/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  // Add any other Next.js configurations here
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://38.60.91.19:3001/:path*",
      },
      {
        source: "/php/:path*",
        destination: "https://www.futurefrontier.ai/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.futurefrontier.ai",
      },
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname: "fft-two.vercel.app",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
