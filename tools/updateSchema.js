
const fs = require('fs');
const path = require('path');
const { graphql }  = require('graphql');
const { introspectionQuery, printSchema } = require('graphql/utilities');

module.exports =  function(schemaPath) {
  delete require.cache[require.resolve(schemaPath)];
  var Schema = require(schemaPath).default;
  // Save JSON of full schema introspection for Babel Relay Plugin to use
  return graphql(Schema, introspectionQuery).then(result => {
    if (result.errors) {
      console.error(
        'ERROR introspecting schema: ',
        JSON.stringify(result.errors, null, 2)
      );
    } else {
      fs.writeFileSync(
        path.join(__dirname, './tools/schema.json'),
        JSON.stringify(result, null, 2)
      );
    }
    // Save user readable type system shorthand of schema
    fs.writeFileSync(
      path.join(__dirname, './tools/schema.graphql'),
      printSchema(Schema)
    );

    return result;
  }).catch(err => console.log(err));
}
