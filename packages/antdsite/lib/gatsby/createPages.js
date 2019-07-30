/* eslint-disable no-console */
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

const { resolve } = require('path');
const webConfig = require('../util').getFinalConfig();
const { themeConfig } = webConfig;
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

  const docsTemplate = resolve(__dirname, '../../src/templates/docs.tsx');
  const indexTemplate = resolve(__dirname, '../../src/templates/home.tsx');

  // Redirect /index.html to root.
  createRedirect({
    fromPath: '/index.html',
    redirectInBrowser: true,
    toPath: '/',
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
    if (!isHome(frontmatter, slug)) {
      if (frontmatter.home === true) {
        redirects[resolveDirPath(slug)] = slug;
        redirects[resolveDirPath(slug, true)] = slug;
      }

      const createArticlePage = path => {
        return createPage({
          path,
          component: docsTemplate,
          context: {
            webConfig,
            slug,
            maxTocDeep: frontmatter.maxTocDeep || webConfig.themeConfig.maxTocDeep,
          },
        });
      };

      // Register primary URL.
      createArticlePage(slug);
    } else {
      createPage({
        path: slug,
        component: indexTemplate,
        context: {
          webConfig,
          slug,
          maxTocDeep: webConfig.themeConfig.maxTocDeep,
        },
      });
    }
  });

  Object.keys(redirects).map(path => {
    return createRedirect({
      fromPath: path,
      redirectInBrowser: true,
      toPath: redirects[path],
    });
  });
};
