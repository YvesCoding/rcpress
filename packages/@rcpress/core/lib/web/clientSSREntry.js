/* global BASE_URL, GA_ID, ga, SW_ENABLED, VUEPRESS_VERSION, LAST_COMMIT_HASH*/
import { createApp } from './app';
import { register } from 'register-service-worker';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { siteData } from '@temp/siteData';
import { loadableReady } from '@loadable/component';

loadableReady(() => {
  const App = createApp(RC_CONTEXT, true /*  hot */);

  window.__RCPRESS_VERSION__ = {
    version: RCPRESS_VERSION,
    hash: LAST_COMMIT_HASH
  };

  // Register service worker
  hydrate(
    <Router basename={siteData.base}>
      <App />
    </Router>,
    document.getElementById('app')
  );
});
