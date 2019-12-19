const path = require('path');
const fs = require('fs-extra');

const getSourceDirs = currentDir => {
  const docsBaseDir = path.resolve(currentDir, 'fixtures');
  const docsModeNames = fs.readdirSync(docsBaseDir);
  return docsModeNames.map(name => {
    const docsPath = path.resolve(docsBaseDir, name);
    const docsTempPath = path.resolve(docsPath, '.rcpress/.temp');
    return { name, docsPath, docsTempPath };
  });
};

module.exports.getSourceDirs = getSourceDirs;
