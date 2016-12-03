#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// const scripts = require('react-app-scripts');
const scripts = require('./index');

const scriptName = process.argv[2].trim();
const dirName = process.cwd();
const rcFilePath = path.join(dirName, '.scriptsrc');

// global config
const gConfig = JSON.parse(fs.readFileSync(rcFilePath, 'utf8'));

function getConfig(script) {
  let config = gConfig[script];
  config.entry = gConfig.entry;
  config.appSrc = gConfig.appSrc;
  config.rootPath = dirName;
  config.schema = Object.assign(config.schema|| {}, gConfig.schema);
  return config;
}

switch (scriptName) {
  case 'serve': {
    let config = getConfig('serve');
    scripts.serve(config);
    break;
  }

  case 'build': {
    let config = getConfig('build');
    scripts.build(config);
    break;
  }

  case 'test': {
    let config = gConfig.test;
    scripts.test(config);
    break;
  }

  default: {
    console.log(scriptName + ' command not found.');
  }
}

