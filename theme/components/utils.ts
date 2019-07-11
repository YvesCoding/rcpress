import { IAllMdxData, Edges } from '../templates/docs';
import { MenuDataItem } from './content/MainContent';

export function ping(callback: (arg0: any) => void) {
  // eslint-disable-next-line
  const url =
    'https://private-a' +
    'lipay' +
    'objects.alip' +
    'ay.com/alip' +
    'ay-rmsdeploy-image/rmsportal/RKuAiriJqrUhyqW.png';
  const img = new Image();
  let done: boolean;
  const finish = (status: string) => {
    if (!done) {
      done = true;
      img.src = '';
      callback(status);
    }
  };
  img.onload = () => finish('responded');
  img.onerror = () => finish('error');
  img.src = url;
  return setTimeout(() => finish('timeout'), 1500);
}

export function isLocalStorageNameSupported() {
  const testKey = 'test';
  const storage = window.localStorage;
  try {
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

export function getCurrentLoacle(webConfig: any, slug: string) {
  const locales = webConfig.themeConfig.locales;
  const base = webConfig.base;

  function nomalizeSlug(_path: string) {
    return (base + _path).replace(/\/\//g, '/');
  }

  if (!locales) return false;

  let targetLocale = '/';

  for (let path in locales) {
    if (path != targetLocale && slug.startsWith(nomalizeSlug(path))) {
      targetLocale = path;
    }
  }

  return Object.keys(locales).length > 1 && targetLocale;
}

export function getCurrentWebConfigBySlug(
  webConfig: any,
  slug: string
): {
  localte: string;
  currentWebConfig: any;
} {
  const targetLocale = getCurrentLoacle(webConfig, slug);
  if (!targetLocale) return webConfig;

  return {
    localte: targetLocale,
    currentWebConfig: {
      ...webConfig,
      ...webConfig.locales[targetLocale],
      themeConfig: {
        ...webConfig.themeConfig,
        ...webConfig.themeConfig.locales[targetLocale],
      },
    },
  };
}

// copy from vuepress!!!
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

export function resolvePage(pages: Edges, rawPath: string, base: string): MenuDataItem {
  if (base) {
    rawPath = resolvePath(rawPath, base);
  }
  const path = normalize(rawPath);
  for (let i = 0; i < pages.length; i++) {
    if (normalize(pages[i].node.fields.slug) === path) {
      return Object.assign(
        {
          children: [],
        },
        pages[i].node.frontmatter,
        pages[i].node.fields
      );
    }
  }
  console.error(`[AntDocs] No matching page found for sidebar item "${rawPath}"`);
  return {
    children: [],
    title: '',
  };
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

export function resolvePathWithBase(path: string, base: string) {
  if (base.endsWith('/')) {
    base = base.slice(0, base.length - 1);
  }
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  return base + path;
}

export function resolveSidebarItems(
  allMdxData: IAllMdxData,
  webConfig: any,
  currentSlug: string
): MenuDataItem[] {
  const { edges } = allMdxData;

  const { currentWebConfig } = getCurrentWebConfigBySlug(webConfig, currentSlug);

  const pageSidebarConfig = currentWebConfig.themeConfig.sidebar;

  if (!pageSidebarConfig) {
    return [];
  } else {
    const { config, path } = resolveSidebarConfig(currentSlug, pageSidebarConfig);

    return config
      ? config.map((item: any) =>
          resolveItem(item, edges, resolvePathWithBase(path, currentWebConfig.base), false)
        )
      : [];
  }
}

function resolveSidebarConfig(slug: string, sidebarConfigs: any) {
  for (let path in sidebarConfigs) {
    if (slug.startsWith(path)) {
      return {
        path,
        config: sidebarConfigs[path],
      };
    }
  }

  return {
    path: '',
    config: null,
  };
}

function resolveItem(item: any, pages: Edges, base: string, isNested: boolean): MenuDataItem {
  if (typeof item === 'string') {
    return resolvePage(pages, item, base);
  } else if (Array.isArray(item)) {
    return Object.assign(resolvePage(pages, item[0], base), {
      title: item[1],
    });
  } else {
    if (isNested) {
      console.error(
        '[AntDocs] Nested sidebar groups are not supported. ' +
          'Consider using navbar + categories instead.'
      );
    }
    const children = item.children || [];
    return {
      title: item.title,
      children: children.map((child: any) => resolveItem(child, pages, base, true)),
      collapsable: item.collapsable !== false,
    };
  }
}
