const { isObject } = require('lodash');

function merge(from, to) {
  for (const key in from) {
    if (Array.isArray(from[key] || Array.isArray(to[key]))) {
      to[key] = [].concat(from[key] || []).concat(to[key] || []);
    } else if (isObject(from[key]) && to && isObject(to[key])) {
      merge(from[key], to[key]);
    } else {
      if (!to) {
        to = {};
      }

      to[key] = from[key];
    }
  }

  return to;
}

function deepMerge(to, ...froms) {
  if (!froms || !froms.length) return to;

  for (const from of froms) {
    merge(from, to);
  }

  return to;
}

module.exports = deepMerge;
