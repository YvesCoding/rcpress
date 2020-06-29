/*
 * @author wangyi7099
 */
// eslint-disable-next-line
/* global BASE_URL, GA_ID, ga, SW_ENABLED, VUEPRESS_VERSION, LAST_COMMIT_HASH*/
import App from './app';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { siteData } from '@temp/siteData';

window.__RCPRESS_VERSION__ = {
  version: RCPRESS_VERSION,
  hash: LAST_COMMIT_HASH
};

// // suggest dev server restart on base change
if (module.hot) {
  module.hot.accept('@temp/siteData', () => {
    window.location.reload();
  });
}

// Register service worker
render(
  <Router basename={siteData.base}>
    <App siteData={siteData} />
  </Router>,
  document.getElementById('app')
);
