const webpack = require( 'webpack');
const path = require('path');
const config = require('../config.tmp.json');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:' + config.port,
    (config.reactHot && config.reactHot.entry) || 'webpack/hot/dev-server',
    config.entry,
  ],
  resolveLoader: {
    root: path.join(__dirname, '/../node_modules'),
    moduleTemplates: ['*-loader'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: [
          config.appSrc,
          path.resolve(__dirname, '../tmp'),
        ],
        loader: require.resolve('babel-loader'),
        query: {
          babelrc: false,
          passPerPreset: true,
          presets: [
            {
              plugins: [
                require.resolve('../tools/babelRelayPlugin')
              ],
            },
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-stage-0'),
          ],
          plugins: [
            require.resolve('react-hot-loader/babel')
          ],
        },
      },
      {
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
        ],
        test: /\.css$/,
      },
    ],
  },
  output: {
    path: config.staticsPath,
    filename: 'bundle.js',
    publicPath: config.publicPath,
  },
  plugins: [
   new webpack.HotModuleReplacementPlugin(),
  ],
}