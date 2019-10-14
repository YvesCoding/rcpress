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
    WebpackLogPlugin,
    createSSRConfig,
    createSPAConfig,
    markdownLoader: { frontMatterEmitter }
  } = require('@rcpress/webpack');

  const { applyUserWebpackConfig, logger, resolveHostandPort } = require('@rcpress/util');
  const PageRender = require('../../pageRender');

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

    compilerDoneReporterOpts = { ...compilerDoneReporterOpts, ...resolvedOpts };
  }
  spaConfig.plugin('rcpress-log').use(WebpackLogPlugin, [compilerDoneReporterOpts]);

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
    ssrConfig = applyUserWebpackConfig(
      userConfig,
      ssrConfig.toConfig(),
      true /* isServer */,
      isProd
    );
    spaConfig = applyUserWebpackConfig(
      userConfig,
      spaConfig.toConfig(),
      true /* isServer */,
      isProd
    );
  }

  if (!isProd) {
    await createServer(
      options,
      spaConfig,
      ssrConfig,
      host,
      port,
      false /* use webpack-dev-server*/
    );
  } else {
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

    const webpack = require('webpack');
    webpack([ssrConfig, spaConfig], (err, stat) => {
      if (err) {
        throw error;
      }

      const stats = stat.stats;
      const renderer = new PageRender(stats[0].toJson(), {
        clientManifest: stats[1].toJson(),
        template: fs.readFileSync(
          path.resolve(__dirname, '../../templates/index.ssr.html'),
          'utf-8'
        ),
        outDir
      });

      renderer.renderPages(options.siteData.pages);
    });
  }
};
