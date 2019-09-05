function isObject(receive) {
  return Object.prototype.toString.call(receive) === '[object Object]';
}

function deepMerge(to, ...froms) {
  if (!froms || !froms.length) return to;

  for (const from of froms) {
    for (const key in from) {
      if (Array.isArray(from[key] || Array.isArray(to[key]))) {
        to[key] = [].concat(from[key] || []).concat(to[key] || []);
      } else if (isObject(from[key]) && to && isObject(to[key])) {
        deepMerge(from[key], to[key]);
      } else {
        if (!to) {
          to = {};
        }

        to[key] = from[key];
      }
    }
  }

  return to;
}

module.exports.isObject = isObject;
module.exports = deepMerge;
