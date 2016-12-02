# React App Scripts [![npm version](https://badge.fury.io/js/react-app-scripts.svg)](https://badge.fury.io/js/react-app-scripts) (https://api.travis-ci.org/maycon-mello/react-app-scripts.svg?branch=master)

Run, build and test react applications.

## Relay and GraphQL support
Babel relay plugin is included to transpile relay queries

## What is included on react app scripts?
 - Webpack
 - Webpack Dev Server
 - [Happypack](https://github.com/amireh/happypack)
 - Babel React and ES6 loaders
 - [React Hot Loader 3](https://github.com/gaearon/react-hot-loader)
 - Relay/GraphQL support

## Serve React application
```javascript
const app = require('react-app-scripts');

app.serve({
  port: 3000,
  // Your application root path
  // All relative paths will be resolved from this path
  rootPath: __dirname,
  // Static files to be served by express
  // Put here your index.html
  staticsPath: './public',
  // Path to webpack serve the bundle.js file
  publicPath: '/build/',
  // Your application entry point
  entry: './src/main.js',
  // You application source path to watch for file changes
  appSrc: './src',
});
```javascript

## React hot loader
React App Scripts include [React Hot Loader 3](https://github.com/gaearon/react-hot-loader)
This is disabled by default, see the code below to enable it.


const app = require('react-app-scripts');

app.serve({
  port: 3000,
  rootPath: __dirname,
  staticsPath: './public',
  publicPath: '/build/',
  entry: './src/main.js',
  appSrc: './src',
  // Enable React Hot Loading 3
  reactHot: {
    // This property is optional, the default value is true
    enabled: true, // It is usefull to turn hot loading disabled temporarly
    // React hot loading will render your app inside this element
    renderWrapperId: 'wrapper',
  },
});


```

Your main.js file should look like this:

```javascript
import React from 'react';

const app = <div>My app<div>

// React hot loading will automatically render your app inside the renderWrapperId element

/* 
 * You need to export default your app because the entire application
 * will be wrapped by a react loader provider.
 */
export default app;

```

### Serve React/Relay application
React App Scripts do all the necessary tasks to run Relay applications.
You just need to inform your schema file and it will do the dirty work for you.

Every time you update your schema, a new schema.json file will be generated. Webpack will rebuild your application with the new schema and the page will be reloaded.

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

### What should be done yet
 - Write more tests
 - Create build script
 - Create test script
 - Flowtype support
 - GraphQL Server support
 - GraphiQL client
 - Less, Sass and postcss support
 - Improve Webpack loaders to deal with files
 - Improve Webpack to deal with code spliting and multiple entries
