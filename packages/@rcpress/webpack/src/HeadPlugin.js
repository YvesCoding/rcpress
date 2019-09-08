const { normalizeHeadTag } = require('@rcpress/util');

module.exports = class SiteDataPlugin {
  constructor({ tags }) {
    this.tags = tags;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('rcpress-site-data', compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
        'rcpress-site-data',
        (data, cb) => {
          try {
            this.tags.forEach(tag => {
              data.head.push(normalizeHeadTag(tag));
            });
          } catch (e) {
            return cb(e);
          }
          cb(null, data);
        }
      );
    });
  }
};
