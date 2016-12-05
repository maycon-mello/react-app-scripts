

function getLoader() {
  return {
    loaders: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
    ],
    test: /\.css$/,
  }
}

module.exports = getLoader;