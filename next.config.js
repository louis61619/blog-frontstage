const path = require('path');

const withPWA = require('next-pwa')

module.exports = withPWA({
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
    domains: ['coderland.ml'],
  },
  pwa: {
    dest: 'public',
  },
});