var config = require('./config.tmp.json');
var serve = require('./server');
// switch (script) {
// case 'build':
// case 'eject':
// case 'start':
// case 'test':
// var result = spawn.sync(
//   'node',
//   [require.resolve('./server')].concat(args),
//   {stdio: 'inherit'}
// );
// process.exit(result.status);

serve(config);
