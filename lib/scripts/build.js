const fs = require('fs');
const chokidar = require('chokidar');
const express = require('express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const Logger = require('../util/logger');
const updateSchema = require('../util/updateSchema');
const config = require('../config.tmp.json');
const webPackDevConfig = require('../webpack/webpack.prod.config.js');

Logger.setDebug(config.debug);

/**
 *
 *
 */
function build() {
  return prepareSchema().then(runBuild);
}

/**
 *
 *
 */
function prepareSchema() {
  if (!config.schema) {
    Logger.debug('No schema found.');
    return Promise.resolve();
  }

  return updateSchema();
}


/**
 *
 *
 */
function runBuild() {
  let start = Date.now();
  const compiler = webpack(webPackDevConfig);

  compiler.run(function(err, stat) {
    let filelName = config.filename || 'bundle.js';
    Logger.info('');
    let time = (Date.now() - start) / 1000;
    Logger.info(`Build process finished in ${time} seconds.`);
  });
}

module.exports = build;
