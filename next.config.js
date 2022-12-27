/** @type {import('next').NextConfig} */
const path = require('path');

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
}); 

const nextConfig = withPWA({
  reactStrictMode: true,
  env: {
    API_PREFIX: process.env.API_PREFIX,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "_variables.scss"; @import "_mixins.scss";`
  },
  eslint: {
    dirs: ['pages', 'utils', 'components', 'hooks', 'store'],
  },
});

module.exports = nextConfig;
