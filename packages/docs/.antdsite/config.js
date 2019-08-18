module.exports = {
  base: process.env.base || '/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'AntdSite',
      description: 'A static documentation generator  based on Ant Design and GatsbyJs. 🎨'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'AntdSite',
      description: '一个基于Ant Design 和 GtasbyJs的静态文档生成器'
    }
  },
  logo: '/favicon.png',
  head: [['link', { rel: 'icon', href: `/favicon.png` }]],
  footer:
    'MIT Licensed | Copyright © 2019-present <a target="_blank" href="https://github.com/wangyi7099">Yi(Yves) Wang</a>',
  prefetch: false,
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
            link: '/guide/'
          },
          {
            text: 'Config',
            link: '/config/'
          },
          {
            text: 'Default Theme Config',
            link: '/default-theme-config/'
          },
          {
            text: 'GitHub',
            link: 'https://github.com/YvesCoding/antdsite',
            important: true
          }
        ],
        sidebar: {
          '/guide/': getGuideSidebar(),
          '/config/': 'auto',
          '/default-theme-config/': ['']
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
          },
          {
            text: '配置',
            link: '/zh/config/'
          },
          {
            text: '默认主题配置',
            link: '/zh/default-theme-config/'
          },
          {
            text: 'GitHub',
            link: 'https://github.com/YvesCoding/antdsite',
            important: true
          }
        ],
        sidebar: {
          '/zh/guide/': getGuideSidebar('开始上手'),
          '/zh/config/': [''],
          '/zh/default-theme-config/': ['']
        }
      }
    }
  }
};

function getGuideSidebar(start = 'Get Started') {
  return [
    {
      title: start,
      collapsable: false,
      children: ['', 'getting-started']
    },
    'configuration',
    'theme',
    'usejsx',
    'global-component',
    'i18n',
    'cli'
  ];
}
