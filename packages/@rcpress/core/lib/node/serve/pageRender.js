const webpack = require('webpack');
const react = require('react');

const createPageRender = (clientConfig, serverConfig, isProd) => async path => {
  const clientCompiler = webpack(clientConfig, (err, stat) => {});
  const serverCompilter = webpack(serverConfig);
};

module.exports = pageRender;
