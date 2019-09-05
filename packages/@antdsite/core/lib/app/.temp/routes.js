
import loadable from '@loadable/component'import React from 'react'const ThemeLayout = loadable((() => import('@themeLayout'))
const ThemeNotFound = loadable((() => import('@themeNotFound'))
export const routes = [
  {
    name: "v-731889cab319a",
    path: "/guide/",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/README.md",
    component: ThemeLayout
  },
  {
    path: "/guide/index.html",
    redirect: "/guide/"
  },
  {
    name: "v-482a871aad675",
    path: "/guide/cli",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/cli.md",
    component: ThemeLayout
  },
  {
    name: "v-a0f33d5f0c526",
    path: "/guide/configuration",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/configuration.md",
    component: ThemeLayout
  },
  {
    name: "v-6332f3e0570b",
    path: "/guide/getting-started",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/getting-started.md",
    component: ThemeLayout
  },
  {
    name: "v-04e1e582f9d98",
    path: "/guide/global-component",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/global-component.md",
    component: ThemeLayout
  },
  {
    name: "v-b9f729b74713a",
    path: "/guide/i18n",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/i18n.md",
    component: ThemeLayout
  },
  {
    name: "v-5b96d99a00e59",
    path: "/guide/markdown",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/markdown.md",
    component: ThemeLayout
  },
  {
    name: "v-1015879fea9c9",
    path: "/guide/theme",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/theme.md",
    component: ThemeLayout
  },
  {
    name: "v-6fcd1c887be56",
    path: "/guide/usejsx",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/guide/usejsx.md",
    component: ThemeLayout
  },
  {
    name: "v-e1d8b6f3cc8a1",
    path: "/zh/guide/",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/README.md",
    component: ThemeLayout
  },
  {
    path: "/zh/guide/index.html",
    redirect: "/zh/guide/"
  },
  {
    name: "v-551aedb0d61fc",
    path: "/zh/guide/cli",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/cli.md",
    component: ThemeLayout
  },
  {
    name: "v-415909ae1f651",
    path: "/zh/guide/configuration",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/configuration.md",
    component: ThemeLayout
  },
  {
    name: "v-1c1718ad8a073",
    path: "/zh/guide/getting-started",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/getting-started.md",
    component: ThemeLayout
  },
  {
    name: "v-55e31f0f00708",
    path: "/zh/guide/global-component",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/global-component.md",
    component: ThemeLayout
  },
  {
    name: "v-ae96bab878c63",
    path: "/zh/guide/i18n",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/i18n.md",
    component: ThemeLayout
  },
  {
    name: "v-a28888b634456",
    path: "/zh/guide/markdown",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/markdown.md",
    component: ThemeLayout
  },
  {
    name: "v-d3ed27c3d3a5f",
    path: "/zh/guide/theme",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/theme.md",
    component: ThemeLayout
  },
  {
    name: "v-8e63babe42c64",
    path: "/zh/guide/usejsx",
    filePath: "/Users/yiwang/Desktop/node/gatsby-theme-antdsite/packages/docs/docs/zh/guide/usejsx.md",
    component: ThemeLayout
  },
  {
    path: '*',
    component: ThemeNotFound
  }
]