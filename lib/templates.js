const fs = require('fs');

function parse(path, pathTransform, dataTransform) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }

      data = dataTransform(data);
      path = pathTransform(path);

      fs.writeFile(path, data, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });  
  });
}

module.exports = {
  parse,
}