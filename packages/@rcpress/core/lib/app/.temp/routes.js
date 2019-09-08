
import loadable from '@loadable/component';
import React from 'react';
const ThemeLayout = loadable(() => import('@themeLayout'));
const ThemeNotFound = loadable(() => import('@themeNotFound'));
export const routes = [
  {
    name: "v-e812a01797814",
    path: "/guide/",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\guide\\README.md",
    component: ThemeLayout,
    exact: true
  },
  {
    path: "/guide/index.html",
    redirect: "/guide/",
    exact: true
  },
  {
    name: "v-4dc9219a1afcd",
    path: "/guide/cli",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\guide\\cli.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-07fc9ecad62bb",
    path: "/guide/configuration",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\guide\\configuration.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-2212f14da5fd2",
    path: "/guide/getting-started",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\guide\\getting-started.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-7c8726c72d1cc",
    path: "/guide/global-component",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\guide\\global-component.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-bacfab46d31d6",
    path: "/guide/i18n",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\guide\\i18n.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-26a043681b012",
    path: "/guide/markdown",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\guide\\markdown.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-2f53c887a6318",
    path: "/guide/theme",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\guide\\theme.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-27c5f4497b5c6",
    path: "/guide/usejsx",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\guide\\usejsx.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-1171c24e14b06",
    path: "/zh/guide/",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\zh\\guide\\README.md",
    component: ThemeLayout,
    exact: true
  },
  {
    path: "/zh/guide/index.html",
    redirect: "/zh/guide/",
    exact: true
  },
  {
    name: "v-88686f3914488",
    path: "/zh/guide/cli",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\zh\\guide\\cli.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-177c913f3e76d",
    path: "/zh/guide/configuration",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\zh\\guide\\configuration.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-eb82a1be6ed89",
    path: "/zh/guide/getting-started",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\zh\\guide\\getting-started.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-3c2e3d15827ff",
    path: "/zh/guide/global-component",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\zh\\guide\\global-component.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-ffc8f8afafa39",
    path: "/zh/guide/i18n",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\zh\\guide\\i18n.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-c8cac1e4912af",
    path: "/zh/guide/markdown",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\zh\\guide\\markdown.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-a6072839591ad",
    path: "/zh/guide/theme",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\zh\\guide\\theme.md",
    component: ThemeLayout,
    exact: true
  },
  {
    name: "v-afe41d612fb0d",
    path: "/zh/guide/usejsx",
    filePath: "E:\\antdsite\\packages\\docs\\docs\\zh\\guide\\usejsx.md",
    component: ThemeLayout,
    exact: true
  },
  {
    path: '*',
    component: ThemeNotFound,
    exact: true
  }
]