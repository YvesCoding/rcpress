const { logger, chalk } = require('@rcpress/util');

module.exports = class WebpackLogPlugin {
  apply(compiler) {
    compiler.hooks.compile.tap('rcpress-log-compile', () => {
      logger.wait(`Compiling...`);
    });

    compiler.hooks.invalid.tap('rcpress-log-building', () => {
      logger.wait(`Building...`);
    });

    compiler.hooks.done.tap('rcpress-log-done', stats => {
      if (stats.compilation.errors && stats.compilation.errors.length) {
        for (const e of stats.compilation.errors) {
          logger.error(e.message || e);
        }
        return;
      }

      logger.success(
        `Build ${chalk.italic(stats.hash.slice(0, 6))} finished in ${stats.endTime -
          stats.startTime} ms!`
      );
    });
  }
};
