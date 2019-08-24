const path = require('path');
const { getFinalConfig } = require('./lib/config');
const finalConfig = getFinalConfig();

function getPlugin(pluginName) {
  return path.resolve(__dirname, `./lib/plugins/${pluginName}/index.js`);
}

module.exports = {
  pathPrefix: finalConfig.base,
  plugins: [
    {
      resolve: 'gatsby-mdx-fix',
      options: {
        extensions: ['.md', '.mdx', '.MD'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-external-links',
          {
            resolve: getPlugin('gatsby-remark-header-custom-ids')
          },
          {
            resolve: getPlugin('gatsby-remark-img-warpper-p')
          },
          {
            resolve: getPlugin('remark-default-class-name')
          },
          'gatsby-remark-prismjs',
          {
            resolve: getPlugin('gatsby-remark-custom-blocks'),
            pluginOptions: finalConfig.markdown.alert
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-less',
      options: {
        javascriptEnabled: true
      }
    },
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: finalConfig.themeConfig.docsDir,
        path: path.resolve(finalConfig.themeConfig.docsDir)
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`
  ]
};
