const path = require('path');
const spawn = require('cross-spawn');
const fs = require('fs-extra');
const globby = require('globby');
const { logger } = require('@rcpress/util');

const tempCache = new Map();
exports.writeTemp = async function(tempPath, file, content) {
  // cache write to avoid hitting the dist if it didn't change
  const cached = tempCache.get(file);
  if (cached !== content) {
    await fs.writeFile(path.join(tempPath, file), content);
    tempCache.set(file, content);
  }
};

exports.writeEnhanceTemp = async function(destName, srcPath) {
  await exports.writeTemp(
    destName,
    fs.existsSync(srcPath)
      ? `export { default } from ${JSON.stringify(srcPath)}`
      : `export default function () {}`
  );
};

const indexRE = /(^|.*\/)(index|readme)\.md$/i;
const extRE = /\.(jsx|tsx|ts|js|md)$/;

exports.fileToPath = function(file) {
  if (exports.isIndexFile(file)) {
    // README.md -> /
    // foo/README.md -> /foo/
    return file.replace(indexRE, '/$1');
  } else {
    // foo.md -> /foo.html
    // foo/bar.md -> /foo/bar.html
    return `/${file.replace(extRE, '').replace(/\\/g, '/')}`;
  }
};

exports.fileToComponentName = function(file) {
  let normalizedName = file.replace(/\/|\\/g, '-').replace(extRE, '');
  if (exports.isIndexFile(file)) {
    normalizedName = normalizedName.replace(/readme$/i, 'index');
  }
  const pagePrefix = /\.md$/.test(file) ? `page-` : ``;
  return `${pagePrefix}${normalizedName}`;
};

exports.isIndexFile = function(file) {
  return indexRE.test(file);
};

exports.resolveComponents = async function(sourceDir) {
  const componentDir = path.resolve(sourceDir, '.rcpress/components');
  if (!fs.existsSync(componentDir)) {
    return;
  }
  return exports.sort(await globby(['**/*.vue'], { cwd: componentDir }));
};

exports.sort = function(arr) {
  return arr.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
};

exports.encodePath = function(userpath) {
  return userpath
    .split('/')
    .map(item => encodeURIComponent(item))
    .join('/');
};

exports.getGitLastUpdatedTimeStamp = function(filepath) {
  return (
    parseInt(spawn.sync('git', ['log', '-1', '--format=%ct', filepath]).stdout.toString('utf-8')) *
    1000
  );
};

module.exports.createResolveThemeLayoutPath = sourceDir => name => {
  let themePath = '';
  try {
    themePath = createResolvePathWithExts(sourceDir)(`${name}/Layout`);
  } catch (error) {
    throw new Error(logger.error(`Failed to load theme "${name}"`, false));
  }

  return themePath;
};

const createResolvePathWithExts = sourceDir => basePath => {
  const extensions = ['ts', 'tsx', 'js', 'jsx'];

  for (let index = 0; index < extensions.length; index++) {
    const ext = extensions[index];
    try {
      return require.resolve(`${basePath}.${ext}`, {
        paths: [path.resolve(__dirname, '../../../node_modules'), path.resolve(sourceDir)]
      });
    } catch (error) {}
  }

  return '';
};

const getCompWithExt = pathWithoutExt => {
  const extensions = ['ts', 'tsx', 'js', 'jsx'];

  for (let index = 0; index < extensions.length; index++) {
    const ext = extensions[index];
    const fullPath = pathWithoutExt + '.' + ext;
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  return '';
};

module.exports.createResolvePathWithExts = createResolvePathWithExts;
module.exports.getCompWithExt = getCompWithExt;
