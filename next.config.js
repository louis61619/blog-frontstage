const path = require('path');

const withPWA = require('next-pwa')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPWA(withBundleAnalyzer({
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
    domains: ['coderland.ml', 'localhost'],
  },
  pwa: {
    // disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    // fallbacks: {
    //   image: '/fallback.png',
    //   // document: '/other-offline',  // if you want to fallback to a custom    page other than /_offline
    //   // font: '/static/font/fallback.woff2',
    //   // audio: ...,
    //   // video: ...,
    // },
  },
}));