let shouldDebug = false;

function setDebug(value) {
  shouldDebug = value;
}

function debug() {
  if (shouldDebug) {
    console.log.apply(null, arguments);
  }
}

function info() {
  console.log.apply(null, arguments);
}

module.exports = {
  setDebug,
  debug,
  info,
};