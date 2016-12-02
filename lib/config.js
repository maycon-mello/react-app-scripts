const path = require('path');
const fs = require('fs');

const CONFIG_FILE_PATH = path.resolve(__dirname, '../config.tmp.json');

/**
 * Write the config file on the disk
 *
 */
function write(config) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(config);

    fs.writeFile(CONFIG_FILE_PATH, data, (err) => {
      if (err) {
        reject(err);
      }
      // TODO: deal with permission errors
      resolve();
    });
  })
}

/**
 * 
 * Resolves relative paths into absolute paths
 *
 */
function resolvePaths(values, rootPath) {
  for (var key in values) {
    if (values[key].indexOf && values[key].indexOf('./') === 0) {
      values[key] = path.join(rootPath, values[key]);
    }
  }
}

module.exports = {
  write,
  resolvePaths,
};