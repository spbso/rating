const commonConfig = {
  distDir: 'build',
  future: {},
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  env: {
    ROOT_PATH: '',
  },
};

module.exports = (phase) => {
  // Default Return
  return commonConfig;
};
