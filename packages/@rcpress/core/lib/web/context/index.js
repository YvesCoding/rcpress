/*
 * @author wangyi7099
 */

import React, { useContext } from 'react';

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

export default () => {
  return useContext(SiteContext);
};
