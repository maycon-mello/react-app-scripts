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
  presets.push(require.resolve('babel-preset-es2015'));
  presets.push(require.resolve('babel-preset-stage-0'));

  if (config.hotLoader) {
    plugins.push(require.resolve('react-hot-loader/babel'));
  }

  let query = {
    babelrc: false,
    passPerPreset: true,
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

  let loader = {
    test: /\.(js|jsx)$/,
    include: [
      config.appSrc,
      path.resolve(__dirname, '../lib/reactHot'),
    ],
    loader: cache ? require.resolve('happypack/loader') : require.resolve('babel-loader'),
    query: cache ? {} : getQuery(config), 
  }

  return loader;
}

module.exports = {
  getBabelLoader,
  getBabelQuery,
}
