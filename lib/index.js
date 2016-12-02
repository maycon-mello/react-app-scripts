const { prepareAndRun } = require('./run');

module.exports = {
  serve(config) {
    return prepareAndRun(config, 'serve');
  },

  build(config) {
    console.log('Build isn\'t implemented yet. :(');
  },

  test(config) {
    console.log('Test isn\'t implemented yet. :(');
  },
}
