const { prepareAndRun } = require('./run');

module.exports = {
  serve(config) {
    config.env = 'dev';

    return prepareAndRun(config, 'serve');
  },

  build(config) {
    config.env = 'prod';

    return prepareAndRun(config, 'build');
  },

  test(config) {
    console.log('Test isn\'t implemented yet. :(');
  },
}
