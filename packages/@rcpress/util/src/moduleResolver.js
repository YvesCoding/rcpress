'use strict';

/*
 * @author wangyi7099
 */

const hash = require('hash-sum');
const path = require('upath');
const chalk = require('chalk');

const dataTypes = require('./datatypes');
const tryChain = require('./tryChain');
const moduleLoader = require('./moduleLoader');
const fallback = require('./fallback');

/**
 * Parse info of scope package.
 */
const SCOPE_PACKAGE_RE = /^@(.*)\/(.*)/;
function resolveScopePackage(name) {
  if (SCOPE_PACKAGE_RE.test(name)) {
    return {
      org: RegExp.$1,
      name: RegExp.$2
    };
  }
  return {
    org: '',
    name: ''
  };
}
exports.resolveScopePackage = resolveScopePackage;

/**
 * Common module constructor.
 */
class CommonModule {
  constructor(entry, name, shortcut, fromDep, error) {
    this.entry = entry;
    this.name = name;
    this.shortcut = shortcut;
    this.fromDep = fromDep;
    this.error = error;
  }
}
exports.CommonModule = CommonModule;

function getNoopModule(error) {
  return new CommonModule(null, null, null, null, error);
}
class ModuleResolver {
  constructor(type, org, allowedTypes, load = false, cwd) {
    this.type = type;
    this.org = org;
    this.allowedTypes = allowedTypes;
    this.load = load;
    this.cwd = cwd;
    this.type = type;
    this.org = org;
    this.allowedTypes = allowedTypes;
    this.load = load;
    this.cwd = cwd || process.cwd();
    this.typePrefixLength = type.length + 1;
    if (org) {
      this.nonScopePrefix = `${org}-${type}-`;
      this.scopePrefix = `@${org}/${type}-`;
      this.prefixSlicePosition = this.typePrefixLength + org.length + 1;
    } else {
      this.nonScopePrefix = `${type}-`;
      this.prefixSlicePosition = this.typePrefixLength;
    }
  }
  /**
   * Resolve package.
   */
  resolve(req, cwd) {
    if (cwd) {
      this.setCwd(cwd);
    }
    const { valid, warnMsg } = dataTypes.assertTypes(req, this.allowedTypes);
    if (!valid) {
      throw new Error(`Invalid value for "${chalk.cyan(this.type)}": ${warnMsg}`);
    }
    const isStringRequest = dataTypes.isString(req);
    const resolved = tryChain(
      [
        [this.resolveNonStringPackage.bind(this), !isStringRequest],
        [this.resolvePathPackage.bind(this), isStringRequest],
        [this.resolveDepPackage.bind(this), isStringRequest]
      ],
      req
    );
    if (!resolved) {
      return getNoopModule();
    }
    return resolved;
  }
  /**
   * Set current working directory.
   */
  setCwd(cwd) {
    this.cwd = cwd;
    return this;
  }
  /**
   * Resolve non-string package, return directly.
   */
  resolveNonStringPackage(req) {
    const { shortcut, name } = this.normalizeRequest(req);
    return new CommonModule(req, name, shortcut, false /* fromDep */);
  }
  /**
   * Resolve module with absolute/relative path.
   */
  resolvePathPackage(req) {
    if (!path.isAbsolute(req)) {
      req = path.resolve(this.cwd, req);
    }
    const normalized = fallback.fsExistsFallback([req, req + '.js', path.resolve(req, 'index.js')]);
    if (!normalized) {
      throw new Error(`${req} Not Found.`);
    }
    const dirname = path.parse(normalized).name;
    const { shortcut, name } = this.normalizeName(dirname);
    try {
      const module = this.load ? require(normalized) : normalized;
      return new CommonModule(module, name, shortcut, false /* fromDep */);
    } catch (error) {
      return getNoopModule(error);
    }
  }
  /**
   * Resolve module from dependency.
   */
  resolveDepPackage(req) {
    const { shortcut, name } = this.normalizeName(req);
    try {
      const entry = this.load
        ? moduleLoader.loadModule(name, this.cwd)
        : moduleLoader.resolveModule(name, this.cwd);
      return new CommonModule(entry, name, shortcut, true /* fromDep */);
    } catch (error) {
      return getNoopModule(error);
    }
  }
  /**
   * Get shortcut.
   */
  getShortcut(req) {
    return req.startsWith(this.nonScopePrefix) ? req.slice(this.prefixSlicePosition) : req;
  }
  /**
   * Normalize string request name.
   */
  normalizeName(req) {
    let name = null;
    let shortcut = null;
    if (req.startsWith('@')) {
      const pkg = resolveScopePackage(req);
      // special handling for default org.
      if (this.org && pkg.org === this.org) {
        shortcut = pkg.name.startsWith(`${this.type}-`)
          ? pkg.name.slice(this.typePrefixLength)
          : pkg.name;
        name = `${this.scopePrefix}${shortcut}`;
      } else {
        shortcut = this.getShortcut(pkg.name);
        name = `@${pkg.org}/${this.nonScopePrefix}${shortcut}`;
      }
      shortcut = `@${pkg.org}/${shortcut}`;
    } else {
      shortcut = this.getShortcut(req);
      name = `${this.nonScopePrefix}${shortcut}`;
    }
    return { name, shortcut };
  }
  /**
   * Normalize any request.
   */
  normalizeRequest(req) {
    if (dataTypes.isString(req)) {
      return this.normalizeName(req);
    }
    if (dataTypes.isObject(req) || dataTypes.isFunction(req)) {
      if (dataTypes.isString(req.name)) {
        return this.normalizeName(req.name);
      } else {
        const shortcut = `anonymous-${hash(req)}`;
        const name = `${this.nonScopePrefix}${shortcut}`;
        return { name, shortcut };
      }
    }
    return {
      name: null,
      shortcut: null
    };
  }
}
exports.getMarkdownItResolver = cwd =>
  new ModuleResolver('markdown-it', '', [String, Function], true /* load module */, cwd);
exports.getPluginResolver = cwd =>
  new ModuleResolver('plugin', 'rcpress', [String, Function, Object], true /* load module */, cwd);
exports.getThemeResolver = cwd =>
  new ModuleResolver('theme', 'rcpress', [String], false /* load module */, cwd);
