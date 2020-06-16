'use strict';
// copied from @vuepress/shared-utils
/*
 * @author wangyi7099
 */

const datatypes = require('./datatypes');
const logger = require('./logger');
const chalk = require('chalk');
function normalizeConfig(pluginsConfig) {
  const { valid, warnMsg } = datatypes.assertTypes(pluginsConfig, [Object, Array]);
  if (!valid) {
    if (pluginsConfig !== undefined) {
      logger.warn(`[${chalk.gray('config')}] ` + `Invalid value for "plugin" field : ${warnMsg}`);
    }
    pluginsConfig = [];
    return pluginsConfig;
  }
  if (Array.isArray(pluginsConfig)) {
    pluginsConfig = pluginsConfig.map(item => {
      return Array.isArray(item) ? item : [item];
    });
  } else if (typeof pluginsConfig === 'object') {
    pluginsConfig = Object.keys(pluginsConfig).map(item => {
      return [item, pluginsConfig[item]];
    });
  }
  return pluginsConfig;
}
module.exports = normalizeConfig;
