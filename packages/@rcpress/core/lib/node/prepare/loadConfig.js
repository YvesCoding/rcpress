const fs = require('fs-extra');
const path = require('path');
const yamlParser = require('js-yaml');
const tomlParser = require('toml');
const { deepMerge } = require('@rcpress/util');
const defaultConf = require('./defaultConfig');

function validateConfig(config) {
  const themeLocales = config.themeConfig.locales;
  const locales = config.locales;

  if (locales) {
    for (let key in locales) {
      if (key != '/') {
        const newKey =
          '/' + key.replace(/(^\/)|(\/$)/g, '') + '/';

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
        const newKey =
          '/' + key.replace(/(^\/)|(\/$)/g, '') + '/';

        if (key !== newKey) {
          themeLocales[newKey] = themeLocales[key];
          delete themeLocales[key];
        }
      }
    }
  }
}

module.exports = function loadConfig(
  rcpressDir,
  bustCache = true
) {
  const configPath = path.resolve(rcpressDir, 'config.js');
  const configYmlPath = path.resolve(
    rcpressDir,
    'config.yml'
  );
  const configTomlPath = path.resolve(
    rcpressDir,
    'config.toml'
  );

  if (bustCache) {
    delete require.cache[configPath];
  }

  // resolve siteConfig
  let siteConfig = {};
  if (fs.existsSync(configYmlPath)) {
    siteConfig = parseConfig(configYmlPath);
  } else if (fs.existsSync(configTomlPath)) {
    siteConfig = parseConfig(configTomlPath);
  } else if (fs.existsSync(configPath)) {
    siteConfig = require(configPath);
  }

  siteConfig = deepMerge(siteConfig, defaultConf);

  validateConfig(siteConfig);

  return siteConfig;
};

function parseConfig(file) {
  const content = fs.readFileSync(file, 'utf-8');
  const [extension] = /.\w+$/.exec(file);
  let data;

  switch (extension) {
    case '.yml':
    case '.yaml':
      data = yamlParser.safeLoad(content);
      break;

    case '.toml':
      data = tomlParser.parse(content);
      // reformat to match config since TOML does not allow different data type
      // https://github.com/toml-lang/toml#array
      const format = [];
      Object.keys(data.head).forEach(meta => {
        data.head[meta].forEach(values => {
          format.push([meta, values]);
        });
      });
      data.head = format;
      break;
  }

  return data || {};
}
