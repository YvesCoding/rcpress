const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const createMarkdown = require('@antdsite/markdown');
const loadConfig = require('./loadConfig');
const { encodePath, fileToPath, sort, getGitLastUpdatedTimeStamp } = require('./util');
const { inferTitle, logger } = require('@antdsite/util');
const { createResolveThmepath, createResolvePathWidthExts } = require('./theme');

module.exports = async function resolveOptions(sourceDir) {
  const antdsiteDir = path.resolve(sourceDir, '.antdsite');
  const siteConfig = loadConfig(antdsiteDir);

  // normalize head tag urls for base
  const base = siteConfig.base || '/';
  if (base !== '/' && siteConfig.head) {
    siteConfig.head.forEach(tag => {
      const attrs = tag[1];
      if (attrs) {
        for (const name in attrs) {
          if (name === 'src' || name === 'href') {
            const value = attrs[name];
            if (value.charAt(0) === '/') {
              attrs[name] = base + value.slice(1);
            }
          }
        }
      }
    });
  }

  // resolve outDir
  const outDir = siteConfig.dest
    ? path.resolve(siteConfig.dest)
    : path.resolve(sourceDir, '.antdsite/dist');

  // resolve theme
  const resolveThemePath = createResolveThmepath(sourceDir);
  const resolvePathWidthExts = createResolvePathWidthExts(sourceDir);
  const useDefaultTheme = !siteConfig.theme && !fs.existsSync(path.resolve(antdsiteDir, 'theme'));
  const defaultThemePath = resolveThemePath('@antdsite/theme-default');
  let themePath = null;
  let themeLayoutPath = null;
  let themeNotFoundPath = null;
  let themeEnhanceAppPath = null;

  if (useDefaultTheme) {
    // use default theme
    themePath = path.dirname(defaultThemePath);
    themeLayoutPath = defaultThemePath;
    themeNotFoundPath = resolvePathWidthExts(`${defaultThemePath}/NotFound`);
  } else {
    // resolve theme Layout
    if (siteConfig.theme) {
      // use external theme
      try {
        themeLayoutPath = resolveThemePath(siteConfig.theme);
        themePath = path.dirname(themeLayoutPath);
      } catch (e) {
        throw new Error(
          logger.Error(`Failed to load custom theme layout at theme "${siteConfig.theme}".`, false)
        );
      }
    } else {
      // use custom theme
      themePath = path.resolve(antdsiteDir, 'theme');
      themeLayoutPath = resolvePathWidthExts(`${themePath}/Layout`);
      if (!themeLayoutPath) {
        throw new Error(logger.error(`Cannot resolve Layout file in .antdsite/theme`));
      }
    }

    // resolve theme NotFound
    themeNotFoundPath = resolvePathWidthExts(`${themePath}/NotFound`);
    if (!themeNotFoundPath) {
      themeNotFoundPath = resolvePathWidthExts(`${defaultThemePath}/NotFound`);
    }

    // TODO antdsite should also have a similar stuff to enhance app.
    // resolve theme enhanceApp
    // themeEnhanceAppPath = path.resolve(themePath, 'enhanceApp.js');
    // if (!fs.existsSync(themeEnhanceAppPath)) {
    //   themeEnhanceAppPath = null;
    // }
  }

  // resolve theme config
  const themeConfig = siteConfig.themeConfig || {};

  // TODO Algolia supported
  // resolve algolia
  const isAlgoliaSearch = false;
  //   themeConfig.algolia ||
  //   Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
  //     base => themeConfig.locales[base].algolia
  //   );

  // resolve markdown
  const markdown = createMarkdown(siteConfig);

  // resolve pageFiles
  const patterns = ['**/*.md', '!.antdsite', '!node_modules'];
  if (siteConfig.dest) {
    const outDirRelative = path.relative(sourceDir, outDir);
    if (!outDirRelative.includes('..')) {
      patterns.push('!' + outDirRelative);
    }
  }
  const pageFiles = sort(await globby(patterns, { cwd: sourceDir }));

  // resolve lastUpdated
  const shouldResolveLastUpdated =
    themeConfig.lastUpdated ||
    Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
      base => themeConfig.locales[base].lastUpdated
    );

  // resolve pagesData
  const pagesData = await Promise.all(
    pageFiles.map(async file => {
      const filepath = path.resolve(sourceDir, file);
      const key =
        'v-' +
        Math.random()
          .toString(16)
          .slice(2);
      const data = {
        key,
        path: encodePath(fileToPath(file))
      };

      if (shouldResolveLastUpdated) {
        data.lastUpdated = getGitLastUpdatedTimeStamp(filepath);
      }

      // extract yaml frontmatter
      const content = await fs.readFile(filepath, 'utf-8');
      const results = markdown(content);
      const frontmatter = results.frontmatter;
      // infer title
      const title = inferTitle(frontmatter);
      if (title) {
        data.title = title;
      }
      const headers = results.headings;
      if (headers.length) {
        data.headers = headers;
      }
      if (Object.keys(frontmatter.data).length) {
        data.frontmatter = frontmatter.data;
      }
      if (frontmatter.excerpt) {
        const html = markdown.render(frontmatter.excerpt);
        data.excerpt = html;
      }
      return data;
    })
  );

  // resolve site data
  const siteData = {
    title: siteConfig.title || '',
    description: siteConfig.description || '',
    base,
    pages: pagesData,
    themeConfig,
    locales: siteConfig.locales
  };

  const options = {
    siteConfig,
    siteData,
    sourceDir,
    outDir,
    publicPath: base,
    pageFiles,
    pagesData,
    themePath,
    themeLayoutPath,
    themeNotFoundPath,
    themeEnhanceAppPath,
    useDefaultTheme,
    isAlgoliaSearch,
    markdown
  };

  return options;
};
