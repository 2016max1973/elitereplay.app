/** @type {import('next').NextConfig} */
import  createNextIntlPlugin from 'next-intl/plugin'

const nextIntlPlugin = createNextIntlPlugin();
const nextConfig = {
  images: {
    unoptimized: true,
  },
}

export default nextIntlPlugin(nextConfig);
