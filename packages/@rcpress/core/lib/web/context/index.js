import React, { useContext, useReducer, useEffect } from 'react';
import { noop } from '../shared/noop';
import { register } from 'register-service-worker';

// global site data sotred in the context
export const SiteContext = React.createContext({
  siteData: {},
  path: '',
  currentLocate: undefined,
  currentLocaleSiteData: {},
  currentPageSidebarItems: {},
  allPagesSidebarItems: {},
  currentPageInfo: {}
});

export const useSiteContext = () => {
  return useContext(SiteContext);
};

// sw notice mechanism hook.
const swReducer = (state, action) => {
  switch (action.type) {
    case 'ready':
      return { ...state, ready: action.payload };
    case 'cached':
      return { ...state, cached: action.payload };
    case 'updated':
      return { ...state, updated: action.payload };
    case 'offline':
      return { ...state, offline: action.payload };
    case 'error':
      return { ...state, error: action.payload };
    default:
      throw new Error('unkonwn sw type.');
  }
};
export const useSwNotice = () => {
  const [state, dispatch] = useReducer(swReducer, {
    ready: noop,
    cached: noop,
    updated: noop,
    offline: noop,
    error: noop
  });

  useEffect(() => {
    // Register service worker
    if (
      process.env.NODE_ENV === 'production' &&
      SW_ENABLED &&
      window.location.protocol === 'https:'
    ) {
      register(`${BASE_URL}service-worker.js`, {
        ready() {
          console.log('[vuepress:sw] Service worker is active.');
          state.ready();
        },
        cached(registration) {
          console.log('[vuepress:sw] Content has been cached for offline use.');
          state.cached(new SWUpdateEvent(registration));
        },
        updated(registration) {
          console.log('[vuepress:sw] Content updated.');
          state.updated(new SWUpdateEvent(registration));
        },
        offline() {
          console.log(
            '[vuepress:sw] No internet connection found. App is running in offline mode.'
          );
          state.offline();
        },
        error(err) {
          console.error('[vuepress:sw] Error during service worker registration:', err);
          state.error(err);
        }
      });
    }
  }, []);

  return dispatch;
};
