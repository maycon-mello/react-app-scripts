const spawn = require('cross-spawn');
const scriptsPath = require.resolve('./scripts');
const reactHot = require('./reactHot');
const { resolvePaths, write } = require('./config');

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
 * Write the config file and run a script ('serve', 'build', 'test')
 * @param {Object} config
 * @param {String} script - some like 'serve', 'build', 'test'
 * @return {Promise}
 */
function prepareAndRun(config, script) {
  // Resolve config paths
  resolvePaths(config, config.rootPath);
  resolvePaths(config.schema, config.rootPath);

  // Enable cache by default
  if (config.cache !== false) {
    config.cache = true;
  }

  // Create the react hot loader entry point if it is enabled
  return reactHot.apply(config)
    // Write config file
    .then(() => write(config))
    // Run the script
    .then(() => run(script))
    .catch(err => console.log(err));
}


module.exports = {
  prepareAndRun,
}