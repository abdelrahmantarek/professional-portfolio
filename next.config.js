const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Capacitor
  output: 'export',

  // Disable image optimization for static export
  // Use unoptimized images in Capacitor builds
  images: {
    unoptimized: true,
  },

  // Set base path and asset prefix for proper routing in Capacitor
  // These will be empty for web builds but can be configured for mobile
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',

  // Trailing slash is important for static exports
  trailingSlash: true,

  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = withNextIntl(nextConfig)