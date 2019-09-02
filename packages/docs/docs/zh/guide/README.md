import './introduction.less'

# 介绍

- Antdsite 是一个基于 React.js 的静态文档生成器。
- 它是由[Gatsby Js](https://www.gatsbyjs.org/)驱动的
- 使用 [Ant Design](https://ant.design/)设计构建， 并且它的配置项借鉴了[Vuepress](https://antdsite.vuejs.org/)

import ImgWidthBase from '@components/ImgWidthBase'

<div class="pic-plus">
  <ImgWidthBase url="antd-icon.svg" width={120} />
   <span>+</span>
  <ImgWidthBase url="react-icon.svg" width={120}/>
    <span>+</span> 
  <ImgWidthBase url="gatsby-icon-144x144.png" width={120}/>
   <span>=</span> 
  <ImgWidthBase url="favicon.png" width={120}/>
</div>

## 特点

- 只需要简单配置和会一些 markdown 知识就能快速上手，熟悉[Vuepress](https://antdsite.vuejs.org/)的用户使用起来更是得心应手
- 支持用 markdown 语法渲染成常用的 Ant Design 组件，如[Alert](https://www.yvescoding.com/antdsite/zh/guide/markdown#%E6%8F%90%E7%A4%BA%E6%A1%86%EF%BC%88alert%EF%BC%89)
- 支支持[mdx](https://github.com/mdx-js/mdx) ,支持[自定义布局](https://www.yvescoding.com/antdsite/zh/guide/theme#custom-layout)(例如自定义网站头部，底部， 首页等)

## 技术栈

- [Ant Design](https://ant.design/docs/react/introduce-cn)
- [Gatsby](https://www.gatsbyjs.org/)
- markdown
- [mdx](https://github.com/mdx-js/mdx)
- [React](https://reactjs.org/)

## 支持环境

- 现代浏览器和 IE11。
- 支持服务端渲染。

## 版本

- antdsite 版本：[![npm package](https://img.shields.io/npm/v/antdsite.svg?style=flat-square)](https://www.npmjs.org/package/antdsite)
- antdsite-cli 版本：[![npm package](https://img.shields.io/npm/v/antdsite-cli.svg?style=flat-square)](https://www.npmjs.org/package/antdsite-cli)
