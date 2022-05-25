module.exports = (api) => {
  api.cache(true);
  const presets = ['next/babel', '@babel/preset-typescript'];

  const plugins = ['transform-class-properties'];

  return { presets, plugins };
};
