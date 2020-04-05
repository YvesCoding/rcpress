module.exports = function createSSRConfig(options, cliOptions, isProd) {
  const fs = require('fs-extra');
  const path = require('path');
  const createBaseConfig = require('./createBaseConfig');
  const CopyPlugin = require('copy-webpack-plugin');
  const LoadablePlugin = require('@loadable/webpack-plugin');

  const config = createBaseConfig(options, cliOptions, true, true, isProd);
  const { sourceDir, outDir } = options;
  const outputPath = path.join(options.tempPath, 'server');

  fs.removeSync(outputPath);

  config.output
    .path(outputPath)
    .end()
    .target('node')
    .externals([
      '@loadable/component',
      'react',
      'react-dom',
      'react-helmet',
      'react-router',
      'react-router-dom'
    ])
    .devtool('source-map');

  // no need to minimize server build
  config.optimization.minimize(false);

  config.entry('app').add('@rcpress/core/lib/web/serverEntry.js');

  config.output.filename('server-bundle.js').libraryTarget('commonjs2');

  const publicDir = path.resolve(sourceDir, '.rcpress/public');
  if (fs.existsSync(publicDir)) {
    config.plugin('copy').use(CopyPlugin, [[{ from: publicDir, to: outDir }]]);
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
