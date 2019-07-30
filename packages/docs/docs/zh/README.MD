---
actionText: 快速上手 →
actionLink: /zh/guide/
showStar: true
home: true
features:
  - title: 门槛底
    details: 文档的配置设计参考了<a target="_blank" href="https://vuepress.vuejs.org/default-theme-config/">vuepress</a>，只需要简单配置，会一些markdown语法就能快速上手
  - title: Ant Design 网站风格
    details: 文档的设计风格基于<a target="_blank" href="https://ant.design/docs/react/introduce-cn">Ant Design</a>网站，界面美观。
  - title: 功能强大
    details: 得益于<a target="_blank" href="https://github.com/mdx-js/mdx">mdx</a>，我们可以在markdown里使用react组件。

footer: MIT Licensed | Copyright © 2018-present Yi(Yves) Wang
---

## 开始上手

### 通过 `antdsite-cli` 创建项目

#### 使用 [yarn](https://yarnpkg.com) 进行安装

```bash
yarn global add antdsite-cli
```

#### 或者使用[npm](https://docs.npmjs.com/cli/install.html)进行安装

```bash
npm install antdsite-cli -g
```

### 使用`cli`来初始化一个网站

```bash
antdsite my-docs
```

### 切换到初始化的网站目录，运行网站

```bash
cd my-docs

yarn start
# OR
npm start
```

### 访问默认的地址 `localhost:8000` 即可看到效果页面。
