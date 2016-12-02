require('babel-register')({
  "presets": [
     require.resolve('babel-preset-es2015'),
     require.resolve('babel-preset-stage-0'),
  ],
});

const fs = require('fs');
const path = require('path');

const Logger = require('./logger');
const config = require('../config.tmp.json');


const schemaPath = config.schema.entry;
const graphqlPath = path.join(config.rootPath, '/node_modules/graphql');
const graphqlUtilitiesPath = path.join(graphqlPath, '/utilities');

function cleanCache() {
  for (let key in require.cache) {
    if (key.indexOf(config.schema.watch) > -1) {
      delete require.cache[key];
    }
  }
}

module.exports =  function() {
  Logger.debug('Updating schema at: ' + schemaPath);

  cleanCache();

  const Schema = require(schemaPath).default;
  const { graphql } = require(graphqlPath);
  const { introspectionQuery, printSchema } = require(graphqlUtilitiesPath);

  return graphql(Schema, introspectionQuery).then(result => {
    if (result.errors) {
      let errors = JSON.stringify(result.errors, null, 2);
      console.error('ERROR introspecting schema: ', errors);
      return result;
    }

    Logger.debug('Writing schema .json at: ' + config.schema.json);

    fs.writeFileSync(
      config.schema.json,
      JSON.stringify(result, null, 2)
    );

    Logger.debug('Writing schema .graphql at: ' + config.schema.json);

    fs.writeFileSync(
      config.schema.graphql,
      printSchema(Schema)
    );

    Logger.debug('Schema updated.');

    return result;
  }).catch(err => console.log(err));
}
