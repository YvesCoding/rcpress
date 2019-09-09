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

function isHome(frontmatter, slug) {
  return (
    frontmatter.home === true &&
    ((themeConfig.locales && Object.keys(themeConfig.locales).indexOf(slug) !== -1) || slug === '/')
  );
}

function resolveDirPath(slug, endSlash) {
  const dirPath = path.dirname(slug);

  return endSlash ? dirPath : dirPath + '/';
}

module.exports = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  // Used to detect and prevent duplicate redirects

  const template = resolve(__dirname, '../../src/templates/index.tsx');

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
                slug
                path
              }
              frontmatter {
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
    const { fields, frontmatter } = edge.node;
    const { slug } = fields;
    let isWebsiteHome = false;

    if (isHome(frontmatter, slug)) {
      isWebsiteHome = true;
    }

    if (frontmatter.home === true && !isWebsiteHome) {
      redirects[resolveDirPath(slug)] = slug;
      redirects[resolveDirPath(slug, true)] = slug;
    }

    const createArticlePage = path => {
      return createPage({
        path,
        component: template,
        context: {
          isWebsiteHome,
          siteData,
          slug,
          maxTocDeep: frontmatter.maxTocDeep || siteData.themeConfig.maxTocDeep
        }
      });
    };

    // Register primary URL.
    createArticlePage(slug);
  });

  Object.keys(redirects).map(path => {
    return createRedirect({
      fromPath: path,
      redirectInBrowser: true,
      toPath: redirects[path]
    });
  });
};
