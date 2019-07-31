const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;
const chalk = require('chalk');

function tryGitInit(appPath) {
  let didInit = false;
  try {
    execSync('git --version', { stdio: 'ignore' });
    if (isInGitRepository() || isInMercurialRepository()) {
      return false;
    }

    execSync('git init', { stdio: 'ignore' });
    didInit = true;

    execSync('git add -A', { stdio: 'ignore' });
    execSync('git commit -m "Initial commit from Create Antd Site"', {
      stdio: 'ignore'
    });
    return true;
  } catch (e) {
    if (didInit) {
      // If we successfully initialized but couldn't commit,
      // maybe the commit author config is not set.
      // In the future, we might supply our own committer
      // like Ember CLI does, but for now, let's just
      // remove the Git files to avoid a half-done state.
      try {
        // unlinkSync() doesn't work on directories.
        fs.removeSync(path.join(appPath, '.git'));
      } catch (removeErr) {
        // Ignore.
      }
    }
    return false;
  }
}

function writeTemplate(appPath) {
  const templatePath = path.resolve(__dirname, 'template');

  if (fs.existsSync(templatePath)) {
    fs.copySync(templatePath, appPath);
  } else {
    console.error(
      `Could not locate supplied template: ${chalk.green(templatePath)}`
    );
    return;
  }
}

function showSuccessTips(appPath, appName, useYarn, originalDirectory) {
  const displayedCommand = useYarn ? 'yarn' : 'npm';
  let cdpath;
  if (originalDirectory && path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log();

  console.log(`You have successfully created ${appName} at ${appPath}.`);
  console.log('Inside that directory, you can run several commands:');

  console.log();

  console.log(
    chalk.hex('#29CDFF')(`  ${displayedCommand} ${useYarn ? '' : 'run '}start`)
  );
  console.log(`    start the development server.`);

  console.log();

  console.log(
    chalk.hex('#29CDFF')(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`)
  );
  console.log(`    Build a static website.`);

  console.log();

  console.log(
    chalk.hex('#29CDFF')(`  ${displayedCommand} ${useYarn ? '' : 'run '}eject`)
  );
  console.log(
    `    copy the default theme to .antdsite/theme of the created app directory.`
  );

  console.log();

  console.log('We suggest that you begin by typing:');
  console.log();

  console.log(chalk.hex('#29CDFF')('  cd'), cdpath);
  console.log(`  ${chalk.hex('#29CDFF')(`${displayedCommand} start`)}`);
}

module.exports = function(appPath, appName, useYarn, originalDirectory) {
  writeTemplate(appPath);

  tryGitInit(appPath);

  showSuccessTips(appPath, appName, useYarn, originalDirectory);
};
