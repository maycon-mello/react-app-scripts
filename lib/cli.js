#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const scripts = require('react-app-scripts');

const scriptName = process.argv[2].trim();
const dirName = process.cwd();
const rcFilePath = path.join(dirName, '.scriptsrc');

// global config
const gConfig = JSON.parse(fs.readFileSync(rcFilePath, 'utf8'));

function getConfig(script) {
  let config = gConfig[script] || {};
  config.entry = gConfig.entry;
  config.appSrc = gConfig.appSrc;
  config.rootPath = dirName;
  config.schema = Object.assign(config.schema || {}, gConfig.schema);
  if (gConfig.reactHot) {
    config.reactHot = Object.assign(config.reactHot || {}, gConfig.reactHot);
  }
  if (gConfig.sass) {
    config.sass = Object.assign(config.sass || {}, gConfig.sass);
  }
  return config;
}

switch (scriptName) {
  case 'serve': {
    let config = getConfig('serve');
    let port = process.argv[3];
    if (port) {
      config.port = port.trim();
    }
    scripts.serve(config);
    break;
  }

  case 'build': {
    let config = getConfig('build');
    scripts.build(config);
    break;
  }

  case 'test': {
    let config = getConfig('test');
    scripts.test(config);
    break;
  }

  default: {
    console.log(scriptName + ' command not found.');
  }
}

