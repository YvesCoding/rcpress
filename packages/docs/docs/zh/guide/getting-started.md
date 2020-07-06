# 快速上手

## 安装

使用 [yarn](https://yarnpkg.com) 安装`rcpress-cli`

```bash
yarn global add @rcpress/cli
```

或者使用[npm](https://docs.npmjs.com/cli/install.html) 安装

```bash
npm install @rcpress/cli -g
```

## 用法

创建目录以及文件

```bash
# 创建 docs 目录(docs是默认的文档目录)
mkdir docs

#创建markdown文件
echo '# Hello RcPress' > docs/README.md

```

运行

```bash

# 启动spa模式的服务
rcpress dev
# 启动服务端渲染的服务
rcpress serve

# 访问默认的地址 `localhost:3000` 即可看到效果页面
```

打包构建

```bash
# 在生产环境下构建spa
rcpress build
# 在生产环境下构建ssr并且生成静态html文件
rcpress generate
```

## 项目结构

RcPress 与 Vuepress 遵循相同的原则，即 **约定大于配置**，推荐的文档结构如下：

```bash{numberLines:true}
├── docs # 存放文档目录
    ├── .rcpress
        ├── globalComponent.js # 用于存储全局组件，您可以在markdown中直接使用它们。
        ├── config.js # rcpress 配置文件
        ├── style.less # rcpress 全局样式
        ├── public # 用于存储网站的一些静态文件，这些文件可以直接访问：例如：www.xxx.com/favicon.png
        ├── theme
            ├── Layout.(t|j)sx? # 覆盖默认主题。
    ├── guide
        ├── README.MD
    ├── README.MD
├── package.json
```

下面来简单解释一下初始化项目的配置文件：

```js
module.exports = {
  title: 'my-docs', // 网站标题， 可以不用设置，默认为文档所在的目录名称
  // 网站描述，用于生成seo搜索和首页的描述。
  description: 'My first rcpress app',
  // 一般展示在首页和左上角
  logo: '/favicon.png',
  // 网站首页底部的文字，支持html格式
  footer: 'MIT Licensed | Copyright © 2019-present Yi(Yves) Wang',
  // 生成网站时会向网站头部插入的一些元素，
  // 其中每个元素格式为[tagName, {/*元素属性，会原封不动附加到生成的元素上。*/},/*子节点*/]
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  themeConfig: {
    // 网站头部链接，可以设置为important，会有红色标记显示。
    nav: [
      {
        text: 'Guide',
        link: '/guide'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/YvesCoding/rcpress',
        important: true
      }
    ],
    sidebar: {
      // 注意 重点。
      // 设置的属性名必须是 你的文档目录(默认为docs)下存在的文件/目录
      // rcpress查找文件的物理路径为: docs(你设置的文档目录) + sidebar里的键名
      // 例如下面的 /guide/ 对应的物理路径是 docs/guide/
      '/guide/': [
        // 对应物理路径： docs/guide/introduction.md
        // 由于里面frontMatter设置home为true的话访问路径不带introduction，直接/guide/
        'introduction',
        {
          title: 'page-collapsed',
          children: ['page-collapsed']
        },
        {
          title: 'page-group-exapmle',
          // 二级菜单默认是收起的，设置false为默认展开。
          collapsable: false,
          children: [
            // 可以设置更深一层的菜单，一共最多支持两层。
            // 运行初始化项目之后看到效果
            {
              // 设置三级菜单标题
              title: 'group-1',
              // 对应的物理路径： docs/guide/group-1-item.md
              children: ['group-1-item']
            },
            {
              title: 'group-2',
              // 对应的物理路径： docs/guide/group-2-item.md
              children: ['group-2-item']
            }
          ]
        }
      ]
    }
  }
};
```

相关资料：

- 详细的配置文件说明请参考：[配置一节](../config)

- 如果你想自定义头部，足部，或者首页等等，请参考[自定义主题](theme)
