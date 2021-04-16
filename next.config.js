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
      {
        source: '/search',
        destination: '/search/title',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['coderland.ml', 'localhost'],
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    swSrc: 'service-worker.js'
  },
}));