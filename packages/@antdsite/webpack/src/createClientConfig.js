module.exports = function createClientConfig(options, cliOptions) {
  const path = require('path')
  const WebpackBar = require('webpackbar')
  const createBaseConfig = require('./createBaseConfig')

  const config = createBaseConfig(options, cliOptions)

  config
    .entry('app')
    .add('@antdsite/core/app/clientEntry.js')

  config.node
    .merge({
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
    })


  if (!cliOptions.debug) {
    config
      .plugin('bar')
      .use(WebpackBar, [{
        name: 'Client',
        color: '#41b883',
        compiledIn: false
      }])
  }

  if (options.siteConfig.chainWebpack) {
    options.siteConfig.chainWebpack(config, false /* isServer */)
  }

  return config
}
