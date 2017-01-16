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

const entry = [];

entry.push(require.resolve('babel-polyfill'));
entry.push(require.resolve('whatwg-fetch'));

if (config.reactHot) {
  entry.push('react-hot-loader/patch');
}
entry.push(require.resolve('webpack/hot/dev-server'));

entry.push(`${require.resolve('webpack-dev-server/client')}?http://localhost:${config.port}`);
entry.push(config.entry);

module.exports = {
  entry,
  module: {
    rules: [
      jsLoader(config),
      globalCssLoader(config),
      globalSassLoader(config),
      sassLoader(config),
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [require.resolve('url-loader') + '?limit=10000&mimetype=application/font-woff'],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [require.resolve('url-loader') + '?limit=10000&mimetype=application/octet-stream']
      },
      {
        test: /\.(eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [require.resolve('file-loader')]
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