
const modulesQuery = '?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]';

function globalCssLoader() {
  return {
    use: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
    ],
    test: /\.css$/,
  }
}

function globalSassLoader() {
  return {
    use: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
      require.resolve('sass-loader') + '?sourceMap',
    ],
    test: /\.global\.(scss|sass)$/,
  }
}

function cssLoader() {
  return {
    use: [
      require.resolve('style-loader'),
      require.resolve('css-loader') + modulesQuery,
    ],
    test: /^((?!(\.global|node_modules)).)*\.css$/,
  }
}

function sassLoader() {
  return {
    use: [
      require.resolve('style-loader'),
      require.resolve('css-loader') + modulesQuery,
      require.resolve('sass-loader') + '?sourceMap',
    ],
    test: /^((?!\.global).)*\.(scss|sass)$/,
  }
}

function sassLoaderConfig(config) {
  if (!config.sass) {
    return config;
  }
  return config.sass;
}

module.exports = {
  globalCssLoader,
  globalSassLoader,
  cssLoader,
  sassLoader,
  sassLoaderConfig,
};