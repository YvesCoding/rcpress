/* global BASE_URL, GA_ID, ga, SW_ENABLED, VUEPRESS_VERSION, LAST_COMMIT_HASH*/

import App from './app';
import { register } from 'register-service-worker';
import { StaticRouter as Router } from 'react-router-dom';
import React from 'react';
import { siteData } from '@temp/siteData';

export default ctx => {
  return (
    <Router basename={siteData.base} location={ctx.url} context={ctx}>
      <App {...ctx} />
    </Router>
  );
};
