const path = require('path');
const fs = require('fs-extra');
const resolveOptions = require('./resolveOptions');
const { genRoutesFile, genComponentRegistrationFile } = require('./codegen');
const { writeTemp, writeEnhanceTemp } = require('./util');
const { logger } = require('@rcpress/util');
const chalk = require('chalk');

module.exports = async function prepare(sourceDir) {
  logger.wait('\nCollecting the site data...');

  // 1. load options
  const options = await resolveOptions(sourceDir);

  // 2. generate routes & user components registration code
  const routesCode = await genRoutesFile(options);
  // const componentCode = await genComponentRegistrationFile(options);

  await writeTemp(options.tempPath, 'routes.js', [routesCode].join('\n'));

  // 3. generate siteData
  const dataCode = `export const siteData = ${JSON.stringify(options.siteData, null, 2)}`;
  await writeTemp(options.tempPath, 'siteData.js', dataCode);

  // 4. handle user override
  const stylePath = path.resolve(sourceDir, '.rcpress/style.less').replace(/[\\]+/g, '/');
  const hasUserStyle = fs.existsSync(stylePath);
  await writeTemp(
    options.tempPath,
    'style.less',
    hasUserStyle ? `@import(${JSON.stringify(stylePath)})` : ``
  );

  // 5 write react-hot-loader config
  await writeTemp(
    options.tempPath,
    'rhlConfig.js',
    `
    // rhlConfig.js
    import { setConfig } from 'react-hot-loader';
    setConfig({ logLevel: 'debug'});
    `
  );

  // 5. handle enhanceApp.js
  // const enhanceAppPath = path.resolve(sourceDir, '.rcpress/enhanceApp.js');
  // await writeEnhanceTemp('enhanceApp.js', enhanceAppPath);

  // 6. handle the theme enhanceApp.js
  // await writeEnhanceTemp('themeEnhanceApp.js', options.themeEnhanceAppPath);

  logger.success('\nCollecting site data finished.');

  return options;
};
