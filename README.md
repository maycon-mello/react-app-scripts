# React app scripts
Run, build and test react applications.

## Relay and GraphQL support
Babel relay plugin is included

## What is included on react app scripts?
 - Webpack
 - Webpack dev server
 - Babel loaders
 - Babel relay plugin
 - React hot loader
 - GraphQL Server
 - GraphiQL client

## Serve Redux application
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
### Serve Relay application
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
    localSchema: true,
    schema: {
      entry: './src/schema',
      json: './tools/schema/schema.json',
      graphql: './tools/schema/schema.graphql',
      watch: './src/schema',
    },
  }
});

```

### Serve Relay application with GraphQL Server
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
  }
});

```

### Serve with Proxy
```javascript
const app = require('react-app-scripts');

app.serve({
  port: 3000,
  rootPath: __dirname,
  staticsPath: './public',
  publicPath: '/build/',
  entry: './src/main.js',
  appSrc: './src',
  proxy: {
    '/**': {
      target: 'http://myapp.com/',
      secure: false
    },
  },
});

```

