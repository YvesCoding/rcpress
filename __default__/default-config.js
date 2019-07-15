const path = require('path');

module.exports = {
  base: '/',
  title: path.relative('../', process.cwd()),
  themeConfig: {
    repo: null,
    docsRepo: null,
    docsDir: 'docs',
    docsBranch: 'master',
    editLinkText: null,
    lastUpdated: false, // string | boolean
    locales: null,
    showAvatarList: true,
  },
};
