const { renderToString } = require('react-dom/server');
const { ChunkExtractor } = require('@loadable/server');
const { Helmet } = require('react-helmet');

class Render {
  constructor(bundle, options, clientMfs) {
    this.bundle = bundle;
    this.options = options;
    this.clientMfs = clientMfs;
  }

  renderToString(context, cb) {
    try {
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

      // we put css inline and don't need prefetch for css.
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
          .replace('{{{ meta }}}', helmet.meta.toString())
          .replace('{{{ htmlAttr }}}', helmet.htmlAttributes.toString())
          .replace('{{{ helmet-links }}}', helmet.link.toString())

          .replace('"{{ RC_CONTEXT }}"', JSON.stringify(context));
        cb(null, res);
      });
    } catch (error) {
      cb(error, null);
    }
  }
}

module.exports = Render;
