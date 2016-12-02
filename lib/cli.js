const fs = require('fs');
const path = require('path');

const index = require('./index.js')

const scriptName = process.argv[2].trim();
const dirName = process.cwd();
const rcFilePath = path.join(dirName, '.scriptsrc');

// global config
const gConfig = JSON.parse(fs.readFileSync(rcFilePath, 'utf8'));

switch (scriptName) {
  case 'serve': {
    let config = gConfig.serve;
    config.entry = gConfig.entry;
    config.rootPath = dirName;
    config.schema = Object.assign(config.schema, gConfig.schema);

    index.serve(config);
    break;
  }

  case 'build': {
    let config = gConfig.build;
    index.build(config);
    break;
  }

  case 'test': {
    let config = gConfig.test;
    index.test(config);
    break;
  }

  default: {
    console.log(scriptName + ' command not found.');
  }
}

