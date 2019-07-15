var path = require('path');
var finalConfig = require('./lib/util').getFinalConfig();

function getPlugin(pluginName) {
  return path.resolve(__dirname, `./lib/plugins/${pluginName}/index.js`);
}

module.exports = {
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
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Magic Scroll',
        short_name: 'Magic Scroll Doc',
        display: 'standalone',
        start_url: './?utm_source=homescreen',
        theme_color: '#002140',
        background_color: '#001529',
        icon: `${__dirname}/src/images/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
