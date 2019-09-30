const { EventEmitter } = require('events');
const { getOptions } = require('loader-utils');
const { inferTitle } = require('@rcpress/util');
const LRU = require('lru-cache');
const hash = require('hash-sum');

const cache = new LRU({ max: 1000 });
const devCache = new LRU({ max: 1000 });
const DEFAULT_RENDERER = `
import { hot } from 'react-hot-loader/root'; 
import { setConfig } from 'react-hot-loader';
import React from 'react';
import { mdx } from '@mdx-js/react';

setConfig({
  logLevel: 'debug' 
})
`;

const HOTABLE_CODE = `
MDXContent = hot(MDXContent);
`;

module.exports = function(src) {
  const isProd = process.env.NODE_ENV === 'production';
  const isServer = this.target === 'node';
  const { markdown, hot } = getOptions(this);
  const file = this.resourcePath;
  const key = hash(file + src);
  const cached = cache.get(key);

  if (cached && isProd) {
    return cached;
  }

  const results = markdown(src);
  const frontMatter = results.frontMatter;
  const content = frontMatter.content;

  if (!isProd && !isServer) {
    const inferredTitle = inferTitle(frontMatter, results.headings);
    const headers = results.headings;

    // diff frontMatter and title, since they are not going to be part of the
    // returned component, changes in frontMatter do not trigger proper updates
    const cachedData = devCache.get(file);
    if (
      cachedData &&
      (cachedData.inferredTitle !== inferredTitle ||
        JSON.stringify(cachedData.frontMatter.data) !== JSON.stringify(frontMatter.data) ||
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

  const res = `${DEFAULT_RENDERER}\n${markdown.render(content)}\n${hot ? HOTABLE_CODE : ''}`;

  cache.set(key, res);

  return res;
};

function headersChanged(a, b) {
  if (a.length !== b.length) return true;
  return a.some((h, i) => h.title !== b[i].title || h.level !== b[i].level);
}

module.exports.frontMatterEmitter = new EventEmitter();
