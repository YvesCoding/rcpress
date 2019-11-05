interface RawToc {
  url: string;
  title: string;
  items: RawToc[];
}

interface Page {
  avatarList?: Array<{
    href: string;
    text: string;
    src: string;
  }>;
  path?: string;
  filePath: string;
  lastUpdated?: number;
  title: string;
  headings?: Array<{ value?: string; depth?: number }>;
  frontMatter?: any;
  isWebsiteHome?: boolean;
  toc?: { items: Array<RawToc> };
}

interface SiteData {
  title: string;
  description: string;
  base?: string;
  pages?: Array<Page>;
  footer?: string;
  lang?: string;
  serviceWorker?: boolean;
  updatePopup: {
    message?: string;
    buttonText?: string;
  };
  themeConfig: {
    repo: string;
    docsDir?: string;
    sidebar?: any;
    lang?: string;
    title?: string;
    description?: string;
    showBackToTop?: boolean;
    locales?: { [key: string]: any };
    lastUpdated?: boolean;
    editLinkText?: string;
    editLinks?: boolean;
    docsRepo?: string;
    docsBranch: string;
    showAvatarList?: boolean;
    nav: Array<any>;
    search?: boolean;
    searchMaxSuggestions?: number;
    selectText?: string;
  };
  locales: { [key: string]: any };
  head: Array<any>;
  logo?: string;
}

type currentPage = Page & {
  Markdown: any;
};

type siteContext = {
  siteData: SiteData;
  path: string;
  currentLocaleSiteData: SiteData;
  currentPageSidebarItems: any;
  allPagesSidebarItems: any;
  currentPageInfo: currentPage;
  currentLocate: string;
};

declare const SiteContext: React.Context<siteContext>;

// declare const components: {
//   [key: string]: React.Component;
// };

declare const useSiteContext: () => siteContext;
export { SiteContext };
// export { components };
export { useSiteContext };

// service worker
type state = {
  ready: any;
  cached: any;
  updated: any;
  offline: any;
  error: any;
};
type dispatch = (args: { type: keyof state; payload: any }) => void;
declare const useSWHook: () => [state, dispatch];
declare const useSWRegistry: () => void;
export { useSWHook };
export { useSWRegistry };
