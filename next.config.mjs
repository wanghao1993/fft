/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  // Add any other Next.js configurations here
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
