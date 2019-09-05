const { merge } = require("lodash")



function deepMerge(to, ...froms) {
  if (!froms || !froms.length) return to;

  for (const from of froms) {
    merge(from, to)
  }

  return to;
}

module.exports = deepMerge;
