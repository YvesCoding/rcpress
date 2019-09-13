const path = require('path');

module.exports = {
  base: '/',
  title: path.relative('../', process.cwd()),
  description: '',
  lang: 'en-US',
  head: [],
  footer: null,
  useCNDForLargeFiles: true,
  largeFileList: [
    {
      name: 'moment',
      umdName: 'moment',
      cdnLink:
        'https://gw.alipayobjects.com/os/lib/moment/2.24.0/min/moment.min.js'
    },
    {
      order: 2,
      name: 'react-dom',
      umdName: 'ReactDOM',
      cdnLink:
        'https://gw.alipayobjects.com/os/lib/react-dom/16.8.1/umd/react-dom.production.min.js'
    },
    {
      order: 1,
      name: 'react',
      umdName: 'React',
      cdnLink:
        'https://gw.alipayobjects.com/os/lib/react/16.8.1/umd/react.production.min.js'
    }
  ],
  theme: 'rcpress-default-theme',
  themeConfig: {
    themeColors: null,
    repo: null,
    docsRepo: null,
    docsDir: 'docs',
    docsRelativeDir: '',
    docsBranch: 'master',
    showBackToTop: true
  }
};
