import { IAllMdxData, Edges, IGraphqlFrontmatterData, Toc, PageEdge } from '../../templates';

export function getCurrentLoacle(webConfig: any, slug: string) {
  const locales = webConfig.themeConfig.locales;
  if (!locales) return false;

  let targetLocale = '/';

  for (let path in locales) {
    if (path != targetLocale && slug.startsWith(path)) {
      targetLocale = path;
    }
  }

  return Object.keys(locales).length > 1 && targetLocale;
}

export function getcurrentLocaleConfigBySlug(
  webConfig: any,
  slug: string
): {
  localte: string;
  currentLocaleWebConfig: any;
} {
  const targetLocale = getCurrentLoacle(webConfig, slug);
  if (!targetLocale) {
    return {
      localte: '/',
      currentLocaleWebConfig: webConfig
    };
  }

  return {
    localte: targetLocale,
    currentLocaleWebConfig: {
      ...webConfig,
      ...webConfig.locales[targetLocale],
      themeConfig: {
        ...webConfig.themeConfig,
        ...webConfig.themeConfig.locales[targetLocale]
      }
    }
  };
}

// copy from vuepress
// https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/theme-default/util/index.js

export const hashRE = /#.*$/;
export const extRE = /\.(md|html)$/;
export const outboundRE = /^(https?:|mailto:|tel:)/;
export const endingSlashRE = /\/$/;

export function isExternal(path: string) {
  return outboundRE.test(path);
}

export function ensureExt(path: string) {
  if (isExternal(path)) {
    return path;
  }
  const hashMatch = path.match(hashRE);
  const hash = hashMatch ? hashMatch[0] : '';
  const normalized = normalize(path);

  if (endingSlashRE.test(normalized)) {
    return path;
  }
  return normalized + '.html' + hash;
}

export function normalize(path: string) {
  return decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '');
}

export function getPageTitle(node: PageEdge) {
  const topHeading = (node.headings || [{ depth: 1, value: '' }]).find(i => i.depth == 1);
  return node.frontmatter.title || (topHeading && topHeading.value) || node.fields.slug;
}

export function resolvePage(pages: Edges, rawPath: string, base: string): PageInfo {
  if (base) {
    rawPath = resolvePath(rawPath, base);
  }
  const path = normalize(rawPath);

  for (let i = 0; i < pages.length; i++) {
    const node = pages[i].node;

    if (normalize(node.fields.slug) === path) {
      return Object.assign(
        {
          children: []
        },
        node.frontmatter,
        {
          title: getPageTitle(node)
        },
        node.fields,
        { toc: node.tableOfContents }
      );
    }
  }

  console.error(`[AntdSite] No matching page found for sidebar item "${rawPath}"`);
  return {
    children: [],
    title: rawPath,
    slug: rawPath,
    toc: {
      items: []
    }
  };
}

export function resolvePathWithBase(path: string, base: string) {
  if (!base.endsWith('/')) {
    base += '/';
  }

  if (path.startsWith('/')) {
    path = path.slice(1);
  }

  return base + path;
}

function resolvePath(relative: string, base: string, append: string = '') {
  const firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative;
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative;
  }

  const stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  const segments = relative.replace(/^\//, '').split('/');
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/');
}

export interface PageInfo extends IGraphqlFrontmatterData {
  slug?: string;
  collapsable?: boolean;
  children: PageInfo[];
  toc?: Toc;
}

function resolvePageSidebar(config: any, path: string, edges: Edges): PageInfo[] {
  return config ? config.map((item: any) => resolveItem(item, edges, path, 1)) : [];
}

export function resolveSidebarItems(
  allMdxData: IAllMdxData,
  webConfig: any,
  currentSlug: string
): {
  currentPageSidebarItems: PageInfo[];
  allPagesSidebarItems: PageInfo[];
} {
  const { edges } = allMdxData;

  const { currentLocaleWebConfig } = getcurrentLocaleConfigBySlug(webConfig, currentSlug);

  const pageSidebarConfig = currentLocaleWebConfig.themeConfig.sidebar;

  let currentPageSidebarItems: PageInfo[] = [];
  let allPagesSidebarItems: PageInfo[] = [];

  if (!pageSidebarConfig) {
    return {
      currentPageSidebarItems,
      allPagesSidebarItems
    };
  } else {
    allPagesSidebarItems = Object.keys(pageSidebarConfig).reduce((pre, cur) => {
      const resolvedConfig = resolvePageSidebar(pageSidebarConfig[cur], cur, edges);

      if (currentSlug.startsWith(cur)) {
        currentPageSidebarItems = resolvedConfig;
      }

      return pre.concat(resolvedConfig as any);
    }, []);

    return {
      currentPageSidebarItems,
      allPagesSidebarItems
    };
  }
}

function resolveItem(item: any, pages: Edges, base: string, nestedLevel: number): PageInfo | null {
  if (typeof item === 'string') {
    return resolvePage(pages, item, base);
  } else if (Array.isArray(item)) {
    return Object.assign(resolvePage(pages, item[0], base), {
      title: item[1]
    });
  } else {
    if (nestedLevel > 2) {
      console.error('[AntdSite]: Currently antdsite sidebar only support max two levels nested. ');

      return null;
    }

    const children = item.children || [];
    return {
      title: item.title,
      children: children.map((child: any) => resolveItem(child, pages, base, nestedLevel + 1)),
      collapsable: item.collapsable !== false
    };
  }
}
