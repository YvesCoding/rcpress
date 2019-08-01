var path = require('path');
var { getFinalConfig } = require('./lib/util');

var finalConfig = getFinalConfig();

function getPlugin(pluginName) {
  return path.resolve(__dirname, `./lib/plugins/${pluginName}/index.js`);
}

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-mdx-fix',
      options: {
        extensions: ['.md', '.mdx', '.MD'],
        gatsbyRemarkPlugins: [
          {
            resolve: getPlugin('gatsby-remark-header-custom-ids'),
          },
          {
            resolve: getPlugin('gatsby-remark-img-warpper-p'),
          },
          {
            resolve: getPlugin('remark-default-class-name'),
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
    `gatsby-plugin-catch-links`,
  ],
};
