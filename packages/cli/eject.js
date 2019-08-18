const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

function copyDir(from, to, dirName) {
  fs.copySync(path.resolve(from, dirName), path.resolve(to, dirName));
}

module.exports = root => {
  let themeDir;

  try {
    themeDir = path.dirname(
      require.resolve('antdsite', {
        paths: [process.cwd()]
      })
    );
  } catch (e) {
    console.error(
      chalk.red(`[AntdSite] Cannot find antdsite at ${root}, eject failed, process exit.`)
    );

    process.exit(1);
  }

  const themePath = path.resolve(root, '.antdsite/theme');

  fs.ensureDirSync(themePath);
  fs.copySync(path.resolve(themeDir, 'src/default-theme'), themePath);

  console.log();

  console.log(`You have successfully ejected at ${root}.`);
};
