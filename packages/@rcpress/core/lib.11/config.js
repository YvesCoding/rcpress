const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const os = require('os');
const { configPath, cacheDir } = require('./constant');
const { deepMerge } = require('./util');

let userConfig;
let finalConfig;
let themeConfig;
let themeFullPath;

const defaultConfig = {
  base: '/',
  title: path.relative('../', process.cwd()),
  description: '',
  lang: 'en-US',
  head: [],
  footer: null,
  useCNDForLargeFiles: true,
  prefetch: true,
  largeFileList: [
    {
      name: 'moment',
      umdName: 'moment',
      cdnLink: 'https://gw.alipayobjects.com/os/lib/moment/2.24.0/min/moment.min.js'
    },
    {
      order: 2,
      name: 'react-dom',
      umdName: 'ReactDOM',
      cdnLink:
        'https://gw.alipayobjects.com/os/lib/react-dom/16.8.1/umd/react-dom.production.min.js'
    },
    {
      order: 1,
      name: 'react',
      umdName: 'React',
      cdnLink: 'https://gw.alipayobjects.com/os/lib/react/16.8.1/umd/react.production.min.js'
    }
  ],
  theme: 'rcpress-default-theme',
  themeConfig: {
    themeColors: null,
    repo: null,
    docsRepo: null,
    docsDir: 'docs',
    docsRelativeDir: '',
    docsBranch: 'master'
  }
};

module.exports.defaultConfig = defaultConfig;

const createFinalConfig = config => {
  const filePath = path.resolve(cacheDir, 'finalConfig.js');
  fs.ensureFileSync(filePath);
  const exportConfig = `module.exports = 
  ${JSON.stringify(config)}
  `;
  fs.writeFileSync(filePath, exportConfig + os.EOL);
};

const getUserConfig = () => {
  if (userConfig) return userConfig;

  let fullConfigPath;

  try {
    fullConfigPath = path.resolve(configPath);
    userConfig = require(fullConfigPath);
  } catch (error) {
    console.error(
      chalk.red(
        `[RcPress]: Error when parsing ${configPath} at ${fullConfigPath}, fallback to default config, the detail error is bellow:`
      )
    );
    console.error(error);
    userConfig = defaultConfig;
  }

  return userConfig;
};

const getThemeConfig = themeName => {
  if (themeConfig) return themeConfig;

  let fullConfigPath;
  let currentThemeConfig;
  let isThrow;
  let currentThemePath;

  try {
    currentThemePath = require.resolve(themeName);
    fullConfigPath = path.resolve(currentThemePath, configPath);
    currentThemeConfig = require(fullConfigPath);
  } catch (error) {
    console.error(
      chalk.red(
        `[RcPress]: Error when parsing  theme config at ${fullConfigPath}, fallback to default config, the detail error is bellow:`
      )
    );
    console.error(error);
    isThrow = true;
  }

  if (!isThrow && currentThemeConfig) {
    themeName = currentThemeConfig.theme;
    themeFullPath = currentThemePath;
    themeConfig = currentThemeConfig;
  }

  return themeConfig;
};

module.exports.getTheme = function() {
  return {
    themeConfig,
    themeFullPath
  };
};

module.exports.getFinalConfig = function() {
  if (finalConfig) return finalConfig;

  // get user config
  const userConfig = getUserConfig();
  // get theme config
  const themeConfig = getThemeConfig(userConfig.theme);
  // merge with default config.
  finalConfig = deepMerge.apply(null, [defaultConfig, ...themeConfig, userConfig]);
  // validate & fix config.
  validateConfig(finalConfig);
  // create a config file for enabling read for other runtime files.
  createFinalConfig(finalConfig);

  return finalConfig;
};

function validateConfig(config) {
  const themeLocales = config.themeConfig.locales;
  const locales = config.locales;

  if (locales) {
    for (let key in locales) {
      if (key != '/') {
        const newKey = '/' + key.replace(/(^\/)|(\/$)/g, '') + '/';

        if (key !== newKey) {
          locales[newKey] = locales[key];
          delete locales[key];
        }
      }
    }
  }

  if (themeLocales) {
    for (let key in themeLocales) {
      if (key != '/') {
        const newKey = '/' + key.replace(/(^\/)|(\/$)/g, '') + '/';

        if (key !== newKey) {
          themeLocales[newKey] = themeLocales[key];
          delete themeLocales[key];
        }
      }
    }
  }
}
