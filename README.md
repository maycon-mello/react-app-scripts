# React app scripts
Run, build and test react applications.

## Relay and GraphQL support
Babel relay plugin is included to transpile relay queries

## What is included on react app scripts?
 - Webpack
 - Webpack dev server
 - Happypack (webpack cache)
 - Babel react and ES6 loaders
 - React hot loader
 - Relay/GraphQL support

## Serve React application
```javascript
const app = require('react-app-scripts');

app.serve({
  port: 3000,
  rootPath: __dirname,
  staticsPath: './public',
  publicPath: '/build/',
  entry: './src/main.js',
  appSrc: './src',
});

```
### Serve React/Relay application with local schema
```javascript
const app = require('react-app-scripts');

app.serve({
  port: 3000,
  rootPath: __dirname,
  staticsPath: './public',
  publicPath: '/build/',
  entry: './src/main.js',
  appSrc: './src',
  graphql: {
    schema: {
      entry: './src/schema',
      json: './tools/schema/schema.json',
      graphql: './tools/schema/schema.graphql',
      watch: './src/schema',
    },
  },
  proxy: {
    '/**': {
      target: 'http://myapp.com/',
      secure: false
    },
  },
});

```

### What should be done yet?
 - Write tests
 - Create build script
 - Create test script
 - Flowtype support
 - GraphQL Server support
 - GraphiQL client
 - Less, Sass and postcss support
 - Improve webpack loaders to deal with files
