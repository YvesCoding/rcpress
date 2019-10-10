const { renderToString } = require('react-dom/server');
const { ChunkExtractor } = require('@loadable/server');
const { Helmet } = require('react-helmet');
const fs = require('fs-extra');
const chalk = require('chalk');

class Render {
  constructor(bundle, options, clientMfs = fs) {
    this.bundle = bundle;
    this.options = options;
    this.clientMfs = clientMfs;
  }

  renderToString(context) {
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
          const res = template
            .replace('{{{ html() }}}', html)

            .replace('{{{ links }}}', removeCSSL(webExtractor.getLinkTags()))
            .replace('{{{ scripts }}}', webExtractor.getScriptTags())
            .replace('{{{ style }}}', `<style>${cssString}</style>`)

            .replace('{{{ title }}}', helmet.title.toString())
            .replace('{{{ meta }}}', helmet.meta.toString() + '\n' + pageMeta)
            .replace('{{{ htmlAttr }}}', helmet.htmlAttributes.toString())
            .replace('{{{ helmet-links }}}', helmet.link.toString())

            .replace('"{{ RC_CONTEXT }}"', JSON.stringify(context));

          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async renderPages(pages) {
    const outDir = this.options.outDir;

    for (const page of pages) {
      await this.renderPage(page, outDir);
    }

    // DONE.
    const relativeDir = path.relative(process.cwd(), outDir);
    logger.success(
      `\n${chalk.green('Success!')} Generated static files in ${chalk.cyan(relativeDir)}.\n`
    );
  }

  async renderPage(page, outDir) {
    const pagePath = page.path;
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`Rendering page: ${pagePath}`);

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
      html = await this.renderToString(context);
    } catch (e) {
      console.error(logger.error(chalk.red(`Error rendering ${pagePath}:`), false));
      throw e;
    }
    const filename = decodeURIComponent(pagePath.replace(/\/$/, '/index.html').replace(/^\//, ''));
    const filePath = path.resolve(outDir, filename);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, html);
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
