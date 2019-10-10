module.exports = async function dev(sourceDir, cliOptions = {}, isProd) {
  if (isProd) {
    process.env.NODE_ENV = 'production';
  }

  const fs = require('fs-extra');
  const path = require('path');
  const chalk = require('chalk');
  const createServer = require('../../server');
  const fileWatcher = require('../../fileWatcher');

  const prepare = require('../../prepare');
  const {
    createSSRConfig,
    createSPAConfig,
    markdownLoader: { frontMatterEmitter }
  } = require('@rcpress/webpack');
  const { applyUserWebpackConfig, logger } = require('@rcpress/util');
  const PageRender = require('../../pageRender');

  logger.wait('\nExtracting site metadata...');
  const options = await prepare(sourceDir);

  if (isProd) {
    if (cliOptions.outDir) {
      options.outDir = cliOptions.outDir;
    }

    const { outDir } = options;
    if (path.resolve() === outDir) {
      return console.error(
        logger.error(
          chalk.red('Unexpected option: outDir cannot be set to the current working directory.\n'),
          false
        )
      );
    }
    await fs.remove(outDir);
  }

  // resolve webpack config
  let spaConfig = createSPAConfig(options, cliOptions, isProd, true /* isServer */).toConfig();
  let ssrConfig = createSSRConfig(options, cliOptions, isProd).toConfig();

  const userConfig = options.siteConfig.configureWebpack;
  if (userConfig) {
    ssrConfig = applyUserWebpackConfig(userConfig, ssrConfig, true /* isServer */, isProd);
    spaConfig = applyUserWebpackConfig(userConfig, spaConfig, true /* isServer */, isProd);
  }

  if (!isProd) {
    await createServer(
      options,
      cliOptions,
      spaConfig,
      ssrConfig,
      false /* use webpack-dev-server*/
    );

    // setup watchers to update options and dynamically generated files
    const update = () => {
      prepare(sourceDir).catch(err => {
        console.error(logger.error(chalk.red(err.stack), false));
      });
    };

    new fileWatcher(update, sourceDir).watch();
    // also listen for frontMatter changes from markdown files
    frontMatterEmitter.on('update', update);
  } else {
    const render = new PageRender();
  }
};
