var getConfig = require('./getConfig');
const webpack = require('webpack');
const fs = require('fs-extra');
const path = require('path');
const createServer = require('../../server');

module.exports = async function ssr(sourceDir, cliOptions = {}, isProd) {
  const [ssrConfig, spaConfig, options, compilerDoneReporterOpts] = await getConfig(
    sourceDir,
    cliOptions,
    isProd
  );

  if (!isProd) {
    await createServer(
      options,
      spaConfig,
      ssrConfig,
      compilerDoneReporterOpts.host,
      compilerDoneReporterOpts.port,
      false /* use webpack-dev-server*/
    );
  } else {
    const buildSW = require('../../sw');
    const renderer = await module.exports.getPageRender(ssrConfig, spaConfig, options);
    await renderer.renderPages(options.siteData.pages);

    // generate service worker config.
    if (options.siteData.serviceWorker) {
      await buildSW(options.outDir);
    }
  }

  return true /** successfully executed command */;
};

module.exports.getPageRender = async function getPageRender(ssrConfig, spaConfig, options) {
  const { outDir } = options;
  const PageRender = require('../../pageRender');
  if (path.resolve() === outDir) {
    return console.error(
      logger.error(
        chalk.red('Unexpected option: outDir cannot be set to the current working directory.\n'),
        false
      )
    );
  }
  await fs.remove(outDir);

  return await new Promise((resolve, reject) => {
    webpack([ssrConfig, spaConfig], async (err, stat) => {
      if (err) {
        reject(error);
      }

      const stats = stat.stats;
      resolve(
        new PageRender(stats[0].toJson(), {
          clientManifest: stats[1].toJson(),
          template: fs.readFileSync(
            path.resolve(__dirname, '../../templates/index.ssr.html'),
            'utf-8'
          ),
          outDir
        })
      );
    });
  });
};
