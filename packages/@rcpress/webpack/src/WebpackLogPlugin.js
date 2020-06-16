const { logger, getCurrentTime, chalk } = require('@rcpress/util');

module.exports = class WebpackLogPlugin {
  apply(compiler) {
    compiler.hooks.compile.tap('rcpress-log-compile', () => {
      const time = getCurrentTime();

      logger.wait(`${chalk.gray(`[${time}]`)} Compiling...`);
    });

    compiler.hooks.invalid.tap('rcpress-log-building', () => {
      const time = getCurrentTime();

      logger.wait(`${chalk.gray(`[${time}]`)} Building...`);
    });

    compiler.hooks.done.tap('rcpress-log-done', stats => {
      if (stats.compilation.errors && stats.compilation.errors.length) {
        for (const e of stats.compilation.errors) {
          logger.error(e.message || e);
        }
        return;
      }
      const time = getCurrentTime();

      logger.success(
        `${chalk.gray(`[${time}]`)} Build ${chalk.italic(
          stats.hash.slice(0, 6)
        )} finished in ${stats.endTime - stats.startTime} ms!`
      );
    });
  }
};
