/*
 * @author wangyi7099
 */

// eslint-disable-next-line
/* global BASE_URL, GA_ID, ga, SW_ENABLED, VUEPRESS_VERSION, LAST_COMMIT_HASH*/
import App from './app';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { siteData } from '@temp/siteData';
import { loadableReady } from '@loadable/component';

// // suggest dev server restart on base change
if (module.hot) {
  module.hot.accept('@temp/siteData', () => {
    window.location.reload();
  });
}

loadableReady(() => {
  window.__RCPRESS_VERSION__ = {
    version: RCPRESS_VERSION,
    hash: LAST_COMMIT_HASH
  };

  // Register service worker
  hydrate(
    <Router basename={siteData.base}>
      <App {...window.RC_CONTEXT} siteData={siteData} />
    </Router>,
    document.getElementById('app')
  );
});
