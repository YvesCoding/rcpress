'use strict';

/*
 * @author wangyi7099
 */

const path = require('path');
const webpack = require('webpack');
const serve = require('webpack-dev-server');
const express = require('express');
const chokidar = require('chokidar');
const {
  WebpackLogPlugin,
  createClientConfig,
  createSSRConfig,
  markdownLoader: { frontMatterEmitter }
} = require('@rcpress/webpack');
const { applyUserWebpackConfig, fs, chalk, logger, resolveAddress } = require('@rcpress/util');

const fileWatcher = require('./fileWatcher');
const buildSW = require('./sw');
const resolveOptions = require('./prepare/resolveOptions');
const { genRoutesFile } = require('./prepare/codegen');
const { createResolveThemeLayoutPath } = require('./prepare/util');
const PageRender = require('./pageRender');
const PluginManager = require('./PluginManager');
const tempCache = new Map();

class App {
  constructor(sourceDir, cliOptions = {}) {
    this.cliOptions = cliOptions;
    this.sourceDir = sourceDir;
    this.pluginMgr = new PluginManager(this);
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

  async writeTemp(file, content) {
    const { tempPath } = this.options;
    // cache write to avoid hitting the dist if it didn't change
    const fileFullPath = path.join(tempPath, file);
    const cached = tempCache.get(fileFullPath);
    if (cached !== content) {
      fs.ensureFileSync(fileFullPath);
      await fs.writeFile(fileFullPath, content, { flag: '' });
      tempCache.set(fileFullPath, content);
    }

    return fileFullPath;
  }

  setTmplArgs(tmplArgs) {
    this.tmplArgs = tmplArgs;
  }

  // get the template arguments
  async getTmplArgs() {
    await this.pluginMgr.applyAsyncOption('injectTemplate', this);
    return this.tmplArgs;
  }

  async writeTemps() {
    const { options, sourceDir } = this;
    //  generate routes & user components registration code
    const routesCode = await genRoutesFile(options);
    // const componentCode = await genComponentRegistrationFile(options);

    await this.writeTemp('routes.js', [routesCode].join('\n'));

    // generate siteData
    const dataCode = `export const siteData = ${JSON.stringify(options.siteData, null, 2)}`;
    await this.writeTemp('siteData.js', dataCode);

    //  handle user override
    const stylePath = path.resolve(sourceDir, '.rcpress/style.less').replace(/[\\]+/g, '/');
    const hasUserStyle = fs.existsSync(stylePath);
    await this.writeTemp('style.less', hasUserStyle ? `@import ${JSON.stringify(stylePath)};` : ``);

    // write react-hot-loader config
    await this.writeTemp(
      'rhlConfig.js',
      `
      // rhlConfig.js
      import { setConfig } from 'react-hot-loader';
      setConfig({ logLevel: 'debug'});
      `
    );
  }

  async prepare() {
    const prepareLogger = this.createModuleLogger('Collecting the site data');
    prepareLogger();

    // load options
    this.options = await resolveOptions(this);
    // write temp file
    await this.writeTemps();

    prepareLogger.done();
  }

  async createWebpackConfig(isServer, isProd) {
    const log = this.createModuleLogger('Creating webpack config');
    log();

    const { options, cliOptions } = this;
    // resolve webpack config
    let clientConfig = (this.clientWebpackConfig = createClientConfig(this, isProd, isServer));

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
            template: this.devTmplPath,
            templateParameters: async () => {
              return await this.getTmplArgs();
            }
          }
        ]);
    } else {
      this.serverWebpackConfig = createSSRConfig(this, isProd).toConfig();
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

  /**
   * Apply user plugins
   *
   * @api private
   */

  applyUserPlugins() {
    this.pluginMgr.useByPluginsConfig(this.options.plugins);
    // TODO: Registry theme plugin here
    // if (this.themeAPI.existsParentTheme) {
    //   this.pluginMgr.use(this.themeAPI.parentTheme.entry)
    // }
    // this.pluginMgr
    //   .use(this.themeAPI.theme.entry)
    //   .use(this.themeAPI.vuepressPlugin)
    //   .use(Object.assign({}, this.siteConfig, { name: '@vuepress/internal-site-config' }))
  }

  /**
   * Make template configurable
   *
   * Resolving Priority (devTemplate as example):
   *
   *   1. siteConfig.devTemplate
   *   2. `dev.html` located at .vuepress/templates
   *   3. themeEntryFile.devTemplate
   *   4. default devTemplate
   *
   * @api private
   */

  resolveTemplates() {
    // this.devTemplate = this.resolveCommonAgreementFilePath('devTemplate', {
    //   defaultValue: this.getLibFilePath('client/index.dev.html'),
    //   siteAgreement: 'templates/dev.html',
    //   themeAgreement: 'templates/dev.html'
    // });

    // this.ssrTemplate = this.resolveCommonAgreementFilePath('ssrTemplate', {
    //   defaultValue: this.getLibFilePath('client/index.ssr.html'),
    //   siteAgreement: 'templates/ssr.html',
    //   themeAgreement: 'templates/ssr.html'
    // });

    // templates
    this.devTmplPath = path.resolve(__dirname, './templates/index.dev.html');
    this.ssrTmplPath = path.resolve(__dirname, './templates/index.ssr.html');

    logger.debug('SSR Template File: ' + chalk.gray(this.ssrTmplPath));
    logger.debug('DEV Template File: ' + chalk.gray(this.devTmplPath));
  }

  async process(isServer, isProd) {
    await this.prepare();

    this.pluginMgr.use(this.options.themePath);

    this.resolveTemplates();

    this.applyUserPlugins();

    this.pluginMgr.initialize();

    await this.createWebpackConfig(isServer, isProd);

    if (!isProd) {
      this.watchFile();
    }

    await this.pluginMgr.applyAsyncOption('ready');
    await Promise.all([
      this.pluginMgr.applyAsyncOption('clientDynamicModules', this),
      this.pluginMgr.applyAsyncOption('enhanceAppFiles', this),
      this.pluginMgr.applyAsyncOption('globalUIComponents', this)
    ]);

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

    const { options, resolvedOpts } = this;
    let renderer;
    const app = express();
    http.createServer(app).listen(resolvedOpts.port, resolvedOpts.host);

    let { readyPromise, clientMfs } = this.stepCustomServer(
      app,
      this.ssrTmplPath,
      async (bundle, options) => {
        renderer = new PageRender(bundle, options, clientMfs, await this.getTmplArgs());
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
          logger.tip(`Finish the request ${req.url} in  ${Date.now() - s}ms`);
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

  stepCustomServer(app, templatePath, cb) {
    const { clientWebpackConfig: clientConfig, serverWebpackConfig: serverConfig } = this;
    let bundle;
    let template;
    let clientManifest;

    let ready;

    const readyPromise = new Promise(r => {
      ready = r;
    });
    const update = () => {
      if (bundle && clientManifest) {
        cb(bundle, {
          template,
          clientManifest
        }).then(ready);
      }
    };

    // read template from disk and watch
    template = fs.readFileSync(templatePath, 'utf-8');
    chokidar.watch(templatePath).on('change', () => {
      template = fs.readFileSync(templatePath, 'utf-8');
      console.log('index.html template updated.');
      update();
    });

    clientConfig.entry.app.push('webpack-hot-middleware/client?quiet=true');
    clientConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );

    // dev middleware
    const clientCompiler = webpack(clientConfig);
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      watchOptions: {
        ignored: [/node_modules(\\|\/)(?!@rcpress(\\|\/)core(\\|\/).temp)/]
      },
      stats: false,
      logLevel: 'silent'
    });

    app.use(devMiddleware);
    clientCompiler.hooks.done.tap('rcpress-ssr-dev-plugin', stats => {
      stats = stats.toJson();
      stats.errors.forEach(err => console.error(err));
      stats.warnings.forEach(err => console.warn(err));
      if (stats.errors.length) return;

      clientManifest = stats;

      update();
    });

    // hot middleware
    app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000, log: false }));

    // watch and update server renderer
    const serverCompiler = webpack(serverConfig);
    serverCompiler.watch(
      { ignored: [/node_modules(\\|\/)(?!@rcpress(\\|\/)core(\\|\/).temp)/] },
      (err, stats) => {
        if (err) throw err;
        stats = stats.toJson();
        if (stats.errors.length) return;

        bundle = stats;
        update();
      }
    );

    return { clientMfs: devMiddleware.fileSystem, readyPromise };
  }

  serverReady() {
    const { displayHost, port } = this.resolvedOpts;
    const { base } = this.options.siteConfig;
    logger.success(
      `RcPress server listening at ${chalk.cyan(`http://${displayHost}:${port}${base}\n`)}`
    );
  }

  async getPageRendererForProd() {
    const { clientWebpackConfig: spaConfig, serverWebpackConfig: ssrConfig, options } = this;
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

    return await new Promise((resolve, reject) => {
      webpack([ssrConfig, spaConfig], async (err, stat) => {
        if (err) {
          reject(err);
        }

        const stats = stat.stats;

        resolve(
          new PageRender(
            stats[0].toJson(),
            {
              clientManifest: stats[1].toJson(),
              template: fs.readFileSync(this.ssrTmpl, 'utf-8'),
              outDir
            },
            await this.getTmplArgs()
          )
        );
      });
    });
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
      webpack(clientWebpackConfig, async err => {
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

    const { options } = this;

    // get page render...
    const renderer = await this.getPageRendererForProd();
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
