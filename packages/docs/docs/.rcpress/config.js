const path = require('path');
module.exports = {
  base: process.env.base || '',
  title: 'rcpress',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'RcPress',
      description:
        'A static website generator whose UI is built with Ant Design and it is driven by React.js'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'RcPress',
      description: '一个静态网站生成器，其UI是使用Ant Design构建的，并由React.js驱动'
    }
  },
  logo: '/favicon.png',
  head: [
    ['link', { rel: 'icon', href: `/favicon.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }]
  ],
  serviceWorker: true,
  footer:
    'MIT Licensed | Copyright © 2019-present <a target="_blank" href="https://github.com/wangyi7099">Yi(Yves) Wang</a>',
  themeConfig: {
    repo: 'YvesCoding/rcpress',
    docsDir: 'packages/docs/docs',
    darkTheme: false,
    showAvatarList: process.env.NODE_ENV === 'production',
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
            link: 'https://github.com/YvesCoding/rcpress',
            important: true
          }
        ],
        sidebar: {
          '/guide/': getGuideSidebar(),
          '/config/': [''],
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
            link: 'https://github.com/YvesCoding/rcpress',
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
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './components')
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
    'markdown',
    'global-component',
    'i18n',
    'cli'
  ];
}
