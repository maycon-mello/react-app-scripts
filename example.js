let app = require('react-relay-app');

app.serve({
  port: 3000,
  rootPath: __dirname,
  staticsPath: 'public',
  publicPath: '/static/',
  entry: './src/index.js',
  schema: {
    entry: './src/data/schema',
    watch: './src/data'
  }
});
