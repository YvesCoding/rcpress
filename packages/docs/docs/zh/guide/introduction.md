---
home: true
---

import './introduction.less'

# 介绍

AntdSite 是一个基于[Ant Design](https://ant.design)，由[GatsbyJs](https://www.gatsbyjs.org/)驱动的一个网站生成器 (你可以完全不会这两项技术，只需要会 markdown 的基础知识，然后简单配置，就能搭建一个网站。当然，如果你会这两项技术那更好)。文档的配置参考了基于 vue 的文档生成器 - [vuepress](https://vuepress.vuejs.org/config/)。

<div class="pic-plus">
  <img width="150" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
   <span>+</span>
  <img width="160" src="https://gw.alipayobjects.com/zos/rmsportal/tXlLQhLvkEelMstLyHiN.svg" /> 
    <span>+</span> 
  <img width="150" src="https://www.gatsbyjs.org/icons/icon-144x144.png" />
</div>

## 基本特点

- 上手简单，只需要 markdown 和一点 js 知识就能上手。
- 功能强大，可以在 markdown 里写 react 组件，具体可以参考[mdx](https://github.com/mdx-js/mdx)。
- 可以直接使用 [Ant Design 众多组件](https://ant.design/components/button-cn/)，满足日常开发需求。

## 技术栈

- [Ant Design](https://ant.design/docs/react/introduce-cn)
- [Gatsby](https://www.gatsbyjs.org/)
- markdown
- [mdx](https://github.com/mdx-js/mdx)
- [React](https://reactjs.org/)

## 支持环境

- 现代浏览器和 IE11。
- 支持服务端渲染。

### 333333333333333333333333333333333333333333333

## 版本

- antdsite 版本：[![npm package](https://img.shields.io/npm/v/antdsite.svg?style=flat-square)](https://www.npmjs.org/package/antdsite)
- antdsite-cli 版本：[![npm package](https://img.shields.io/npm/v/antdsite-cli.svg?style=flat-square)](https://www.npmjs.org/package/antdsite-cli)

## 安装

#### 使用 [yarn](https://yarnpkg.com) 进行安装`cli`

```bash
yarn global add antdsite-cli
```

#### 或者使用[npm](https://docs.npmjs.com/cli/install.html)进行安装

```bash
npm install antdsite-cli -g
```

#### 使用 `cli` 来初始化一个网站

```bash
antdsite my-docs
```

#### 切换到初始化的网站目录，运行网站

```bash
cd my-docs

yarn start
# OR
npm start
```

#### 访问默认的地址 `localhost:8000` 即可看到效果页面。

<img src="https://github.com/wangyi7099/pictureCdn/blob/master/allPic/antdsite/screenshot.png?raw=true" width="700" />
