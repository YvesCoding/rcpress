const { EventEmitter } = require('events')
const { getOptions } = require('loader-utils')
const { inferTitle } = require('@antdsite/util')
const LRU = require('lru-cache')

const devCache = LRU({ max: 1000 })

module.exports = function (src) {
  const isProd = process.env.NODE_ENV === 'production'
  const isServer = this.target === 'node'
  const { markdown, } = getOptions(this)


  const file = this.resourcePath


  const results = markdown(src);
  const frontmatter = results.frontmatter

  if (!isProd && !isServer) {
    const inferredTitle = inferTitle(frontmatter)
    const headers = results.headings
    delete frontmatter.content

    // diff frontmatter and title, since they are not going to be part of the
    // returned component, changes in frontmatter do not trigger proper updates
    const cachedData = devCache.get(file)
    if (cachedData && (
      cachedData.inferredTitle !== inferredTitle ||
      JSON.stringify(cachedData.frontmatter) !== JSON.stringify(frontmatter) ||
      headersChanged(cachedData.headers, headers)
    )) {
      // frontmatter changed... need to do a full reload
      module.exports.frontmatterEmitter.emit('update')
    }

    devCache.set(file, {
      headers,
      frontmatter,
      inferredTitle
    })
  }


  return src
}

function headersChanged(a, b) {
  if (a.length !== b.length) return true
  return a.some((h, i) => (
    h.title !== b[i].title ||
    h.level !== b[i].level
  ))
}

module.exports.frontmatterEmitter = new EventEmitter()
