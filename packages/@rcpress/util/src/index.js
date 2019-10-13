const { deeplyParseHeaders } = require('./parseHeaders');

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

exports.applyUserWebpackConfig = function(userConfig, config, isServer) {
  const merge = require('webpack-merge');
  if (typeof userConfig === 'object') {
    return merge(config, userConfig);
  }
  if (typeof userConfig === 'function') {
    const res = userConfig(config, isServer);
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
  const matter = require('gray-matter');
  const toml = require('toml');

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

exports.logger = require('./logger');
exports.deepMerge = require('./deepMerge');
exports.emoji = require('./emoji');
exports.emoji = require('./emoji');
exports.resolveHostandPort = require('./resolveHostandPort');
