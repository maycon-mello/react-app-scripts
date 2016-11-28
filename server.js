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

function getDevCompiler({ port, entry, appSrc, rootPath, publicPath, staticsPath }) {
  global.buildRootPath = rootPath;

  return webpack({
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:' + port,
      'webpack/hot/dev-server',
      path.join(rootPath, entry),
    ],
    resolveLoader: {
      root: path.join(__dirname, '/node_modules'),
      moduleTemplates: ['*-loader']
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          include: path.join(rootPath, appSrc),
          loader: 'babel',
          query: {
            babelrc: false,
            passPerPreset: true,
            presets: [
              {
                plugins: [
                  require.resolve('./tools/babelRelayPlugin')
                ],
              },
              require.resolve('babel-preset-react-app'),
              require.resolve('babel-preset-stage-0'),
            ],
            plugins: [
              require.resolve('react-hot-loader/babel')
            ],
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

function serve({ port, entry, appSrc, rootPath, publicPath, staticsPath, schema }) {
  let compiler = getDevCompiler({ port, entry, appSrc, rootPath, publicPath, staticsPath })
  // let app = new WebpackDevServer(compiler, {
  //   publicPath, // javascript path
  //   hot: true,
  //   historyApiFallback: true,
  //   stats: {
  //     colors: true,
  //     assets: false,
  //     chunks: false
  //   }
  // });

  // // Serve static resources
  // app.use('/', express.static(path.resolve(rootPath, staticsPath)));
  // app.listen(port, () => {
  //   console.log(`App is now running on http://localhost:${port}`);
  // });

  // let watchPath = getPath(rootPath, schema.watch);
  //
  //process.cwd(__dirname);
  updateSchema();
  // 
  // fs.watch(watchPath, {encoding: 'buffer'}, (eventType, filename) => {
  //   console.log(eventType, filename);
  // });
}

module.exports = serve
