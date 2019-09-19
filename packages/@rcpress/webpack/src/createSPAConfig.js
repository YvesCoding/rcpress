module.exports = function createSPAConfig(options, cliOptions, isProd) {
  const fs = require('fs-extra');
  const path = require('path');

  const WebpackBar = require('webpackbar');
  const createBaseConfig = require('./createBaseConfig');
  const CopyPlugin = require('copy-webpack-plugin');
  const config = createBaseConfig(options, cliOptions);
  const { sourceDir, outDir } = options;
  config.entry('app').add('@rcpress/core/lib/web/clientEntry.js');

  config.node.merge({
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    global: false,
    process: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  });

  if (!cliOptions.debug) {
    config.plugin('bar').use(WebpackBar, [
      {
        name: 'Client',
        color: '#41b883',
        compiledIn: false
      }
    ]);
  }

  if (isProd) {
    const publicDir = path.resolve(sourceDir, '.rcpress/public');
    if (fs.existsSync(publicDir)) {
      config.plugin('copy').use(CopyPlugin, [[{ from: publicDir, to: outDir }]]);
    }
  }

  if (options.siteConfig.chainWebpack) {
    options.siteConfig.chainWebpack(config, false /* isServer */, isProd);
  }

  return config;
};