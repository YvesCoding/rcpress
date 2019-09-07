
import loadable from '@loadable/component';
import React from 'react';
const ThemeLayout = loadable(() => import('@themeLayout'))
const ThemeNotFound = loadable(() => import('@themeNotFound'))
export const routes = [
  {
    name: "v-ca8da828a181e",
    path: "/guide/",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/README.md",
    component: ThemeLayout
  },
  {
    path: "/guide/index.html",
    redirect: "/guide/"
  },
  {
    name: "v-e896bb2f5d3e1",
    path: "/guide/cli",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/cli.md",
    component: ThemeLayout
  },
  {
    name: "v-925ae7a68e8e4",
    path: "/guide/configuration",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/configuration.md",
    component: ThemeLayout
  },
  {
    name: "v-2961e904ed6c7",
    path: "/guide/getting-started",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/getting-started.md",
    component: ThemeLayout
  },
  {
    name: "v-b4c5b547c76ab",
    path: "/guide/global-component",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/global-component.md",
    component: ThemeLayout
  },
  {
    name: "v-9a473de2f9cb3",
    path: "/guide/i18n",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/i18n.md",
    component: ThemeLayout
  },
  {
    name: "v-0a94ea29ecfa7",
    path: "/guide/markdown",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/markdown.md",
    component: ThemeLayout
  },
  {
    name: "v-116844bc31e56",
    path: "/guide/theme",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/theme.md",
    component: ThemeLayout
  },
  {
    name: "v-0ab7ddf0c3254",
    path: "/guide/usejsx",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/usejsx.md",
    component: ThemeLayout
  },
  {
    name: "v-43600156fed5",
    path: "/zh/guide/",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/README.md",
    component: ThemeLayout
  },
  {
    path: "/zh/guide/index.html",
    redirect: "/zh/guide/"
  },
  {
    name: "v-a3e4553cafbea",
    path: "/zh/guide/cli",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/cli.md",
    component: ThemeLayout
  },
  {
    name: "v-12be87a9475e8",
    path: "/zh/guide/configuration",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/configuration.md",
    component: ThemeLayout
  },
  {
    name: "v-074de94e90c2b",
    path: "/zh/guide/getting-started",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/getting-started.md",
    component: ThemeLayout
  },
  {
    name: "v-79bf970a2ccd4",
    path: "/zh/guide/global-component",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/global-component.md",
    component: ThemeLayout
  },
  {
    name: "v-d9815935e2363",
    path: "/zh/guide/i18n",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/i18n.md",
    component: ThemeLayout
  },
  {
    name: "v-4a642621e802b",
    path: "/zh/guide/markdown",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/markdown.md",
    component: ThemeLayout
  },
  {
    name: "v-86503805de7b3",
    path: "/zh/guide/theme",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/theme.md",
    component: ThemeLayout
  },
  {
    name: "v-f6aa367606bbe",
    path: "/zh/guide/usejsx",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/usejsx.md",
    component: ThemeLayout
  },
  {
    path: '*',
    component: ThemeNotFound
  }
]