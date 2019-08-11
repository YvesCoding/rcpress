import React from 'react';

export const PageContext = React.createContext<{
  webConfig: any;
  slug: string;
  currentLocaleWebConfig: any;
  currentPageSidebarItems: any;
  allPagesSidebarItems: any;
  currentPageInfo: any;
  currentPageContent: any;
  isWebsiteHome: boolean;
}>({
  webConfig: {},
  slug: '',
  currentLocaleWebConfig: {},
  currentPageSidebarItems: {},
  allPagesSidebarItems: {},
  currentPageInfo: {},
  currentPageContent: {},
  isWebsiteHome: false
});
