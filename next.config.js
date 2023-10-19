const path = require('path');

module.exports = {
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
};