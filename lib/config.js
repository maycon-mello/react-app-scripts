const path = require('path');
const fs = require('fs');

const CONFIG_FILE_PATH = path.resolve(__dirname, './config.tmp.json');

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

      resolve();
    });
  })
}

function shouldResolve(value) {
  return value && value.indexOf && value.indexOf('./') === 0;
}
/**
 * 
 * Resolves relative paths into absolute paths
 *
 */
function resolvePaths(values, rootPath) {
  for (var key in values) {
    let val = values[key]
    if (shouldResolve(val)) {
      values[key] = path.join(rootPath, values[key]);
    } else if (typeof val === 'object'){
      resolvePaths(val, rootPath);
    }
  }

  if (values.length > 0) {
    values.forEach((value, idx) => {
      if (shouldResolve(value)) {
        values[idx] = path.join(rootPath, value);
      }
    });
  }
}

module.exports = {
  write,
  resolvePaths,
};