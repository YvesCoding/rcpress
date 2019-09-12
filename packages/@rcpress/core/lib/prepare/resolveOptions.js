const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const createMarkdown = require('@rcpress/markdown');
const loadConfig = require('./loadConfig');
const {
  encodePath,
  fileToPath,
  sort,
  getGitLastUpdatedTimeStamp
} = require('./util');
const { inferTitle, logger } = require('@rcpress/util');
const {
  createResolveThemeLayoutPath,
  createResolvePathWidthExts
} = require('./theme');

module.exports = async function resolveOptions(sourceDir) {
  const rcpressDir = path.resolve(sourceDir, '.rcpress');
  const siteConfig = loadConfig(rcpressDir);

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
    : path.resolve(sourceDir, '.rcpress/dist');

  // resolve theme
  const resolveThemeLayoutPath = createResolveThemeLayoutPath(
    sourceDir
  );
  const resolvePathWidthExts = createResolvePathWidthExts(
    sourceDir
  );
  const useDefaultTheme =
    !siteConfig.theme &&
    !fs.existsSync(path.resolve(rcpressDir, 'theme'));
  const defaultThemeLayoutPath = resolveThemeLayoutPath(
    '@rcpress/theme-default'
  );
  let themePath = null;
  let themeLayoutPath = null;
  let themeNotFoundPath = null;
  let themeEnhanceAppPath = null;

  if (useDefaultTheme) {
    // use default theme
    themePath = path.dirname(defaultThemeLayoutPath);
    themeLayoutPath = defaultThemeLayoutPath;
    themeNotFoundPath = resolvePathWidthExts(
      `${defaultThemeLayoutPath}/NotFound`
    );
  } else {
    // resolve theme Layout
    if (siteConfig.theme) {
      // use external theme
      try {
        themeLayoutPath = resolveThemeLayoutPath(
          siteConfig.theme
        );
        themePath = path.dirname(themeLayoutPath);
      } catch (e) {
        throw new Error(
          logger.Error(
            `Failed to load custom theme layout at theme "${siteConfig.theme}".`,
            false
          )
        );
      }
    } else {
      // use custom theme
      themePath = path.resolve(rcpressDir, 'theme');
      themeLayoutPath = resolvePathWidthExts(
        `${themePath}/Layout`
      );
      if (!themeLayoutPath) {
        throw new Error(
          logger.error(
            `Cannot resolve Layout file in .rcpress/theme`
          )
        );
      }
    }

    // resolve theme NotFound
    themeNotFoundPath = resolvePathWidthExts(
      `${themePath}/NotFound`
    );
    if (!themeNotFoundPath) {
      themeNotFoundPath = resolvePathWidthExts(
        `${path.dirname(defaultThemeLayoutPath)}/NotFound`
      );
    }

    // TODO rcpress should also have a similar stuff to enhance app.
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
  const markdown = await createMarkdown(siteConfig);

  // resolve pageFiles
  const patterns = [
    '**/*.md',
    '**/*.mdx',
    '!.rcpress',
    '!node_modules'
  ];
  if (siteConfig.dest) {
    const outDirRelative = path.relative(sourceDir, outDir);
    if (!outDirRelative.includes('..')) {
      patterns.push('!' + outDirRelative);
    }
  }
  const pageFiles = sort(
    await globby(patterns, { cwd: sourceDir, nocase: true })
  );

  // resolve lastUpdated
  const shouldResolveLastUpdated =
    themeConfig.lastUpdated ||
    Object.keys(
      (siteConfig.locales && themeConfig.locales) || {}
    ).some(base => themeConfig.locales[base].lastUpdated);

  // resolve pagesData
  const pagesData = await Promise.all(
    pageFiles.map(async file => {
      const filepath = path.resolve(sourceDir, file);

      const data = {
        path: encodePath(fileToPath(file))
      };

      if (shouldResolveLastUpdated) {
        data.lastUpdated = getGitLastUpdatedTimeStamp(
          filepath
        );
      }

      // extract yaml frontMatter
      const content = await fs.readFile(filepath, 'utf-8');
      const { headings, frontMatter, toc } = markdown(
        content
      );

      // infer title
      const title = inferTitle(frontMatter, headings);
      if (title) {
        data.title = title;
      }
      if (headings.length) {
        data.headings = headings;
      }
      if (Object.keys(frontMatter.data).length) {
        data.frontMatter = frontMatter.data;
      }
      if (frontMatter.excerpt) {
        const html = markdown.render(frontMatter.excerpt);
        data.excerpt = html;
      }

      data.toc = toc;

      return data;
    })
  );

  // resolve site data
  const siteData = {
    title: siteConfig.title || path.dirname(sourceDir),
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
