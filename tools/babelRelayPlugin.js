var fs = require('fs');
var path = require('path');
var getbabelRelayPlugin = require('babel-relay-plugin');

let lastSchema = '';
let adapter;
let initRef;

const SCHEMA_PATH = './schema.json';

function getAdapter() {
  if (!fs.existsSync(SCHEMA_PATH)) {
    return null;
  }

  delete require.cache[require.resolve(SCHEMA_PATH)];
  let schema = require(SCHEMA_PATH);
  let schemaString = JSON.stringify(schema.data);

  // Verify if json have changed and create a new adapter
  if (schemaString !== lastSchema) {
    lastSchema = schemaString;
    adapter = getbabelRelayPlugin(schema.data)(initRef);
  }

  return adapter;
}

module.exports = function(_ref) {
  initRef = _ref;
  return {
    visitor: {
      Program: function (_ref2, state) {
        let adapter = getAdapter();
        if (adapter) {
          adapter.visitor.Program(_ref2, state);
        }
      },
      TaggedTemplateExpression: function(path, state) {
        let adapter = getAdapter();
        if (adapter) {
          getAdapter().visitor.TaggedTemplateExpression(path, state);
        }
      }
    }
  };
};
