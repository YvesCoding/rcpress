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
const wrapperConsole = logStr => fn => {
  console.log(logStr);
  return fn;
};
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

  useEffect(() => {}, []);
};
