var path = require('path');
var finalConfig = require('./lib/util').getFinalConfig();

function getPlugin(pluginName) {
  return path.resolve(__dirname, `./lib/plugins/${pluginName}/index.js`);
}

module.exports = {
  siteMetadata: {
    title: 'Magic Scroll',
    description: '极速开发框架 - 前端',
    author: 'wangyi',
    siteUrl: `https://gitee.com/stylefeng/one-front`,
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
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: true,
            },
          },
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
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Magic Scroll',
        short_name: 'Magic Scroll Doc',
        display: 'standalone',
        start_url: './?utm_source=homescreen',
        theme_color: '#002140',
        background_color: '#001529',
        icon: `${__dirname}/theme/images/favicon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
  ],
};
