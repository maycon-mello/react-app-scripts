const webpack = require( 'webpack');
const path = require('path');
const config = require('../config.tmp.json');
const HappyPack = require('happypack');
const Logger = require('../util/logger');

let babelQuery = {
  babelrc: false,
  passPerPreset: true,
  presets: [
    {
      plugins: [
        require.resolve('../util/babelRelayPlugin')
      ],
    },
    require.resolve('babel-preset-react'),
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-stage-0'),
  ],
  plugins: [
    require.resolve('react-hot-loader/babel')
  ],
};

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
];

if (config.cache) {
  Logger.debug('Webpack cache enabled.');

  plugins.push(new HappyPack({
    loaders: [ 'babel?' + JSON.stringify(babelQuery)],
  }));
}


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
          path.resolve(__dirname, '../lib/reactHot'),
        ],
        loader: config.cache ? require.resolve('happypack/loader') : require.resolve('babel-loader'),
        query: config.cache ? {} : babelQuery, 
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
  plugins,
}