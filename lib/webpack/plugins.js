const webpack = require( 'webpack');
const path = require('path');
const HappyPack = require('happypack');
const Logger = require('../util/logger');
const { getBabelQuery } = require('./jsLoader');

function applyProductionPlugins(plugins, config) {
  let pConfig = config.plugins || {};

  plugins.push(new webpack.DefinePlugin({
    "process.env": { 
       NODE_ENV: JSON.stringify("production") 
     }
  }));

  if (pConfig.uglify !== false) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      }
    }));
  }

  if (pConfig.occurenceOrder !== false) {
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  }

  if (pConfig.occurenceOrder !== false) {
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  }

  if (pConfig.dedupe === true) {
    plugins.push(new webpack.optimize.DedupePlugin());
  }

  return plugins;
}

/**
 *
 * @param {Sttring} env
 *
 */
function getPlugins(config) {
  let { env } = config;
  let plugins = [];

  if (env === 'dev' && config.reactHot) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  if (config.cache) {
    Logger.debug('Webpack cache enabled.');

    let query = getBabelQuery(config);

    plugins.push(new HappyPack({
      loaders: ['babel?' + JSON.stringify(query)],
    }));
  }

  if (env === 'prod') {
    applyProductionPlugins(plugins, config);
  }

  return plugins;
}

module.exports = getPlugins;
