/** @type {import('next').NextConfig} */
import  createNextIntlPlugin from 'next-intl/plugin'
import {fileURLToPath} from 'node:url'

const nextIntlPlugin = createNextIntlPlugin();
const nextConfig = {
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
  images: {
    unoptimized: true,
  },
  async headers() {
    return [{
      source: '/website-2026/:path*',
      headers: [
        {key: 'X-Content-Type-Options', value: 'nosniff'},
        {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
        {key: 'X-Frame-Options', value: 'SAMEORIGIN'},
      ],
    }];
  },
}

export default nextIntlPlugin(nextConfig);
