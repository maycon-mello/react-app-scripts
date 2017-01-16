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
    config.env = 'test';

    return prepareAndRun(config, 'test');
  },
}
