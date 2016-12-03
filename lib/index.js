const { prepareAndRun } = require('./run');

module.exports = {
  serve(config) {
    return prepareAndRun(config, 'serve');
  },

  build(config) {
    return prepareAndRun(config, 'build');
  },

  test(config) {
    console.log('Test isn\'t implemented yet. :(');
  },
}
