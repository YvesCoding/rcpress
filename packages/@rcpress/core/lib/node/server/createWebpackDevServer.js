const path = require('path');
const webpack = require('webpack');
const serve = require('webpack-dev-server');
const fs = require('fs-extra');

module.exports = async function createDeveServer(config, options, port, host) {
  const sourceDir = options.sourceDir;
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
};
