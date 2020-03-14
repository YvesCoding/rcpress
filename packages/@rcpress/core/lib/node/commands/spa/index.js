const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

const {
  WebpackLogPlugin,
  createSPAConfig,
  markdownLoader: { frontMatterEmitter }
} = require('@rcpress/webpack');

const fileWatcher = require('../../fileWatcher');
const createServer = require('../../server');
const prepare = require('../../prepare');
const buildSW = require('../../sw');

const { applyUserWebpackConfig, logger, resolveHostandPort } = require('@rcpress/util');

module.exports = async function dev(sourceDir, cliOptions = {}, isProd) {
  if (isProd) {
    process.env.NODE_ENV = 'production';
  }

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
  let config = createSPAConfig(options, cliOptions, isProd);

  let compilerDoneReporterOpts = {
    isProd
  };
  if (!isProd) {
    const resolvedOpts = await resolveHostandPort(
      cliOptions.port || options.siteConfig.port,
      cliOptions.host || options.siteConfig.host
    );

    compilerDoneReporterOpts = {
      ...compilerDoneReporterOpts,
      ...resolvedOpts,
      publicPath: options.siteData.base
    };
  }
  config.plugin('rcpress-log').use(WebpackLogPlugin, [compilerDoneReporterOpts]);

  config
    .plugin('html')
    // using a fork of html-webpack-plugin to avoid it requiring webpack
    // internals from an incompatible version.
    .use(require('vuepress-html-webpack-plugin'), [
      {
        template: path.resolve(__dirname, '../../templates/index.dev.html')
      }
    ]);

  if (!isProd) {
    // setup watchers to update options and dynamically generated files
    const update = () => {
      prepare(sourceDir).catch(err => {
        console.error(logger.error(chalk.red(err.stack), false));
      });
    };

    new fileWatcher(update, sourceDir).watch();

    // also listen for frontMatter changes from markdown files
    frontMatterEmitter.on('update', update);
  }

  config = config.toConfig();
  const userConfig = options.siteConfig.configureWebpack;
  if (userConfig) {
    config = applyUserWebpackConfig(userConfig, config, false /* isServer */, isProd);
  }

  if (!isProd) {
    await createServer(
      options,
      config,
      null,
      compilerDoneReporterOpts.host,
      compilerDoneReporterOpts.port
    );
  } else {
    return await new Promise((resolve, reject) => {
      webpack(config, async (err, stats) => {
        if (err) {
          reject(err);
        }

        // generate service worker config.
        if (options.siteData.serviceWorker) {
          await buildSW(options.outDir);
          resolve(true) /** successfully executed command */;
        }
      });
    });
  }

  return true; /** successfully executed command */
};
