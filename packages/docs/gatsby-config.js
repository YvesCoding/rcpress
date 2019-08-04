// gatsby-config.js
module.exports = {
  __experimentalThemes: ['antdsite'],
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `AntdSite`,
        short_name: `AntdSite`,
        start_url: `/`,
        theme_color: '#002140',
        background_color: '#001529',
        display: `standalone`,
        icon: `static/favicon.png`
      }
    },
    'gatsby-plugin-offline'
  ]
};
