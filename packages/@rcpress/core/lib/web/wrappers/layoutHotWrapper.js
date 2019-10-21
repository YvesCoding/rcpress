/**
 * Copyright (c) wangyi7099(Yves Wang)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This file used to import react hot loader and hot exported the layout page.

import { hot } from 'react-hot-loader';
import React, { useRef, useEffect } from 'react';
import Layout from '@themeLayout';
import { register } from 'register-service-worker';

const LayoutWrapperComponent = props => {
  const layoutRef = useRef();

  const emit = (swEventName, ...param) => {
    layoutRef[swEventName] && layoutRef[swEventName].apply(null, param);
  };

  useEffect(() => {
    // registry sw
    if (
      process.env.NODE_ENV === 'production' &&
      SW_ENABLED &&
      window.location.protocol === 'https:'
    ) {
      register(`${BASE_URL}service-worker.js`, {
        ready() {
          console.log('[rcpress:sw] Service worker is active.');
          emit('sw-ready');
        },
        cached(registration) {
          console.log('[rcpress:sw] Content has been cached for offline use.');
          emit('sw-cached', new SWUpdateEvent(registration));
        },
        updated(registration) {
          console.log('[rcpress:sw] Content updated.');
          emit('sw-updated', new SWUpdateEvent(registration));
        },
        offline() {
          console.log('[rcpress:sw] No internet connection found. App is running in offline mode.');
          emit('sw-offline');
        },
        error(err) {
          console.error('[rcpress:sw] Error during service worker registration:', err);
          emit('sw-error', err);
        }
      });
    }
  });
  return <Layout {...props} ref={layoutRef} />;
};

export default hot(module)(LayoutWrapperComponent);
