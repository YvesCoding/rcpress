const fs = require('fs');
const webpack = require('webpack');
const chokidar = require('chokidar');

module.exports = function setupDevServer(clientConfig, serverConfig, app, templatePath, cb) {
  let bundle;
  let template;
  let clientManifest;

  let ready;

  const readyPromise = new Promise(r => {
    ready = r;
  });
  const update = () => {
    if (bundle && clientManifest) {
      ready();
      cb(bundle, {
        template,
        clientManifest
      });
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
    stats: false
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
  app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }));

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig);
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    if (stats.errors.length) return;

    bundle = stats;
    update();
  });

  return { clientMfs: devMiddleware.fileSystem, readyPromise };
};
