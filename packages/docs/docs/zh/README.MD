---
actionText: 快速上手 →
actionLink: /zh/guide/
showStar: true
home: true
features:
  - title: 门槛底
    details: 只需要简单配置和会一些markdown知识就能快速上手，熟悉<a href="https://antdsite.vuejs.org/">Vuepress</a>的用户使用起来更是得心应手
  - title: 从 markdown 到 antd
    details: 支持用markdown语法渲染成常用的Ant Design组件，如 <a href="guide/markdown#%E6%8F%90%E7%A4%BA%E6%A1%86%EF%BC%88alert%EF%BC%89">Alert</a>
  - title: 功能强大
    details: 支持<a target="_blank" href="https://github.com/mdx-js/mdx">mdx</a>，支持<a href="guide/theme#custom-layout">自定义布局</a>(例如自定义网站头部，底部， 首页等)
---

# 开始上手

## 安装

使用 [yarn](https://yarnpkg.com) 安装`antdsite-cli`

```bash
yarn global add antdsite-cli
```

或者使用[npm](https://docs.npmjs.com/cli/install.html) 安装

```bash
npm install antdsite-cli -g
```

## 用法

使用 `cli` 来初始化一个默认的入门项目

```bash
antdsite my-docs
```

切换到初始化的网站目录，运行网站

```bash
cd my-docs

yarn start
# OR
npm start
```

访问默认的地址 `localhost:8000` 即可看到效果页面

import ImgWidthBase from '@components/ImgWidthBase'

<p align="center">
<ImgWidthBase url="screenshot.png" width={700}/>
</p>
