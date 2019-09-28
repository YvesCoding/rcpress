const chokidar = require('chokidar');

class fileWatcher {
  constructor(callback, sourceDir) {
    this.callback = callback;
    this.sourceDir = sourceDir;
  }

  watch() {
    const sourceDir = this.sourceDir;
    const callback = this.callback;

    // watch add/remove of files
    const pagesWatcher = chokidar.watch(
      [
        '**/*.md',
        '**/*.MD',
        '**/*.mdx',
        '**/*.MDX',
        '.rcpress/components/**/*.jsx?',
        '.rcpress/components/**/*.tsx?'
      ],
      {
        cwd: sourceDir,
        ignored: '.rcpress/**/*.md',
        ignoreInitial: true
      }
    );
    pagesWatcher.on('add', callback);
    pagesWatcher.on('unlink', callback);
    pagesWatcher.on('addDir', callback);
    pagesWatcher.on('unlinkDir', callback);

    // watch config file
    const configWatcher = chokidar.watch(
      ['.rcpress/config.js', '.rcpress/config.yml', '.rcpress/config.toml'],
      {
        cwd: sourceDir,
        ignoreInitial: true
      }
    );
    configWatcher.on('change', callback);
  }
}

module.exports = fileWatcher;
