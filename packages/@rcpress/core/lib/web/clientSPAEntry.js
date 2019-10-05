/* global BASE_URL, GA_ID, ga, SW_ENABLED, VUEPRESS_VERSION, LAST_COMMIT_HASH*/
import App from './app';
import { register } from 'register-service-worker';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { siteData } from '@temp/siteData';

window.__RCPRESS_VERSION__ = {
  version: RCPRESS_VERSION,
  hash: LAST_COMMIT_HASH
};

// Register service worker
render(
  <Router basename={siteData.base}>
    <App />
  </Router>,
  document.getElementById('app')
);
