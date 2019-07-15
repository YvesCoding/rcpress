module.exports = {
  base: '/',
  locales: {
    '/': {
      title: 'AntSite',
      description: 'AntSite -A docs generator based on gatsby and website of Ant Design',
    },
    '/zh/': {
      title: 'AntSite',
      description: 'AntSite - 基于Ant Design 网站 和 gatsby 的文档生成工具',
    },
  },
  themeConfig: {
    repo: 'YvesCoding/gatsby-theme-antdsite',
    docsRepo: 'YvesCoding/gatsby-theme-antdsite',
    docsDir: 'docs',
    docsBranch: 'master',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last updated on', // string | boolean
        nav: [
          {
            text: 'Guide',
            link: '/guide/',
          },
        ],
        sidebar: {
          '/guide/': genSidebarConfig('Guide'),
        },
      },
      '/zh': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新于', // string | boolean
        nav: [
          {
            text: '指南',
            link: '/zh/guide/',
          },
        ],
        sidebar: {
          '/zh/guide/': genSidebarConfig('指南'),
        },
      },
    },
  },
};
function genSidebarConfig(title) {
  return [
    { title, collapsable: false, children: ['', 'getting-started'] },
    { title: 'title1', collapsable: false, children: ['README-copy', 'getting-started-copy'] },
  ];
}
