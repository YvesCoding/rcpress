const chalk = require('chalk');
const { logger } = require('@rcpress/util');

module.exports = class WebpackLogPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    let isFirst = true;
    compiler.hooks.done.tap('rcpress-log', stats => {
      clearScreen();
      const { displayHost, port, publicPath, isProd } = this.options;
      if (stats.compilation.errors && stats.compilation.errors.length) {
        for (const e of stats.compilation.errors) {
          logger.error(e.message);
        }
      }
      const time = new Date().toTimeString().match(/^[\d:]+/)[0];

      logger.success(
        `\n${chalk.gray(`[${time}]`)} Build ${chalk.italic(
          stats.hash.slice(0, 6)
        )} finished in ${stats.endTime - stats.startTime} ms!`
      );

      if (isFirst && !isProd) {
        isFirst = false;
        console.log(
          `\n${chalk.gray('>')} RcPress dev server listening at ${chalk.cyan(
            `http://${displayHost}:${port}${publicPath}`
          )}`
        );
        compiler.hooks.invalid.tap('rcpress-log', clearScreen);
      }
    });
  }
};

function clearScreen() {
  process.stdout.write('\x1Bc');
}
