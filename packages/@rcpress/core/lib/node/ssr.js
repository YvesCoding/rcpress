module.exports = async function dev(sourceDir, cliOptions = {}, isProd) {
  if (isProd) {
    process.env.NODE_ENV = 'production';
  }

  const fs = require('fs-extra');
  const path = require('path');
  const chalk = require('chalk');
  const chokidar = require('chokidar');
  const createServer = require('./serve');
  const http = require('http');
  const express = require('express');

  const prepare = require('./prepare');
  const {
    createSSRConfig,
    createSPAConfig,
    WebpackLogPlugin,
    markdownLoader: { frontMatterEmitter }
  } = require('@rcpress/webpack');
  const { applyUserWebpackConfig, logger } = require('@rcpress/util');

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
  let spaConfig = createSPAConfig(options, cliOptions, isProd, true);
  let ssrConfig = createSSRConfig(options, cliOptions, isProd);

  if (!isProd) {
    const app = express();

    const port = await resolvePort(cliOptions.port || options.siteConfig.port);
    const { host, displayHost } = await resolveHost(cliOptions.host || options.siteConfig.host);

    http.createServer(app).listen(port, host);

    ssrConfig.plugin('rcpress-log').use(WebpackLogPlugin, [
      {
        port,
        displayHost,
        publicPath: options.publicPath,
        isProd
      }
    ]);

    spaConfig = spaConfig.toConfig();
    ssrConfig = ssrConfig.toConfig();
    const userConfig = options.siteConfig.configureWebpack;
    if (userConfig) {
      ssrConfig = applyUserWebpackConfig(userConfig, ssrConfig, true /* isServer */, isProd);
      spaConfig = applyUserWebpackConfig(userConfig, spaConfig, true /* isServer */, isProd);
    }

    createServer({
      app,
      ssrConfig,
      spaConfig,
      templatePath: path.resolve(__dirname, './index.ssr.html'),
      options
    });

    // setup watchers to update options and dynamically generated files
    const update = () => {
      prepare(sourceDir).catch(err => {
        console.error(logger.error(chalk.red(err.stack), false));
      });
    };

    // watch add/remove of files
    const pagesWatcher = chokidar.watch(
      ['**/*.mdx?', '.rcpress/components/**/*.jsx?', '.rcpress/components/**/*.tsx?'],
      {
        cwd: sourceDir,
        ignored: '.rcpress/**/*.md',
        ignoreInitial: true
      }
    );
    pagesWatcher.on('add', update);
    pagesWatcher.on('unlink', update);
    pagesWatcher.on('addDir', update);
    pagesWatcher.on('unlinkDir', update);

    // watch config file
    const configWatcher = chokidar.watch(
      ['.rcpress/config.js', '.rcpress/config.yml', '.rcpress/config.toml'],
      {
        cwd: sourceDir,
        ignoreInitial: true
      }
    );
    configWatcher.on('change', update);

    // also listen for frontMatter changes from markdown files
    frontMatterEmitter.on('update', update);
  }
};

function resolveHost(host) {
  // webpack-serve hot updates doesn't work properly over 0.0.0.0 on Windows,
  // but localhost does not allow visiting over network :/
  const defaultHost = process.platform === 'win32' ? 'localhost' : '0.0.0.0';
  host = host || defaultHost;
  const displayHost = host === defaultHost && process.platform !== 'win32' ? 'localhost' : host;
  return {
    displayHost,
    host
  };
}

async function resolvePort(port) {
  const portfinder = require('portfinder');
  portfinder.basePort = parseInt(port) || 8080;
  port = await portfinder.getPortPromise();
  return port;
}
