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
  spaConfig,
  ssrConfig,
  host,
  port,
  useDevSServer = true
) {
  if (!useDevSServer) {
    const app = express();
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
