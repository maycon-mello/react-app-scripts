
const fs = require('fs');
const path = require('path');
const { graphql }  = require('graphql');
const { introspectionQuery, printSchema } = require('graphql/utilities');
const config = require('../config.tmp.json');

module.exports =  function() {
  let schemaPath = path.join(config.rootPath, config.schema.entry);
  //delete require.cache[require.resolve(schemaPath)];
  var Schema = require(schemaPath).default;
  // Save JSON of full schema introspection for Babel Relay Plugin to use
  return graphql(Schema, introspectionQuery).then(result => {

    console.log(result);
    return;
    if (result.errors) {
      console.error(
        'ERROR introspecting schema: ',
        JSON.stringify(result.errors, null, 2)
      );
    } else {
      fs.writeFileSync(
        path.join(config.rootPath, config.schema.json),
        JSON.stringify(result, null, 2)
      );
    }
    // Save user readable type system shorthand of schema
    console.log("write .graphql file");
    fs.writeFileSync(
      path.join(config.rootPath, config.schema.graphql),
      printSchema(Schema)
    );

    return result;
  }).catch(err => console.log(err));
}
