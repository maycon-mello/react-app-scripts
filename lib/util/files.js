const fs = require('fs');

function fileExists(path) {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.F_OK, function(err) {
      resolve(!err);
    }); 
  });
}

module.exports = {
  fileExists,
}