require('babel-register')({
  "presets": [
    "react",
    "es2015",
    "stage-0"
  ]
});
const nodeExternals = require('webpack-node-externals');
const express = require( 'express');
const path = require( 'path');
const webpack = require( 'webpack');
const WebpackDevServer = require( 'webpack-dev-server');
const fs = require('fs');
const updateSchema = require('./tools/updateSchema');

function getDevCompiler({ port, entry, rootPath, publicPath, staticsPath }) {
  global.buildRootPath = rootPath;
  
  return webpack({
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:' + port,
      'webpack/hot/dev-server',
      path.join(rootPath, entry),
    ],
    module: {
      loaders: [
        {
          exclude: [
            /node_modules/,
          ],
          loader: 'babel',
          test: /\.js$/,
          babelrc: false,
          query: {
            //"passPerPreset": true,
            cacheDirectory: true,
            presets: ['es2015', 'react']
          },
        },
        {
          loaders: ['style-loader', 'css-loader'],
          test: /\.css$/,
        },
      ],
    },
    output: {
      path: path.join(rootPath, staticsPath),
      filename: 'bundle.js',
      publicPath
    },
    plugins: [
     new webpack.HotModuleReplacementPlugin()
   ]
  });
}

function getPath(root, p) {
  return path.resolve(root, p);
}

function serve({ port, entry, rootPath, publicPath, staticsPath, schema }) {
  let compiler = getDevCompiler({ port, entry, rootPath, publicPath, staticsPath })
  
  process.chdir(rootPath);
  
  let app = new WebpackDevServer(compiler, {
    publicPath, // javascript path
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      assets: false,
      chunks: false
    }
  });

  // Serve static resources
  app.use('/', express.static(path.resolve(rootPath, staticsPath)));
  app.listen(port, () => {
    console.log(`App is now running on http://localhost:${port}`);
    updateSchema
  });

  // let watchPath = getPath(rootPath, schema.watch);
  // 
  // updateSchema(getPath(rootPath, schema.entry));
  // 
  // fs.watch(watchPath, {encoding: 'buffer'}, (eventType, filename) => {
  //   console.log(eventType, filename);
  // });
}

module.exports = serve
