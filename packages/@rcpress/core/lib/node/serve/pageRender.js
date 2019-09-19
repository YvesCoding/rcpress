const webpack = require('webpack');
const react = require('react');

const createPageRender = (clientConfig, serverConfig, isProd) => path => {
  const clientCompiler = webpack(clientConfig);
  const serverCompilter = webpack(serverConfig);
};

module.exports = pageRender;
