'use strict';

/*
 * @author wangyi7099
 */

const webpack = require('webpack');
const fs = require('fs-extra');
const path = require('path');

module.exports = async function getPageRenderer(ssrConfig, spaConfig, options) {
  const { outDir } = options;
  const PageRender = require('../pageRender');
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
            path.resolve(__dirname, '../templates/index.ssr.html'),
            'utf-8'
          ),
          outDir
        })
      );
    });
  });
};
