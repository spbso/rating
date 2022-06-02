// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  basePath: '/rating',

  // exportPathMap: 'build',
  experimental: {
    outputStandalone: true,
  },
};
module.exports = nextConfig;
