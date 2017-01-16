require('babel-register')({
  presets: [
     require.resolve('babel-preset-react'),
     require.resolve('babel-preset-es2015'),
     require.resolve('babel-preset-stage-0'),
  ],
  plugins: [
    require.resolve('babel-plugin-transform-flow-strip-types'),
  ]
});

const Mocha = require('mocha');
const Glob = require('glob');
const Chokidar = require('chokidar');
const config = require('../config.tmp.json');

function test() {
  Object.keys( require.cache ).forEach( key => delete require.cache[ key ] );

  const pattern = config.appSrc + '/**/*.spec.js';
  const mocha = new Mocha();

  Glob(pattern, {}, (err, files) => {
    files.forEach((file) => mocha.addFile(file));
    mocha.run((failures) => {
      process.on('exit', () => {
        process.exit(failures);
      });

      console.log('Watching for changes...');
    });
  });
}

function watch() {
  const watcher = Chokidar.watch(config.appSrc, {
    ignored: /[\/\\]\./,
    persistent: true,
  });

  watcher.on('change', () => test());
}

module.exports = function() {
  test();
  watch();
};