const fs = require('fs-extra');
const path = require('path');
const express = require('express');
const compression = require('compression');
const resolve = file => path.resolve(__dirname, file);
const { createBundleRenderer } = require('vue-server-renderer');
const webpack = require('webpack');

module.exports = createServer;

const createServer = ({ clientConfig, serverConfig, templatePath, options }) => {
  function createRenderer(bundle, options) {
    return createBundleRenderer(bundle, options);
  }

  const app = express();

  let renderer;
  let readyPromise;

  let readyPromise = require('./setup-dev-server')(
    clientConfig,
    serverConfig,
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options);
    }
  );

  const serve = (path, cache) =>
    express.static(resolve(path), {
      maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
    });

  const contentBase = path.resolve(options.sourceDir, '.rcpress/public');

  app.use(compression({ threshold: 0 }));
  app.use(options.siteData.base, serve(contentBase, true));

  function render(req, res) {
    const s = Date.now();

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Server', 'TEST-VUE-SSR');

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
      title: 'Vue-SSR-Full-Feature-Example', // default title
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

  return app;
};
