const { deeplyParseHeaders } = require('./parseHeaders');
const matter = require('gray-matter');
const toml = require('toml');
const merge = require('webpack-merge');

exports.normalizeHeadTag = function(tag) {
  if (typeof tag === 'string') {
    tag = [tag];
  }
  const tagName = tag[0];
  return {
    tagName,
    attributes: tag[1] || {},
    innerHTML: tag[2] || '',
    closeTag: !(tagName === 'meta' || tagName === 'link')
  };
};

exports.applyUserWebpackConfig = function(userConfig, config, isServer, isProd) {
  if (typeof userConfig === 'object') {
    return merge(config, userConfig);
  }
  if (typeof userConfig === 'function') {
    const res = userConfig(config, isServer, isProd);
    if (res && typeof res === 'object') {
      return merge(config, res);
    }
  }
  return config;
};

exports.inferTitle = function(frontMatter, headers) {
  if (frontMatter.data.home) {
    return 'Home';
  }
  if (frontMatter.data.title) {
    return deeplyParseHeaders(frontMatter.data.title);
  }

  const levelOneHead = headers.find(h => h.depth == 1);

  return levelOneHead ? deeplyParseHeaders(levelOneHead.value) : '';
};

exports.parseFrontmatter = function(content) {
  return matter(content, {
    excerpt_separator: '<!-- more -->',
    engines: {
      toml: toml.parse.bind(toml),
      excerpt: false
    }
  });
};

// ensure only one `/` in new url
exports.withPathPrefix = (url, pathPrefix) => (pathPrefix + url).replace(/\/\//, `/`);

exports.getCurrentTime = require('./getCurrentTime');
exports.logger = require('./logger');
exports.deepMerge = require('./deepMerge');
exports.emoji = require('./emoji');
exports.emoji = require('./emoji');
exports.resolveAddress = require('./resolveAddress');
exports.datatypes = require('./datatypes');
exports.normalizeConfig = require('./normalizeConfig');
exports.moduleResolver = require('./moduleResolver');
exports.codegen = require('./codegen');
exports.chalk = require('chalk');
exports.fs = require('fs-extra');
