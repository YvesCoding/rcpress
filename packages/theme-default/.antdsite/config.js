module.exports = {
  themeConfig: {
    editLinks: true,
    editLinkText: 'Edit this page',
    lastUpdated: 'Last Updated', // string | boolean
    locales: null,
    showAvatarList: true,
    showBackToTop: true,
    maxTocDeep: 3,
    search: true,
    searchMaxSuggestions: 10
  },
  markdown: {
    alert: {
      info: [
        {
          alias: 'tip',
          defaultTitle: 'Tip'
        },
        {
          alias: 'tip-zh',
          defaultTitle: '提示'
        }
      ],
      warning: [
        {
          alias: 'warning',
          defaultTitle: 'Warning'
        },
        {
          alias: 'warning-zh',
          defaultTitle: '警告'
        }
      ],
      error: [
        {
          alias: 'error',
          defaultTitle: 'Caveat'
        },
        {
          alias: 'error-zh',
          defaultTitle: '严重警告'
        }
      ]
    }
  }
};
