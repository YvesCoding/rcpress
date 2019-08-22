---
actionText: 快速上手 →
actionLink: /zh/guide/
showStar: true
home: true
features:
  - title: 门槛底
    details: 只需要简单配置和会一些markdown语法就能快速上手
  - title: UI组件丰富
    details: 文档的设计来源于<a target="_blank" href="https://ant.design/docs/react/introduce-cn">Ant Design</a>网站，不仅界面美观，还能直接使用所有的Ant Design 组件。
  - title: 功能强大
    details: 得益于<a target="_blank" href="https://github.com/mdx-js/mdx">mdx</a>，我们可以在markdown里使用JSX。
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

使用 `cli` 来初始化一个网站

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
