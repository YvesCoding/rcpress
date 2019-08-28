module.exports = {
  title: 'my-docs',
  description: 'My first antdsite app',
  logo: '/favicon.png',
  footer:'MIT Licensed | Copyright © 2019-present Yi(Yves) Wang',
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  themeConfig: {
    nav: [
      {
        text: 'Guide',
        link: '/guide'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/YvesCoding/antdsite',
        important: true
      }
    ],
    sidebar: {
      '/guide/': [
        'introduction',
        {
          title: 'page-collapsed',
          children: ['page-collapsed']
        },
        {
          title: 'page-group-exapmle',
          collapsable: false,
          children: [
            {
              title: 'group-1',
              children: ['group-1-item']
            },
            {
              title: 'group-2',
              children: ['group-2-item']
            }
          ]
        }
      ]
    }
  }
};
