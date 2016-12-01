const fs = require('fs');
const express = require( 'express');
const webpack = require( 'webpack');
const WebpackDevServer = require( 'webpack-dev-server');

const updateSchema = require('../tools/updateSchema');
const config = require('../config.tmp.json');
const webPackDevConfig = require('../webpack/webpack.dev.config.js');

/**
 *
 *
 */
function serve() {
  updateSchema().then(createDevServer);
}

/**
 *
 *
 */
function watch() {
  const shouldSkip = /schema\.(json|graphql)/;
  fs.watch(config.schema.watchPath, { encoding: 'buffer' }, (eventType, filename) => {
    const file = filename.toString();

    if (shouldSkip.test(file)) {
      return;  
    }

    updateSchema();
  });
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
    proxy: config.proxy,
  });
  console.log("Running webpack...");

  compiler.plugin('done', function() {
    console.log(`--> App is ready and running on http://localhost:${config.port} <--`);
  });

  // Serve static resources
  app.use('/', express.static(config.staticsPath));
  app.listen(config.port);
}

module.exports = serve;
