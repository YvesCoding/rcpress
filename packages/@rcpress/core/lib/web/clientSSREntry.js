/* global BASE_URL, GA_ID, ga, SW_ENABLED, VUEPRESS_VERSION, LAST_COMMIT_HASH*/

import { createApp } from './app';
import { register } from 'register-service-worker';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { siteData } from '@temp/siteData';
import { loadableReady } from '@loadable/component';

loadableReady(() => {
  const App = createApp();

  window.__RCPRESS_VERSION__ = {
    version: RCPRESS_VERSION,
    hash: LAST_COMMIT_HASH
  };

  // Google analytics integration
  if (process.env.NODE_ENV === 'production' && GA_ID) {
    (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] =
        i[r] ||
        function() {
          (i[r].q = i[r].q || []).push(arguments);
        };
      i[r].l = 1 * new Date();
      a = s.createElement(o);
      m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', GA_ID, 'auto');
    ga('send', 'pageview');

    router.afterEach(function(to) {
      ga('set', 'page', to.fullPath);
      ga('send', 'pageview');
    });
  }

  // Register service worker
  hydrate(
    <Router basename={siteData.base}>
      <App />
    </Router>,
    document.getElementById('app')
  );
  if (
    process.env.NODE_ENV === 'production' &&
    SW_ENABLED &&
    window.location.protocol === 'https:'
  ) {
    register(`${BASE_URL}service-worker.js`, {
      ready() {
        console.log('[rcpress:sw] Service worker is active.');
        // app.$refs.layout.$emit('sw-ready');
      },
      cached(registration) {
        console.log('[rcpress:sw] Content has been cached for offline use.');
        // app.$refs.layout.$emit(
        //   'sw-cached',
        //   new SWUpdateEvent(registration)
        // );
      },
      updated(registration) {
        console.log('[rcpress:sw] Content updated.');
        // app.$refs.layout.$emit(
        //   'sw-updated',
        //   new SWUpdateEvent(registration)
        // );
      },
      offline() {
        console.log('[rcpress:sw] No internet connection found. App is running in offline mode.');
        app.$refs.layout.$emit('sw-offline');
      },
      error(err) {
        console.error('[rcpress:sw] Error during service worker registration:', err);
        // app.$refs.layout.$emit('sw-error', err);
        if (GA_ID) {
          ga('send', 'exception', {
            exDescription: err.message,
            exFatal: false
          });
        }
      }
    });
  }
});
