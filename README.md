  <p align="center"><a href="https://www.yvescoding.com/rcpress/"><img width="100" src="https://www.yvescoding.com/rcpress/favicon.png" /></a></p>

<h1 align="center">RcPress</h1>
<p align="center">
一款使用Ant Design构建，由React.js驱动的静态网站生成器.  🎨
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@rcpress/core"><img src="https://img.shields.io/npm/v/@rcpress/core.svg" alt="Version"></a><a href="https://circleci.com/gh/YvesCoding/rcpress/tree/master"><img src="https://circleci.com/gh/YvesCoding/rcpress/tree/master.png?style=shield" alt="Build Status"></a> 
  <a href="https://www.npmjs.com/package/@rcpress/core"><img src="https://img.shields.io/npm/l/@rcpress/core.svg" alt="License"></a>
<a href="https://www.npmjs.com/package/@rcpress/core"><img src="https://img.shields.io/npm/dm/@rcpress/core.svg" alt="Download"></a>
<a href="https://github.com/YvesCoding/rcpress"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="prettier"></a>
</p>

[![](https://github.com/wangyi7099/pictureCdn/blob/master/allPic/rcpress/screenshot-readme.png?raw=true)](https://www.yvescoding.com/rcpress/)

简体中文 | [English](./README-en_US.md)

## 简介

- RcPress 是一个基于 React.js 的静态文档生成器。
- 界面是模仿 ant-design [官网](https://ant.design/)做的
- 配置，代码模仿自[Vuepress](https://vuepress.vuejs.org/)
- 开发它的目的是我以前是 vuepress 老用户，然后用上 react 后想在 react 里使用它。

## 快速上手

### 安装

安装命令行工具 `@rcpress/cli`

```bash

yarn global add @rcpress/cli

# 或者如果你用npm

npm i  @rcpress/cli -g
```

### 用法

创建目录以及文件

```bash
# 创建 docs 目录(docs是默认的文档目录)
mkdir docs

#创建markdown文件
echo '# Hello RcPress' > docs/README.md
```

可以运行如下命令

```bash
# 启动spa模式的服务
rcpress dev # 推荐
# 启动服务端渲染的服务
rcpress server

# 访问`3000`端口即可。
```

打包构建

```bash
# 在生产环境下构建spa
rcpress build
# 在生产环境下构建ssr并且声称静态html文件
rcpress generate
```

## 文档

可以参考官网上的[向导一节](https://www.yvescoding.com/rcpress/guide/getting-started)

## 与 vuepress 的对比

基本实现了 vuepress 的基础功能

|                     |              |                         |
| :-----------------: | :----------: | :---------------------: |
|                     | **vuepress** |       **rcpress**       |
|      驱动框架       |     vue      |          react          |
|         UI          | vue 主题 ui  |       Ant Design        |
|     自定义主题      |      ✅      |           ✅            |
|   service worker    |      ✅      |           ✅            |
|         pwa         |      ✅      |           ✅            |
|    定制主题颜色     |      ❌      | ✅(Ant Design 内置功能) |
| 开发模式 hot reload |      ✅      |           ✅            |
|      插件机制       |      ✅      |           ❌            |
| 开发模式下运行 ssr  |      ❌      |           ✅            |
|    打包成单页面     |      ❌      |           ✅            |
|   打包成静态 html   |      ✅      |           ✅            |
|  markdown 中写代码  |      ✅      |         ✅(mdx)         |

## 首页截图

<p align="center">
<img src="https://www.yvescoding.com/rcpress/screenshot.png" width="700" />
</p>

## 感谢

- [Ant Design](https://ant.design/)
- [VuePress](https://rcpress.vuejs.org/)
- [GatsbyJs](https://www.gatsbyjs.org/)

## 微信交流

群里成员已经超过 100 人了，添加我的微信我将邀请你到交流群讨论。

 <img src="https://github.com/wangyi7099/pictureCdn/blob/master/allPic/vuescroll/wx.png?raw=true" width="400" alt="Demo" style="max-width:100%;">

## 许可证

**MIT** By Yves Wang(Wangyi Yi)
