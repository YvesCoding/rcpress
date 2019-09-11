const { EventEmitter } = require('events');
const { getOptions } = require('loader-utils');
const { inferTitle } = require('@rcpress/util');
const LRU = require('lru-cache');

const devCache = new LRU({ max: 1000 });

module.exports = function(src) {
  const isProd = process.env.NODE_ENV === 'production';
  const isServer = this.target === 'node';
  const { markdown } = getOptions(this);

  const file = this.resourcePath;

  const results = markdown(src);
  const frontMatter = results.frontMatter;

  if (!isProd && !isServer) {
    const inferredTitle = inferTitle(frontMatter);
    const headers = results.headings;
    delete frontMatter.content;

    // diff frontMatter and title, since they are not going to be part of the
    // returned component, changes in frontMatter do not trigger proper updates
    const cachedData = devCache.get(file);
    if (
      cachedData &&
      (cachedData.inferredTitle !== inferredTitle ||
        JSON.stringify(cachedData.frontMatter) !==
          JSON.stringify(frontMatter) ||
        headersChanged(cachedData.headers, headers))
    ) {
      // frontMatter changed... need to do a full reload
      module.exports.frontMatterEmitter.emit('update');
    }

    devCache.set(file, {
      headers,
      frontMatter,
      inferredTitle
    });
  }

  return src;
};

function headersChanged(a, b) {
  if (a.length !== b.length) return true;
  return a.some(
    (h, i) =>
      h.title !== b[i].title || h.level !== b[i].level
  );
}

module.exports.frontMatterEmitter = new EventEmitter();
