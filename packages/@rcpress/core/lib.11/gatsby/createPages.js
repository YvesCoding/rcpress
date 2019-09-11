/* eslint-disable no-console */
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

const { resolve } = require('path');
const siteData = require('../config').getFinalConfig();
const { themeConfig } = siteData;
const path = require('path');

function isHome(frontMatter, path) {
  return (
    frontMatter.home === true &&
    ((themeConfig.locales &&
      Object.keys(themeConfig.locales).indexOf(path) !==
        -1) ||
      path === '/')
  );
}

function resolveDirPath(path, endSlash) {
  const dirPath = path.dirname(path);

  return endSlash ? dirPath : dirPath + '/';
}

module.exports = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  // Used to detect and prevent duplicate redirects

  const template = resolve(
    __dirname,
    '../../src/templates/index.tsx'
  );

  // Redirect /index.html to root.
  createRedirect({
    fromPath: '/index.html',
    redirectInBrowser: true,
    toPath: siteData.base
  });

  const allMdx = await graphql(
    `
      {
        allMdx(limit: 1000) {
          edges {
            node {
              fields {
                path
                path
              }
              frontMatter {
                home
                maxTocDeep
              }
            }
          }
        }
      }
    `
  );

  if (allMdx.errors) {
    console.error(allMdx.errors);

    throw Error(allMdx.errors);
  }
  const redirects = {};

  const edges = allMdx.data.allMdx.edges;

  edges.forEach(edge => {
    const { fields, frontMatter } = edge.node;
    const { path } = fields;
    let isWebsiteHome = false;

    if (isHome(frontMatter, path)) {
      isWebsiteHome = true;
    }

    if (frontMatter.home === true && !isWebsiteHome) {
      redirects[resolveDirPath(path)] = path;
      redirects[resolveDirPath(path, true)] = path;
    }

    const createArticlePage = path => {
      return createPage({
        path,
        component: template,
        context: {
          isWebsiteHome,
          siteData,
          path,
          maxTocDeep:
            frontMatter.maxTocDeep ||
            siteData.themeConfig.maxTocDeep
        }
      });
    };

    // Register primary URL.
    createArticlePage(path);
  });

  Object.keys(redirects).map(path => {
    return createRedirect({
      fromPath: path,
      redirectInBrowser: true,
      toPath: redirects[path]
    });
  });
};
