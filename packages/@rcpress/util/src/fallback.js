const fs = require('fs-extra');

module.exports.fsExistsFallback = function fsExistsFallback(files) {
  for (const file of files) {
    if (fs.existsSync(file)) {
      return file;
    }
  }
};
