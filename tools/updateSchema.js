require('babel-register')({
  "presets": [
     require.resolve('babel-preset-es2015'),
     require.resolve('babel-preset-stage-0'),
  ],
});

const fs = require('fs');
const path = require('path');
const config = require('../config.tmp.json');
const schemaPath = config.schema.entry;
const graphqlPath = path.join(config.rootPath, '/node_modules/graphql');
const graphqlUtilitiesPath = path.join(graphqlPath, '/utilities');

module.exports =  function() {
  delete require.cache[require.resolve(schemaPath)];
  const Schema = require(schemaPath).default;
  const { graphql } = require(graphqlPath);
  const { introspectionQuery, printSchema } = require(graphqlUtilitiesPath);

  // Save JSON of full schema introspection for Babel Relay Plugin to use
  return graphql(Schema, introspectionQuery).then(result => {
    if (result.errors) {
      console.error(
        'ERROR introspecting schema: ',
        JSON.stringify(result.errors, null, 2)
      );
      return result;
    }

    fs.writeFileSync(
      config.schema.json,
      JSON.stringify(result, null, 2)
    );

    fs.writeFileSync(
      config.schema.graphql,
      printSchema(Schema)
    );

    return result;
  }).catch(err => console.log(err));
}
