'use strict';

/*
 * @author wangyi7099
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const serve = require('webpack-dev-server');

const {
  WebpackLogPlugin,
  createSPAConfig,
  createSSRConfig,
  markdownLoader: { frontMatterEmitter }
} = require('@rcpress/webpack');
const { applyUserWebpackConfig, logger, resolveAddress, getCurrentTime } = require('@rcpress/util');

const fileWatcher = require('../fileWatcher');
const buildSW = require('../sw');
const resolveOptions = require('../prepare/resolveOptions');
const { genRoutesFile } = require('../prepare/codegen');
const { writeTemp, createResolveThemeLayoutPath } = require('../prepare/util');
const getPageRenderer = require('./getPageRenderer');

class App {
  constructor(sourceDir, cliOptions) {
    this.cliOptions = cliOptions;
    this.sourceDir = sourceDir;
  }

  createModuleLogger(actionName) {
    const reatedLogger = () => {
      logger.wait(`${actionName.charAt(0).toUpperCase()}${actionName.slice(1)}...`);
    };

    reatedLogger.done = () => {
      logger.success(`${actionName.charAt(0).toUpperCase()}${actionName.slice(1)} has completed.`);
    };

    return reatedLogger;
  }

  async prepare() {
    const { sourceDir } = this;
    const prepareLogger = this.createModuleLogger('Collecting the site data');

    prepareLogger();

    // 1. load options
    const options = await resolveOptions(sourceDir);

    // 2. generate routes & user components registration code
    const routesCode = await genRoutesFile(options);
    // const componentCode = await genComponentRegistrationFile(options);

    await writeTemp(options.tempPath, 'routes.js', [routesCode].join('\n'));

    // 3. generate siteData
    const dataCode = `export const siteData = ${JSON.stringify(options.siteData, null, 2)}`;
    await writeTemp(options.tempPath, 'siteData.js', dataCode);

    // 4. handle user override
    const stylePath = path.resolve(sourceDir, '.rcpress/style.less').replace(/[\\]+/g, '/');
    const hasUserStyle = fs.existsSync(stylePath);
    await writeTemp(
      options.tempPath,
      'style.less',
      hasUserStyle ? `@import ${JSON.stringify(stylePath)};` : ``
    );

    // 5 write react-hot-loader config
    await writeTemp(
      options.tempPath,
      'rhlConfig.js',
      `
      // rhlConfig.js
      import { setConfig } from 'react-hot-loader';
      setConfig({ logLevel: 'debug'});
      `
    );

    // 5. handle enhanceApp.js
    // const enhanceAppPath = path.resolve(sourceDir, '.rcpress/enhanceApp.js');
    // await writeEnhanceTemp('enhanceApp.js', enhanceAppPath);

    // 6. handle the theme enhanceApp.js
    // await writeEnhanceTemp('themeEnhanceApp.js', options.themeEnhanceAppPath);

    this.options = options;
  }

  async createWebpackConfig(isServer, isProd) {
    const log = this.createModuleLogger('Creating webpack config');
    log();

    const { options, cliOptions } = this;
    // resolve webpack config
    let clientConfig = (this.clientWebpackConfig = createSPAConfig(
      options,
      cliOptions,
      isProd,
      isServer
    ));

    if (!isProd) {
      this.resolvedOpts = await resolveAddress(
        cliOptions.port || options.siteConfig.port,
        cliOptions.host || options.siteConfig.host
      );
    }

    // registry log plugin
    clientConfig.plugin('rcpress-log').use(WebpackLogPlugin);

    if (!isServer) {
      clientConfig
        .plugin('html')
        // using a fork of html-webpack-plugin to avoid it requiring webpack
        // internals from an incompatible version.
        .use(require('vuepress-html-webpack-plugin'), [
          {
            template: path.resolve(__dirname, '../templates/index.dev.html')
          }
        ]);
    } else {
      this.serverWebpackConfig = createSSRConfig(options, cliOptions, isProd).toConfig();
    }
    this.clientWebpackConfig = clientConfig.toConfig();

    const userConfig = options.siteConfig.configureWebpack;
    if (userConfig) {
      this.clientWebpackConfig = applyUserWebpackConfig(
        userConfig,
        this.clientWebpackConfig,
        false /* isServer */,
        isProd
      );
      if (isServer) {
        this.serverWebpackConfig = applyUserWebpackConfig(
          userConfig,
          this.serverWebpackConfig,
          true /* isServer */,
          isProd
        );
      }
    }
  }

  watchFile() {
    // setup watchers to update options and dynamically generated files
    const update = () => {
      this.prepare().catch(err => {
        console.error(logger.error(chalk.red(err.stack), false));
      });
    };

    new fileWatcher(update, this.sourceDir).watch();

    // also listen for frontMatter changes from markdown files
    frontMatterEmitter.on('update', update);
  }

  async process(isServer, isProd) {
    await this.prepare();
    await this.createWebpackConfig(isServer, isProd);

    if (!isProd) {
      this.watchFile();
    }

    return this;
  }

  async createDeveServer() {
    const log = this.createModuleLogger('Creating dev server');
    log();

    const { options, sourceDir } = this;
    const config = this.clientWebpackConfig;
    const { port, host } = this.resolvedOpts;
    const publicPath = path.resolve(sourceDir, '.rcpress/public');
    const contentBase = fs.existsSync(publicPath) ? publicPath : false;
    const compiler = webpack(config);

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
          ignored: [/node_modules(\\|\/)(?!@rcpress(\\|\/)core(\\|\/).temp)/]
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
            const express = require('express');
            
            app.use(options.siteConfig.base, express.static(contentBase));
          }
        }
      },
      options.siteConfig.devServer || {}
    );

    const error = await new Promise((resolve, reject) => {
      try {
        new serve(compiler, serverConfig).listen(port, host, resolve);
      } catch (error) {
        reject(error);
      }
    });

    if (error) {
      throw error;
    }

    this.serverReady();
  }

  async createSSRServer() {
    const log = this.createModuleLogger('Creating ssr server');
    log();

    const http = require('http');
    const express = require('express');
    const compression = require('compression');
    const Render = require('../pageRender');

    const { clientWebpackConfig, serverWebpackConfig, options, resolvedOpts } = this;
    let renderer;
    const app = express();
    http.createServer(app).listen(resolvedOpts.port, resolvedOpts.host);

    const templatePath = path.resolve(__dirname, '../templates/index.ssr.html');

    let { readyPromise, clientMfs } = require('./stepCustomServer')(
      clientWebpackConfig,
      serverWebpackConfig,
      app,
      templatePath,
      (bundle, options) => {
        renderer = new Render(bundle, options, clientMfs);
      }
    );

    const contentBase = path.resolve(options.sourceDir, '.rcpress/public');

    app.use(compression({ threshold: 0 }));
    app.use(options.siteData.base, express.static(contentBase));

    function render(req, res) {
      const s = Date.now();

      const handleError = err => {
        if (err.url) {
          res.redirect(err.url);
        } else if (err.code === 404) {
          res.status(404).send('404 | Page Not Found');
        } else {
          // Render Error Page or Redirect
          res.status(500).send('500 | Internal Server Error');
          logger.error(`error during render : ${req.url}`);
          logger.error(err.stack);
        }
      };

      const context = {
        url: req.url
      };
      renderer
        .renderToString(context)
        .then(html => {
          res.send(html);
          logger.tip(
            `${chalk.gray(`[${getCurrentTime()}]`)} Finish the request ${req.url} in  ${Date.now() -
              s}ms`
          );
        })
        .catch(err => {
          return handleError(err);
        });
    }

    app.get('*', (req, res) => {
      readyPromise.then(() => render(req, res));
    });

    this.serverReady();
  }

  serverReady() {
    const { displayHost, port } = this.resolvedOpts;
    const { base } = this.options.siteConfig;
    logger.success(
      `RcPress server listening at ${chalk.cyan(`http://${displayHost}:${port}${base}\n`)}`
    );
  }

  // commands area

  async dev() {
    await this.process(false, false);
    await this.createDeveServer();
  }

  async serve() {
    await this.process(true, false);
    await this.createSSRServer();
  }

  async build() {
    await this.process(false, true);

    const { clientWebpackConfig, options } = this;
    // start building...
    const log = this.createModuleLogger('building');
    log();

    await new Promise((resolve, reject) => {
      webpack(clientWebpackConfig, async (err, stats) => {
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

    log.done();
  }

  async generate() {
    await this.process(true, true);

    const log = this.createModuleLogger('generating');
    log();

    const { serverWebpackConfig, clientWebpackConfig, options } = this;

    // get page render...
    const renderer = await getPageRenderer(serverWebpackConfig, clientWebpackConfig, options);
    // generating pages..
    await renderer.renderPages(options.siteData.pages);

    // generate service worker.
    if (options.siteData.serviceWorker) {
      await buildSW(options.outDir);
      log.done();
    }
  }

  async eject() {
    const { sourceDir: dir } = this;
    const resolveThemeLayoutPath = createResolveThemeLayoutPath(dir);
    const defaultThemeLayoutPath = resolveThemeLayoutPath('@rcpress/theme-default');
    const source = path.dirname(defaultThemeLayoutPath);
    const target = path.resolve(dir, '.rcpress/theme');
    await fs.copy(source, target);

    logger.success(`Copied default theme into ${chalk.cyan(target)}.\n`);
  }
}

module.exports = App;
