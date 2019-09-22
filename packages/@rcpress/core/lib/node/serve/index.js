const path = require('path');
const compression = require('compression');
const Render = require('./pageRender');
const express = require('express');

const createServer = ({ app, spaConfig, ssrConfig, templatePath, options }) => {
  let renderer;

  let { readyPromise, clientMfs } = require('./step-server')(
    spaConfig,
    ssrConfig,
    app,
    templatePath,
    (bundle, options) => {
      renderer = new Render(bundle, options, clientMfs);
    }
  );

  const contentBase = path.resolve(options.sourceDir, '.rcpress/public');

  app.use(compression({ threshold: 0 }));
  app.use(options.siteData.base, express.static(contentBase));

  function render(req, res) {
    const s = Date.now();

    const handleError = err => {
      if (err.url) {
        res.redirect(err.url);
      } else if (err.code === 404) {
        res.status(404).send('404 | Page Not Found');
      } else {
        // Render Error Page or Redirect
        res.status(500).send('500 | Internal Server Error');
        console.error(`error during render : ${req.url}`);
        console.error(err.stack);
      }
    };

    const context = {
      url: req.url
    };
    renderer.renderToString(context, (err, html) => {
      if (err) {
        return handleError(err);
      }
      res.send(html);
      if (!isProd) {
        console.log(`whole request: ${Date.now() - s}ms`);
      }
    });
  }

  app.get('*', (req, res) => {
    readyPromise.then(() => render(req, res));
  });
};
module.exports = createServer;
