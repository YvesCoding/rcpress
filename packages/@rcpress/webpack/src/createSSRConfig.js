module.exports = function createSSRConfig(options, cliOptions) {
  const fs = require('fs');
  const path = require('path');
  const WebpackBar = require('webpackbar');
  const createBaseConfig = require('./createBaseConfig');
  const CopyPlugin = require('copy-webpack-plugin');
  const LoadablePlugin = require('@loadable/webpack-plugin');
  const nodeExternals = require('webpack-node-externals');

  const config = createBaseConfig(options, cliOptions, true /* isServer */);
  const { sourceDir, outDir } = options;

  config.output
    .path(path.join(options.tempPath, 'server'))
    .end()
    .target('node')
    .externals(['@loadable/component', 'react', 'react-dom', nodeExternals()])
    .devtool('source-map');

  // no need to minimize server build
  config.optimization.minimize(false);

  config.entry('app').add('@rcpress/core/lib/web/serverEntry.js');

  config.output.filename('server-bundle.js').libraryTarget('commonjs2');

  const publicDir = path.resolve(sourceDir, '.rcpress/public');
  if (fs.existsSync(publicDir)) {
    config.plugin('copy').use(CopyPlugin, [[{ from: publicDir, to: outDir }]]);
  }

  if (!cliOptions.debug) {
    config.plugin('bar').use(WebpackBar, [
      {
        name: 'Server',
        color: 'blue',
        compiledIn: false
      }
    ]);
  }

  // loadable webpack plugin
  config.plugin('LoadablePlugin').use(
    new LoadablePlugin({
      outputAsset: false
    })
  );

  if (options.siteConfig.chainWebpack) {
    options.siteConfig.chainWebpack(config, true /* isServer */);
  }

  return config;
};
