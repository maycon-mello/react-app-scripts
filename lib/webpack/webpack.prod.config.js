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
};

let plugins = [];

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



if (config.cache) {
  Logger.debug('Webpack cache enabled.');

  plugins.push(new HappyPack({
    loaders: [ 'babel?' + JSON.stringify(babelQuery)],
  }));
}


module.exports = {
  entry: [
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
    path: config.staticsPath || config.path,
    filename: config.filename || 'bundle.js',
    publicPath: config.publicPath,
  },
  plugins,
}
