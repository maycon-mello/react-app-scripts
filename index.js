const { prepareAndRun } = require('./lib/run');


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
