const WebpackThemePlugin = require('./WebpackThemePlugin');
module.exports = (options, ctx) => ({
  name: '@rcpress/theme-default'

  // injectTemplate() {
  //   return {
  //     head: `
  //     <link rel="stylesheet" href="/change-theme.less">
  //     <script>
  //     window.less = {
  //       javascriptEnabled: true,
  //       async: false,
  //       env: 'production'
  //     };
  //  </script>  `
  //   };
  // },

  // chainWebpack(config, isServe) {
  //   if (!isServe) {
  //     config.plugin('rcpress-themes').use(WebpackThemePlugin);
  //   }
  // },

  // // @internal/routes
  // enhanceAppFiles() {
  //   const {
  //     options: {
  //       siteConfig: {
  //         themeConfig: { darkTheme }
  //       }
  //     }
  //   } = ctx;
  //   return {
  //     name: 'app.less',
  //     content: darkTheme ? `` : 'import "antd/dist/antd.less"'
  //   };
  // }
});
