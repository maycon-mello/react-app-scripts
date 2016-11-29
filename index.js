const spawn = require('cross-spawn');
const fs = require('fs')
const path = require('path');
const scriptsPath = require.resolve('./scripts');

const CONFIG_FILE_PATH = '/config.tmp.json';

/**
 * Run the given script
 *
 */
function run(script) {
  process.chdir(__dirname);
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
  return writeConfig(config)
    .then(() => run(script))
    .catch(err => console.log(err));
}

/**
 * Write the config file on the disk
 *
 */
function writeConfig(config) {
  resolvePaths(config, config.rootPath);
  resolvePaths(config.schema, config.rootPath);

  return new Promise((resolve, reject) => {
    const path = __dirname + CONFIG_FILE_PATH;
    const data = JSON.stringify(config);

    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      }
      // TODO: deal permission errors
      resolve();
    });
  })
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
