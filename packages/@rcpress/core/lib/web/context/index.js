import React, { useContext } from 'react';

const SiteContext = React.createContext({
  siteData: {},
  path: '',
  currentLocate: undefined,
  currentLocaleSiteData: {},
  currentPageSidebarItems: {},
  allPagesSidebarItems: {},
  currentPageInfo: {}
});
export { SiteContext };

const components = React.createContext({});
export { components };

const useSiteContext = () => {
  return useContext(SiteContext);
};

export { useSiteContext };

// service worker notification .

export const useSW = () => {};
