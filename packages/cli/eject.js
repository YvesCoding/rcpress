const fs = require('fs-extra');
const path = require('path');
var msg = require('./message');

module.exports = root => {
  let themeDir;

  try {
    themeDir = path.dirname(
      require.resolve('antdsite', {
        paths: [process.cwd()]
      })
    );
  } catch (e) {
    console.error(msg.error(`Cannot find antdsite at ${root}, eject failed, process exit.`));

    process.exit(1);
  }

  const themePath = path.resolve(root, '.antdsite/theme');

  fs.ensureDirSync(themePath);
  fs.copySync(path.resolve(themeDir, 'src/default-theme'), themePath);

  console.log();

  console.log(`You have successfully ejected at ${root}.`);
};
