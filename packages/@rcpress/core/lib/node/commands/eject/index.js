const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { logger } = require('@rcpress/util');
const { createResolveThemeLayoutPath } = require('../../prepare/util');
module.exports = async dir => {
  const resolveThemeLayoutPath = createResolveThemeLayoutPath(dir);
  const defaultThemeLayoutPath = resolveThemeLayoutPath('@rcpress/theme-default');
  const source = path.dirname(defaultThemeLayoutPath);
  const target = path.resolve(dir, '.rcpress/theme');
  await fs.copy(source, target);

  logger.success(`\nCopied default theme into ${chalk.cyan(target)}.\n`);
};
