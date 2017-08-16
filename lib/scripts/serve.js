const fs = require('fs');
const chokidar = require('chokidar');
const express = require('express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const DashboardPlugin = require('webpack-dashboard/plugin');

const Logger = require('../util/logger');
const updateSchema = require('../util/updateSchema');
const config = require('../config.tmp.json');
const webPackDevConfig = require('../webpack/webpack.dev.config.js');

Logger.setDebug(config.debug);

/**
 *
 *
 */
function serve() {
  return prepareSchema().then(createDevServer);
}

/**
 *
 *
 */
function prepareSchema() {
  if (!config.schema || !config.schema.entry) {
    Logger.debug('No schema found.');
    return Promise.resolve();
  }

  Logger.debug('Prepare graphql schema.');

  watchSchema()

  return updateSchema();
}

/**
 *
 *
 */
function watchSchema() {
  if (!config.schema.watch) {
    return;
  }

  const shouldSkip = /schema\.(json|graphql)/;

  Logger.debug("Watch for schema changes at: ", config.schema.watch);

  const watcher = chokidar.watch(config.schema.watch, {
    ignored: /[\/\\]\./,
    persistent: true
  });

  const update = (path) => {
    if (shouldSkip.test(path)) {
      return;  
    }
    updateSchema().then(() => {
      Logger.debug('Schema successfull udpated.');
    });
  };

  watcher.on('change', update);
}

/**
 *
 *
 */
function createDevServer() {
  const compiler = webpack(webPackDevConfig);

  const app = new WebpackDevServer(compiler, {
    publicPath: config.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      assets: false,
      chunks: false,
    },
    disableHostCheck: config.disableHostCheck,
    proxy: config.proxy,
    //https: true,
  });

  Logger.info("Running webpack...");

  compiler.plugin('done', function() {
    Logger.info(`--> App is ready and running on http://localhost:${config.port} <--`);
  });

  compiler.apply(new DashboardPlugin());

  // Serve static resources
  app.use('/', express.static(config.staticsPath));
  app.listen(config.port);
}

module.exports = serve;
