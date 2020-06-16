module.exports = function createClientConfig(ctx, isProd, isServer) {
  const { options, cliOptions, pluginMgr } = ctx;

  const LoadablePlugin = require('@loadable/webpack-plugin');
  const createBaseConfig = require('./createBaseConfig');
  const config = createBaseConfig(options, cliOptions, isServer, false, isProd);
  config
    .entry('app')
    .add(
      isServer
        ? '@rcpress/core/lib/web/clientSSREntry.js'
        : '@rcpress/core/lib/web/clientSPAEntry.js'
    );

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

  if (isServer) {
    // loadable webpack plugin
    config.plugin('LoadablePlugin').use(
      new LoadablePlugin({
        outputAsset: false
      })
    );
  }

  if (options.siteConfig.chainWebpack) {
    options.siteConfig.chainWebpack(config, false /* isServer */, isProd);
  }

  pluginMgr.applySyncOption('chainWebpack', config, false /* isServer */);

  return config;
};
