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
  lang: string;
  themeConfig: {
    repo: string;
    docsDir?: string;
    sidebar?: any;
    lang?: string;
    title?: string;
    description?: string;
    showBackToTop?: boolean;
    locales?: Array<any>;
    lastUpdated?: boolean;
    editLinkText?: string;
    editLinks?: boolean;
    docsRepo?: string;
    docsBranch: string;
    showAvatarList?: boolean;
  };
  locales: Array<any>;
  head: Array<any>;
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
};

declare const SiteContext: React.Context<siteContext>;

// declare const components: {
//   [key: string]: React.Component;
// };

declare const useSiteContext: () => siteContext;

export { SiteContext };
// export { components };
export { useSiteContext };
