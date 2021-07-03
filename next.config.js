const path = require('path');

const withPWA = require('next-pwa')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(withPWA({
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname);
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  images: {
    domains: [new URL(process.env.NEXT_PUBLIC_STATIC).host, 'localhost'],
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    swSrc: 'service-worker.js'
  },
}));