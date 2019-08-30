const fs = require('fs-extra');
const path = require('path');
var msg = require('./message');

const EXCLUDED_FILES = ['__tests__', '.npmignore', 'package.json', 'node_modules', 'README.md'];

module.exports = root => {
  let themeDir;

  try {
    themeDir = path.dirname(
      require.resolve('antdsite-default-theme', {
        paths: [process.cwd()]
      })
    );
  } catch (e) {
    console.error(msg.error(`Cannot find antdsite at ${root}, eject failed, process exit.`));

    process.exit(1);
  }

  const themePath = path.resolve(root, '.antdsite/theme');

  fs.ensureDirSync(themePath);
  fs.copySync(themeDir, themePath, {
    filter: function(src) {
      const relative = path.relative(sourceDir, src);
      if (EXCLUDED_FILES.includes(relative)) {
        return false;
      }

      return true;
    }
  });

  console.log();

  console.log(`You have successfully ejected at ${root}.`);
};
