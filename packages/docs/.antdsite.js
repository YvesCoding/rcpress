module.exports = {
  base: '/',
  locales: {
    '/': {
      title: 'AntdSite',
      description: 'A static docs generator based on Ant Design and GatsbyJs'
    },
    '/zh/': {
      title: 'AntdSite',
      description: '一个基于Ant Design 和 GatsbyJs 的静态文档生成工具'
    }
  },
  logo: '/favicon.png',
  head: [['link', { rel: 'icon', href: `/favicon.png` }]],
  themeConfig: {
    repo: 'YvesCoding/antdsite',
    docsRelativeDir: 'packages/docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last updated on', // string | false
        nav: [
          {
            text: 'Guide',
            link: '/guide/',
            important: true
          },
          {
            text: '外部',
            items: [
              {
                text: 'Group1',
                important: true,
                link: '/guide1/'
              },
              {
                text: 'Group2'
              }
            ]
          },
          {
            text: 'Guide1',
            link: '/guide1/'
          },
          {
            text: 'GitHub',
            link: 'https://github.com/YvesCoding/antdsite',
            important: true
          }
        ],
        sidebar: {
          '/guide/': genSidebarConfig('Guide'),
          '/guide1/': genSidebarConfig('Guide1')
        }
      },
      '/zh': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新于', // string | false
        nav: [
          {
            text: '指南',
            link: '/zh/guide/'
          }
        ],
        sidebar: {
          '/zh/guide/': genSidebarConfig('指南')
        }
      }
    }
  }
};
function genSidebarConfig(title) {
  return [
    'aaa',
    { title, collapsable: false, children: ['', 'getting-started'] },
    {
      title: 'title1',
      collapsable: false,
      children: ['README-copy', 'getting-started-copy']
    }
  ];
}
