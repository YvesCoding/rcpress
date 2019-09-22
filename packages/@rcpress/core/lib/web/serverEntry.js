/* global BASE_URL, GA_ID, ga, SW_ENABLED, VUEPRESS_VERSION, LAST_COMMIT_HASH*/

import { createApp } from './app';
import { register } from 'register-service-worker';
import { render } from 'react-dom';
import { StaticRouter as Router } from 'react-router-dom';
import React from 'react';
import { siteData } from '@temp/siteData';

const App = createApp();

export default ctx => {
  return (
    <Router basename={siteData.base} context={{ url: ctx.url }}>
      <App />
    </Router>
  );
};
