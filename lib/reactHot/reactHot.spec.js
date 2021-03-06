const { expect } = require('chai');
const reactHot = require('./reactHot');
const { fileExists } = require('../util/files');

const config = {
  rootPath: 'rootPathValue',
  entry: 'entryValue',
  reactHot: {
    enabled: true,
    wrapperId: 'wrapperIdValue',
  },
};

describe('React hot', () => {
  it('expect files to be created', (done) => {
    reactHot
      .apply(config)
      .then(() => {
        // Verify if files have been created
        let count = 0;
        let fileCounter = (exists) => exists ? count++ : null;

        Promise.all([
          fileExists(__dirname + '/reactHotApp.tmp.js').then(fileCounter),
          fileExists(__dirname + '/reactHotEntry.tmp.js').then(fileCounter),
        ])
        .then(() => {
          expect(count).to.be.equal(2);
          done();
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err));
  });
});


