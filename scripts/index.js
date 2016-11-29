const serve = require('./serve');
const build = require('./build');
const test = require('./test');

const scriptName = process.argv[2].trim();

switch (scriptName) {
  case 'serve': {
    console.log('Running serve script...');
    serve();
    break;
  }

  case 'build': {
    console.log('Running build script...');
    build();
    break;
  }

  case 'test': {
    console.log('Running test script...');
    test();
    break;
  }

  default: {
    console.log(scriptName + ' script not found.');
  }
}