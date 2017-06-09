const webpack = require( 'webpack');
const path = require('path');
const HappyPack = require('happypack');
const DashboardPlugin = require('webpack-dashboard/plugin');

const Logger = require('../util/logger');
const { getBabelQuery } = require('./jsLoader');
const { sassLoaderConfig } = require('./styleLoader');

function applyProductionPlugins(plugins, config) {
  let pConfig = config.plugins || {};

  if (config.productionMode === false) {
    plugins.push(new webpack.DefinePlugin({
      "process.env": { 
        NODE_ENV: JSON.stringify("production") 
      }
    }));
  }

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
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  // if (config.cache) {
  //   Logger.debug('Webpack cache enabled.');

  //   let query = getBabelQuery(config);

  //   plugins.push(new HappyPack({
  //     loaders: ['babel-loader?' + JSON.stringify(query)],
  //   }));
  // }

  if (env === 'prod') {
    applyProductionPlugins(plugins, config);
  }

  if (config.commonChunkPlugin) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: config.commonChunkPlugin.name || 'dependencies',
      path: config.commonChunkPlugin.path || './',
      filename: config.commonChunkPlugin.filename || 'dependencies.js',
    }));
  }

  plugins.push(new webpack.LoaderOptionsPlugin({

    sassLoader: sassLoaderConfig(config),

    minimize: true,
    debug: false
  }));

  return plugins;
}

module.exports = getPlugins;
