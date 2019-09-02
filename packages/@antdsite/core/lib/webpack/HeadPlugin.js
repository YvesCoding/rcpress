const { normalizeHeadTag } = require('../util')

module.exports = class SiteDataPlugin {
  constructor ({ tags }) {
    this.tags = tags
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('antdsite-site-data', compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('antdsite-site-data', (data, cb) => {
        try {
          this.tags.forEach(tag => {
            data.head.push(normalizeHeadTag(tag))
          })
        } catch (e) {
          return cb(e)
        }
        cb(null, data)
      })
    })
  }
}
