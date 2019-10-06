/**
 * Copyright (c) wangyi7099(Yves Wang)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const http = require('http');
const express = require('express');
const path = require('path');

const readlCreateCustomServer = require('./createCustomServer');
const createWebpackDevServer = require('./createWebpackDevServer');

module.exports = async function createServer(
  options,
  cliOptions,
  spaConfig,
  ssrConfig,
  useDevSServer = true
) {
  const app = express();
  const port = await resolvePort(cliOptions.port || options.siteConfig.port);
  const isProd = process.env.NODE_ENV === 'production';
  const { host, displayHost } = await resolveHost(cliOptions.host || options.siteConfig.host);
  const { WebpackLogPlugin } = require('@rcpress/webpack');

  (spaConfig.plugins || (spaConfig.plugins = [])).push(
    new WebpackLogPlugin({
      port,
      displayHost,
      publicPath: options.publicPath,
      isProd
    })
  );

  if (!useDevSServer) {
    // we assume that we are in ssr dev environment if we dont use webpack dev server
    createCustomServer(ssrConfig, spaConfig, options, app, port, host);
  } else {
    await createWebpackDevServer(spaConfig, options, port, host);
  }
};

function createCustomServer(ssrConfig, spaConfig, options, app, port, host) {
  http.createServer(app).listen(port, host);
  readlCreateCustomServer({
    app,
    ssrConfig,
    spaConfig,
    templatePath: path.resolve(__dirname, '../templates/index.ssr.html'),
    options
  });
}

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
