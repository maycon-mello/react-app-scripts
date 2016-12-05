const webpack = require( 'webpack');
const path = require('path');
const config = require('../config.tmp.json');
const HappyPack = require('happypack');
const Logger = require('../util/logger');

// Loaders
const jsLoader = require('./jsLoader').getBabelLoader;
const cssLoader = require('./cssLoader');
const getPlugins = require('./plugins');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:config.port`,
    (config.reactHot && config.reactHot.entry) || 'webpack/hot/dev-server',
    config.entry,
  ],
  resolveLoader: {
    root: path.join(__dirname, '/../node_modules'),
    moduleTemplates: ['*-loader'],
  },
  module: {
    loaders: [
      jsLoader(config),
      cssLoader(config),
    ],
  },
  output: {
    path: config.staticsPath || config.path,
    filename: config.filename || 'bundle.js',
    publicPath: config.publicPath,
  },
  plugins: getPlugins(config),
}