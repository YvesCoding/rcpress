const path = require('path');
const WebpackThemePlugin = require('./WebpackThemePlugin');
module.exports = (options, ctx) => ({
  name: '@rcpress/theme-default',

  chainWebpack(config, isServe) {
    if (!isServe) {
      config.plugin('injections').use(WebpackThemePlugin);
    }
  },

  // @internal/routes
  enhanceAppFiles() {
    const {
      options: {
        siteConfig: {
          themeConfig: { darkTheme }
        }
      }
    } = ctx;
    return {
      name: 'app.less',
      content: darkTheme ? `` : 'import "antd/dist/antd.less"'
    };
  }
});
