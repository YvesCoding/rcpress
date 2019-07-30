const path = require('path');

module.exports = {
  base: '/',
  title: path.relative('../', process.cwd()),
  head: [],
  themeConfig: {
    repo: null,
    docsRepo: null,
    docsDir: 'docs',
    docsRelativeDir: '',
    docsBranch: 'master',
    editLinkText: null,
    lastUpdated: false, // string | boolean
    locales: null,
    showAvatarList: true,
    showBackToTop: true,
    maxTocDeep: 3,
    search: true,
    searchMaxSuggestions: 10,
  },
};
