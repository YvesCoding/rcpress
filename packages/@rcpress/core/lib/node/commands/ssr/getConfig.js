const chalk = require('chalk');
const fileWatcher = require('../../fileWatcher');

const prepare = require('../../prepare');
const {
  WebpackLogPlugin,
  createSSRConfig,
  createSPAConfig,
  markdownLoader: { frontMatterEmitter }
} = require('@rcpress/webpack');

const { applyUserWebpackConfig, logger, resolveHostandPort } = require('@rcpress/util');

module.exports = async function dev(sourceDir, cliOptions = {}, isProd) {
  if (isProd) {
    process.env.NODE_ENV = 'production';
  }

  logger.wait('\nExtracting site metadata...');
  const options = await prepare(sourceDir);
  if (cliOptions.outDir) {
    options.outDir = cliOptions.outDir;
  }

  // resolve webpack config
  let spaConfig = createSPAConfig(options, cliOptions, isProd, true /* isServer */);
  let ssrConfig = createSSRConfig(options, cliOptions, isProd);

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

  spaConfig.plugin('rcpress-log').use(WebpackLogPlugin, [compilerDoneReporterOpts]);

  spaConfig = spaConfig.toConfig();
  ssrConfig = ssrConfig.toConfig();

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

  const userConfig = options.siteConfig.configureWebpack;
  if (userConfig) {
    ssrConfig = applyUserWebpackConfig(userConfig, ssrConfig, true /* isServer */, isProd);
    spaConfig = applyUserWebpackConfig(userConfig, spaConfig, false /* isServer */, isProd);
  }

  return [ssrConfig, spaConfig, options];
};
