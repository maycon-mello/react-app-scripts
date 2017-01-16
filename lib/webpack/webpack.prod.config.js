const webpack = require( 'webpack');
const path = require('path');
const config = require('../config.tmp.json');
const HappyPack = require('happypack');
const Logger = require('../util/logger');

// Loaders
const jsLoader = require('./jsLoader').getBabelLoader;
const {
  globalCssLoader,
  globalSassLoader,
  cssLoader,
  sassLoader,
} = require('./styleLoader');
const getPlugins = require('./plugins');

module.exports = {
  entry: [
    require.resolve('babel-polyfill'),
    require.resolve('whatwg-fetch'),
    config.entry,
  ],
  module: {
    loaders: [
      jsLoader(config),
      globalCssLoader(config),
      globalSassLoader(config),
      sassLoader(config),
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader') + '?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader') + '?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.(eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('file-loader')
      }
    ],
  },
  output: {
    path: config.staticsPath || config.path,
    filename: config.filename || 'bundle.js',
    publicPath: config.publicPath,
  },
  plugins: getPlugins(config),
}
