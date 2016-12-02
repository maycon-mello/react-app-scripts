const path = require('path');
const templates = require('../templates');

const REACT_HOT_ENTRY = path.resolve(__dirname, './reactHotEntry.tmpl.js');
const REACT_HOT_APP = path.resolve(__dirname, './reactHotApp.tmpl.js');

const pathTransform = (path) => path.replace(/\.tmpl/, '.tmp');

/**
 *
 *
 *
 */
function createHotEntry(config) {
  return Promise.all([
    // Hot entry
    templates.parse(REACT_HOT_ENTRY, pathTransform, (data) => {
      return data
        .replace(/<%ROOT_PATH%>/g, config.rootPath)
        .replace(/<%WRAPPER_ID%>/g, config.reactHot.renderWrapperId);
    }),

    // App wrapper
    templates.parse(REACT_HOT_APP, pathTransform, (data) => {
      return data.replace(/<%APP_ENTRY%>/g, config.entry);
    }),
  ]);
}

/**
 *
 *
 */
function updateAppEntry(config) {
  config.entry = path.resolve(__dirname, './reactHotEntry.tmp.js');
}

function apply(config) {
  if (!config.reactHot || !config.reactHot.enabled) {
    return Promise.resolve(config);
  }

  console.log("Creating react hot loader wrapper...");

  return createHotEntry(config).then(updateAppEntry.bind(null, config));
}

module.exports = {
  apply,
}