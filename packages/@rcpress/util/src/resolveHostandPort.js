const portfinder = require('portfinder');

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
  portfinder.basePort = parseInt(port);
  port = await portfinder.getPortPromise();
  return port;
}

module.exports = async function resolveHostandPort(oldPort, oldHost) {
  const port = await resolvePort(oldPort);
  const { host, displayHost } = resolveHost(oldHost);

  return {
    port,
    host,
    displayHost
  };
};
