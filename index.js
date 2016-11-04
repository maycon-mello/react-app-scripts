var spawn = require('cross-spawn');
const exec = require('child_process').exec;
const fs = require('fs')
// switch (script) {
// case 'build':
// case 'eject':
// case 'start':
// case 'test':

// let args = 'serve';
// 
// console.log("ooo");
// function runServe() {
//   console.log(__dirname)
//   process.chdir(__dirname);
//   exec('node scripts', (error, stdout, stderr) => {
//     console.log(stdout);
//     console.log(stderr);
//   });

// }
function runServe() {
  process.chdir(__dirname);
  console.log('node ' + require.resolve('./scripts'));
  const result = spawn.sync(
    'node',
    [require.resolve('./scripts')].concat(' serve'),
    {stdio: 'inherit'}
  );
  process.exit(result.status);
}

function writeConfig(config, callback) {
  fs.writeFile(__dirname + '/config.tmp.json', JSON.stringify(config), callback);
}

module.exports = {
  serve(config) {
    writeConfig(config, runServe)
  }
}
//   break;
// default:
//   console.log('Unknown script "' + script + '".');
//   console.log('Perhaps you need to update react-scripts?');
//   break;
// }