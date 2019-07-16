var path = require('path');
var { renderHeadTag, getFinalConfig } = require('./lib/util');

var finalConfig = getFinalConfig();

function getPlugin(pluginName) {
  return path.resolve(__dirname, `./lib/plugins/${pluginName}/index.js`);
}

module.exports = {
  siteMetadata: {
    extraHead: JSON.stringify(finalConfig.head || []),
  },
  plugins: [
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: ['.md', '.mdx', '.MD'],
        gatsbyRemarkPlugins: [
          {
            resolve: getPlugin('gatsby-remark-header-custom-ids'),
          },
          {
            resolve: getPlugin('gatsby-remark-img-warpper-p'),
          },
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-less',
      options: {
        javascriptEnabled: true,
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: finalConfig.themeConfig.docsDir,
        path: path.resolve(finalConfig.themeConfig.docsDir),
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet`,
  ],
};
