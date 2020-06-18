'use strict';

/*
 * @author wangyi7099
 */

const { renderToString } = require('react-dom/server');
const { ChunkExtractor } = require('@loadable/server');
const { Helmet } = require('react-helmet');
const readline = require('readline');
const { logger, fs, chalk } = require('@rcpress/util');
const path = require('path');

// options: {
//  clientManifest,
//  template,
//  outDir
// }
class Render {
  constructor(serverBundle, options, clientMfs = fs, tmplAtgs = {}) {
    this.bundle = serverBundle;
    this.options = options;
    this.clientMfs = clientMfs;
    this.tmplAtgs = tmplAtgs;
  }

  renderToString(context, isHeaderStrip) {
    return new Promise((resolve, reject) => {
      try {
        const { pageMeta = '' } = context;

        const { clientManifest, template } = this.options;
        const nodeExtractor = new ChunkExtractor({
          stats: this.bundle,
          entrypoints: ['app']
        });
        const { default: CreateApp } = nodeExtractor.requireEntrypoint();

        const webExtractor = new ChunkExtractor({
          stats: clientManifest,
          entrypoints: ['app'],
          inputFileSystem: this.clientMfs
        });

        const jsx = webExtractor.collectChunks(CreateApp(context));
        const html = renderToString(jsx);
        const helmet = Helmet.renderStatic();

        // we put css inline so we don't need the prefetch for css.
        const removeCSSL = link => {
          return (link || '')
            .split('\n')
            .filter(perLink => !/\.css">$/.test(perLink))
            .join('\n');
        };

        webExtractor.getCssString().then(cssString => {
          let res = template.replace('{{{ html() }}}', html);
          if (!isHeaderStrip) {
            res = res
              .replace('{{{ links }}}', removeCSSL(webExtractor.getLinkTags()))
              .replace('{{{ scripts }}}', webExtractor.getScriptTags())
              .replace('{{{ style }}}', `<style>${cssString}</style>`)

              .replace('{{{ title }}}', helmet.title.toString())
              .replace('{{{ meta }}}', helmet.meta.toString() + '\n' + pageMeta)
              .replace('{{{ htmlAttr }}}', helmet.htmlAttributes.toString())
              .replace('{{{ helmet-links }}}', helmet.link.toString())

              .replace('"{{ RC_CONTEXT }}"', JSON.stringify(context));

            Object.keys(this.tmplAtgs).forEach(key => {
              res = res.replace(`{{{ ${key} }}}`, this.tmplAtgs[key]);
            });
          }

          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async writeToFile(page, outDir, html) {
    const pagePath = page.path;
    const filename = decodeURIComponent(
      pagePath.replace(/\/$/, '/index').replace(/^\//, '') + '.html'
    );
    const filePath = path.resolve(outDir, filename);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, html);
  }

  async renderPages(pages) {
    const outDir = this.options.outDir;

    for (const page of pages) {
      const html = await this.renderPage(page);
      await this.writeToFile(page, outDir, html);
    }

    // DONE.
    const relativeDir = path.relative(process.cwd(), outDir);
    logger.success(
      `\n${chalk.green('Success!')} Generated static files in ${chalk.cyan(relativeDir)}.\n`
    );
  }

  async renderPage(page, isHeaderStrip) {
    const pagePath = page.path;
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`Rendering page: ${pagePath}\n`);

    const meta = ((page.frontMatter && page.frontMatter.meta) || []).filter(
      item => item.name !== 'description'
    );
    const pageMeta = renderPageMeta(meta);

    const context = {
      url: pagePath,
      pageMeta
    };

    let html;
    try {
      html = await this.renderToString(context, isHeaderStrip);
    } catch (e) {
      console.error(logger.error(chalk.red(`Error rendering ${pagePath}:`), false));
      throw e;
    }

    return html;
  }
}

function renderPageMeta(meta) {
  if (!meta) return '';
  return meta
    .map(m => {
      let res = `<meta`;
      Object.keys(m).forEach(key => {
        res += ` ${key}="${escape(m[key])}"`;
      });
      return res + `>`;
    })
    .join('');
}

module.exports = Render;
