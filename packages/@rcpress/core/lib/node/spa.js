module.exports = async function dev(sourceDir, cliOptions = {}, isProd) {
  if (isProd) {
    process.env.NODE_ENV = 'production';
  }

  const fs = require('fs-extra');
  const path = require('path');
  const chalk = require('chalk');
  const webpack = require('webpack');
  const serve = require('webpack-dev-server');
  const fileWatcher = require('./fileWatcher');

  const prepare = require('./prepare');
  const {
    WebpackLogPlugin,
    createSPAConfig,
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
  let config = createSPAConfig(options, cliOptions, isProd);
  let host = cliOptions.host || options.siteConfig.host;
  let port;

  config
    .plugin('html')
    // using a fork of html-webpack-plugin to avoid it requiring webpack
    // internals from an incompatible version.
    .use(require('vuepress-html-webpack-plugin'), [
      {
        template: path.resolve(__dirname, './index.dev.html')
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

    port = await resolvePort(cliOptions.port || options.siteConfig.port);
    const { displayHost } = await resolveHost(host);

    config.plugin('rcpress-log').use(WebpackLogPlugin, [
      {
        port,
        displayHost,
        publicPath: options.publicPath,
        isProd: false
      }
    ]);
  } else {
    config.plugin('rcpress-log').use(WebpackLogPlugin, [
      {
        isProd: true
      }
    ]);
  }

  config = config.toConfig();
  const userConfig = options.siteConfig.configureWebpack;
  if (userConfig) {
    config = applyUserWebpackConfig(userConfig, config, false /* isServer */, isProd);
  }

  const compiler = webpack(config);

  if (!isProd) {
    const contentBase = path.resolve(sourceDir, '.rcpress/public');

    const serverConfig = Object.assign(
      {
        disableHostCheck: true,
        compress: true,
        clientLogLevel: 'error',
        hot: true,
        quiet: true,
        headers: {
          'access-control-allow-origin': '*'
        },
        open: options.siteConfig.open,
        publicPath: options.siteConfig.base,
        watchOptions: {
          ignored: [/node_modules/]
        },
        historyApiFallback: {
          disableDotRule: true,
          rewrites: [
            {
              from: /./,
              to: path.posix.join(options.siteConfig.base, 'index.html')
            }
          ]
        },
        overlay: false,
        contentBase,
        before: app => {
          // respect base when serving static files...
          if (fs.existsSync(contentBase)) {
            app.use(options.siteConfig.base, require('express').static(contentBase));
          }
        }
      },
      options.siteConfig.devServer || {}
    );

    const error = await new Promise(resolve => {
      try {
        new serve(compiler, serverConfig).listen(port, host, resolve);
      } catch (error) {
        resolve(error);
      }
    });

    if (error) {
      throw error;
    }
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
