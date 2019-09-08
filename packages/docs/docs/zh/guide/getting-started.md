# 快速上手

## 安装 cli

使用 [yarn](https://yarnpkg.com) 安装`rcpress-cli`

```bash
yarn global add rcpress-cli
```

或者使用[npm](https://docs.npmjs.com/cli/install.html) 安装

```bash
npm install rcpress-cli -g
```

## 使用 cli 创建一个初始的项目

使用 `cli` 来初始化一个默认的初始项目

```bash
rcpress my-docs
```

在已有的项目里初始化

```bash
rcpress ./ --force
```

初始化完毕后，切换到初始化后的目录，运行网站

```bash
yarn start
# OR
npm start
```

访问默认的地址 `localhost:8000` 即可看到效果页面

## 项目结构

初始化之后你会看到如下目录：

```bash{numberLines:true}
├── .rcpress
    ├── config.js # rcpress 配置文件
├── docs # 存放文档目录
    ├── guide
        ├── introduction.md
        ├── page-collapsed.md
        ├── group-1-item.md
        ├── group-2-item.md
    ├── README.MD
├── src # 主要是用于存放404页面，放到src/pages下是因为只有这个目录能被gatsby识别
    ├── pages
        ├── 404.js
        ├── 404.css
├── static # 用于存放网站的一些静态文件，能直接被访问：如： www.xxx.com/favicon.png
    ├── favicon.png # 用于存放网站logo
├── package.json # 主要包含了devDependencies依赖项：antdsite和gatsby
├── gatsby-config.js # gatsby配置文件，已配置好，无需更改。
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
      // antdsite查找文件的物理路径为: docs(你设置的文档目录) + sidebar里的键名
      // 例如下面的 /guide/ 对应的物理路径是 docs/guide/
      '/guide/': [
        // 对应物理路径： docs/guide/introduction.md
        // 由于里面frontmatter设置home为true的话访问路径不带introduction，直接/guide/
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

## 效果图

import ImgWidthBase from '@components/ImgWidthBase'

<p align="center">
<ImgWidthBase url="screenshot.png" width={700}/>  
</p>

<p align="center">
<ImgWidthBase url="screenshot-1.png" width={700}/>
</p>

<p align="center">
<ImgWidthBase url="screenshot-mobile.png" width={330}  />

<ImgWidthBase url="screenshot-mobile-1.png" width={330}/>

</p>

<p align="center">
</p>

<p align="center">
<ImgWidthBase url="screenshot-mobile-2.png" width={300}/>

<ImgWidthBase url="screenshot-mobile-3.png" width={300}/>

</p>
