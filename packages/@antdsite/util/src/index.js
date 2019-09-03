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

exports.inferTitle = function(frontmatter) {
  if (frontmatter.data.home) {
    return 'Home';
  }
  if (frontmatter.data.title) {
    return deeplyParseHeaders(frontmatter.data.title);
  }
  const match = frontmatter.content.trim().match(/^#+\s+(.*)/);
  if (match) {
    return deeplyParseHeaders(match[1]);
  }
};

module.exports.logger = require('./logger');
module.exports.deepMerge = require('./deepMerge');
module.exports.emoji = require('./emoji');
