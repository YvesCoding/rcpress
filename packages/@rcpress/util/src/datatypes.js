'use strict';
// copied from @vuepress/shared-utils
/*
 * @author wangyi7099
 */

const chalk = require('chalk');

const dataTypes = {};
dataTypes.isObject = obj => obj !== null && typeof obj === 'object';

/**
 * Get the raw type string of a value e.g. [object Object]
 */
const _toString = Object.prototype.toString;

const getObjectType = x => _toString.call(x).slice(8, -1);
const isOfType = type => x => typeof x === type; // eslint-disable-line valid-typeof
const isObjectOfType = type => x => getObjectType(x) === type;

dataTypes.isFunction = isOfType('function');
dataTypes.isString = isOfType('string');
dataTypes.isBoolean = isOfType('boolean');
dataTypes.isPlainObject = isObjectOfType('Object');
dataTypes.isUndefined = isOfType('undefined');
dataTypes.isNull = x => x === null;
dataTypes.isNullOrUndefined = x => dataTypes.isUndefined(x) || dataTypes.isNull(x);

dataTypes.toRawType = value => _toString.call(value).slice(8, -1);
dataTypes.getType = function(fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
};

/**
 * Transform multi-types to natural language. e.g.
 *   ['Function']                     => 'Function'
 *   ['Function', 'Object']           => 'Function or Object'
 *   ['Function', 'Object', 'Number'] => 'Function, Object or Number'
 */

function toNaturalMultiTypesLanguage(types) {
  const len = types.length;
  if (len === 1) {
    return types.join('');
  }
  const rest = types.slice(0, len - 1);
  const last = types[len - 1];
  return rest.join(', ') + ' or ' + last;
}

dataTypes.assertTypes = (value, types) => {
  let valid;
  let warnMsg;
  let actualType = dataTypes.toRawType(value);
  const expectedTypes = [];
  if (actualType === 'AsyncFunction') {
    actualType = 'Function';
  }

  for (const type of types) {
    const expectedType = dataTypes.getType(type);
    expectedTypes.push(expectedType);
    valid = actualType === expectedType;
    if (valid) break;
  }

  if (!valid) {
    warnMsg =
      `expected a ${chalk.green(toNaturalMultiTypesLanguage(expectedTypes))} ` +
      `but got ${chalk.yellow(actualType)}.`;
  }

  return { valid, warnMsg };
};

module.exports = dataTypes;
