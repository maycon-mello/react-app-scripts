const webpack = require( 'webpack');
const path = require('path');
const HappyPack = require('happypack');
const Logger = require('../util/logger');

function getBabelQuery(config) {
  let plugins = [];
  let presets = [];

  if (config.schema) {
    presets.push({
      plugins: [require.resolve('../util/babelRelayPlugin')],
    });
  }

  presets.push(require.resolve('babel-preset-react'));
  presets.push(
    require.resolve('babel-preset-es2015')
  );

  presets.push(require.resolve('babel-preset-stage-0'));

  if (config.hotLoader) {
    plugins.push(require.resolve('react-hot-loader/babel'));
  }

  plugins.push(require.resolve('babel-plugin-transform-remove-strict-mode'));
  plugins.push(require.resolve('babel-plugin-transform-flow-strip-types'));
  plugins.push(require.resolve('babel-plugin-syntax-dynamic-import'));

  if (config.cache === true) {
    console.log("Running with cache");
  }

  let query = {
    babelrc: false,
    passPerPreset: true,
    cacheDirectory: config.cache ? config.cache : false,
    presets,
    plugins,
  };

  return query;
}
/**
 *
 * @param {String} env
 *
 */
function getBabelLoader(config) {
  let { cache } = config;
  let loaders = [];

  // if (config.cache) {
  //   loaders.push(require.resolve('happypack/loader'));
  // } else {
    loaders.push({
      loader: require.resolve('babel-loader'),
      options: getBabelQuery(config), 
    });
  // }

  let loader = {
    test: /\.(js|jsx)$/,
    include: [
      config.appSrc,
      path.resolve(__dirname, '../reactHot'),
    ],
    use: loaders,
  }

  return loader;
}

module.exports = {
  getBabelLoader,
  getBabelQuery,
}
