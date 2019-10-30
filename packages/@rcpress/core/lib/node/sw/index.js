module.exports = async function(outDir) {
  const path = require('path');
  const fs = require('fs-extra');
  const { logger } = require('@rcpress/util');
  const wbb = require('workbox-build');

  logger.wait('\nGenerating service worker...');

  await wbb.generateSW({
    swDest: path.resolve(outDir, 'service-worker.js'),
    globDirectory: outDir,
    globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,eot,ttf,otf}']
  });
  await fs.writeFile(
    path.resolve(outDir, 'service-worker.js'),
    await fs.readFile(path.resolve(__dirname, './skip-waiting.js'), 'utf8'),
    { flag: 'a' }
  );
};
