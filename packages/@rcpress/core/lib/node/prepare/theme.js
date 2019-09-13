const { logger } = require('@rcpress/util');
const fs = require('fs-extra');
const path = require('path');

module.exports.createResolveThemeLayoutPath = sourceDir => name => {
  let themePath = '';
  try {
    themePath = createResolvePathWidthExts(sourceDir)(
      `${name}/Layout`
    );
  } catch (error) {
    throw new Error(
      logger.error(`Failed to load theme "${name}"`, false)
    );
  }

  return themePath;
};

const createResolvePathWidthExts = sourceDir => basePath => {
  const extensions = ['ts', 'tsx', 'js', 'jsx'];

  for (let index = 0; index < extensions.length; index++) {
    const ext = extensions[index];
    try {
      return require.resolve(`${basePath}.${ext}`, {
        paths: [
          path.resolve(__dirname, '../../node_modules'),
          path.resolve(sourceDir)
        ]
      });
    } catch (error) {}
  }

  return '';
};

module.exports.createResolvePathWidthExts = createResolvePathWidthExts;
