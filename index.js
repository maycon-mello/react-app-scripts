const spawn = require('cross-spawn');
const fs = require('fs')
const path = require('path');
const scriptsPath = require.resolve('./scripts');

const CONFIG_FILE_PATH = '/config.tmp.json';
const REACT_HOT_ENTRY = '/tools/reactHotEntry.tmpl.js';
const REACT_HOT_APP = '/tools/reactHotApp.tmpl.js';

/**
 * Run the given script
 *
 */
function run(script) {
  const params = [scriptsPath].concat(' ' + script);
  const config = { stdio: 'inherit' }
  const result = spawn.sync('node', params, config);
  process.exit(result.status);
}

/**
 *
 *
 */
function resolvePaths(values, rootPath) {
  for(var key in values) {
    if (values[key].indexOf && values[key].indexOf('./') === 0) {
      values[key] = path.join(rootPath, values[key]);
    }
  }
}

/**
 * Write the config file and run a script ('serve', 'build', 'test')
 * @param {Object} config
 * @param {String} script - some like 'serve', 'build', 'test'
 * @return {Promise}
 */
function prepareAndRun(config, script) {
  resolvePaths(config, config.rootPath);
  resolvePaths(config.schema, config.rootPath);

  return reactHotEntry(config)
    .then(() => writeConfig(config))
    .then(() => run(script))
    .catch(err => console.log(err));
}

/**
 * Write the config file on the disk
 *
 */
function writeConfig(config) {
  return new Promise((resolve, reject) => {
    const path = __dirname + CONFIG_FILE_PATH;
    const data = JSON.stringify(config);

    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      }
      // TODO: deal with permission errors
      resolve();
    });
  })
}

function parseTemplate(config, path, replace) {
  return new Promise(function(resolve, reject) {
    path = __dirname + path;
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }
      data = replace(data, config);
      path = path.replace(/\.tmpl/, '.tmp').replace(/\/tools\//, '/tmp/');
      fs.writeFile(path, data, (err) => {
        if (err) {
          reject(err);
        }
        // TODO: deal with permission errors
        resolve();
      });
    });  
  });
}

function reactHotEntry(config) {
  if (!config.reactHot || !config.reactHot.enabled) {
    return Promise.resolve(config);
  }
  console.log("Creating react hot loader wrapper...");

  return parseTemplate(config, REACT_HOT_ENTRY, function(data, config) {
      return data
        .replace(/<%ROOT_PATH%>/g, config.rootPath)
        .replace(/<%WRAPPER_ID%>/g, config.reactHot.renderWrapperId);
    })
    .then(() =>  parseTemplate(config, REACT_HOT_APP, function(data, config) {
      return data.replace(/<%APP_ENTRY%>/g, config.entry);
    }))
    .then(() => {
      config.entry = __dirname + '/tmp/reactHotEntry.tmp.js'
    });
}

module.exports = {
  serve(config) {
    return prepareAndRun(config, 'serve');
  },

  build(config) {
    return prepareAndRun(config, 'build');
  },

  test(config) {
    return prepareAndRun(config, 'test');
  },
}
