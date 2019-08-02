import React from 'react';

export const PageContext = React.createContext({
  webConfig: {},
  slug: '',
  currentLocaleWebConfig: {},
  currentPageSidebarItems: {},
  allPagesSidebarItems: {},
  currentPageInfo: {},
  currentPageContent: {},
});
