const { deeplyParseHeaders } = require('./parseHeaders');

exports.normalizeHeadTag = function (tag) {
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

exports.applyUserWebpackConfig = function (userConfig, config, isServer) {
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

exports.inferTitle = function (frontmatter, headers) {
  if (frontmatter.data.home) {
    return 'Home';
  }
  if (frontmatter.data.title) {
    return deeplyParseHeaders(frontmatter.data.title);
  }

  const levelOneHead = headers.find(h => h.depth == 1);

  return levelOneHead ? deeplyParseHeaders(levelOneHead.value) : ''
};

// ensure only one `/` in new url
exports.withPathPrefix = (url, pathPrefix) =>
  (pathPrefix + url).replace(/\/\//, `/`);

module.exports.logger = require('./logger');
module.exports.deepMerge = require('./deepMerge');
module.exports.emoji = require('./emoji');
