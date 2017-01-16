const spawn = require('cross-spawn');
const scriptsPath = require.resolve('./scripts');
const reactHot = require('./reactHot');
const { resolvePaths, write } = require('./config');

/**
 * Run the given script
 *
 */
function run(script, config) {
  let params = []
  if (script === 'serve' && config.dashboard !== false) {
    params = params.concat([
      require.resolve('webpack-dashboard/bin/webpack-dashboard.js'),
      '--',
      'node',
    ]);
  }
  params.push(scriptsPath);
  params.push(' ' + script);

  const options = { stdio: 'inherit' };
  
  const result = spawn.sync('node', params, options);
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

  // Enable cache by default
  if (config.cache !== false) {
    config.cache = true;
  }

  // Create the react hot loader entry point if it is enabled
  return reactHot.apply(config)
    // Write config file
    .then(() => write(config))
    // Run the script
    .then(() => run(script, config))
    .catch(err => console.log(err));
}


module.exports = {
  prepareAndRun,
}