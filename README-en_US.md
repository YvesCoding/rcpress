 <p align="center"><a href="https://www.yvescoding.com/rcpress/"><img width="100" src="https://www.yvescoding.com/rcpress/favicon.png" /></a></p>

<h1 align="center">RcPress</h1>
<p align="center">
A static website generator build with Ant Design and powered by React.js. 🎨
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@rcpress/core"><img src="https://img.shields.io/npm/v/@rcpress/core.svg" alt="Version"></a><a href="https://circleci.com/gh/YvesCoding/rcpress/tree/master"><img src="https://circleci.com/gh/YvesCoding/rcpress/tree/master.png?style=shield" alt="Build Status"></a> 
  <a href="https://www.npmjs.com/package/@rcpress/core"><img src="https://img.shields.io/npm/l/@rcpress/core.svg" alt="License"></a>
<a href="https://www.npmjs.com/package/@rcpress/core"><img src="https://img.shields.io/npm/dm/@rcpress/core.svg" alt="Download"></a>
<a href="https://github.com/YvesCoding/rcpress"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="prettier"></a>
</p>

[![](https://github.com/wangyi7099/pictureCdn/blob/master/allPic/rcpress/screenshot-readme.png?raw=true)](https://www.yvescoding.com/rcpress/)

[Chinese](./README.md) | English

## Introduction

- Rcpress is a static document generator based on react.js.
- The document is made by imitating ant design [official website](https://ant.design/)
- Function configuration is to imitate [vuepress](https://vuepress.vuejs.org/)

## What is the difference between rcpress and vuepress?

|                      |              |                         |
| :------------------: | :----------: | :---------------------: |
|                      | **vuepress** |       **rcpress**       |
|      Framework       |     vue      |          react          |
|          UI          | vue theme ui |       Ant Design        |
|     Custom theme     |      ✅      |           ✅            |
|    service worker    |      ✅      |           ✅            |
|         pwa          |      ✅      |           ✅            |
|  Custom theme color  |      ❌      | ✅(Ant Design build-in) |
|      hot reload      |      ✅      |           ✅            |
|        Plugin        |      ✅      |           ❌            |
|   ssr in dev mode    |      ❌      |           ✅            |
|     build to spa     |      ❌      |           ✅            |
| generate static html |      ✅      |           ✅            |
|   jsx in markdown    |      ✅      |         ✅(mdx)         |

## Features

- It only needs a simple configuration and some markdown knowledge to get started quickly. Users who are familiar with [Vuepress](https://rcpress.vuejs.org/) are more comfortable to use.
- Supports rendering to common Ant Design components using markdown syntax, such as [Alert](https://www.yvescoding.com/rcpress/guide/markdown#prompt-box)
- Support [mdx](https://github.com/mdx-js/mdx), support [custom layout](https://www.yvescoding.com/rcpress/guide/theme#custom-layout) (eg custom website header, bottom, home page, etc.)

## Documentation

For detailed docs, recommend to visit [guide section](https://www.yvescoding.com/rcpress/guide/getting-started) on the website.

## Usage

Install command line tool `@rcpress/cli`

```bash

yarn global add @rcpress/cli

# or if you use npm

npm i  @rcpress/cli -g

```

Create diretory and markdown file

```bash
# create docs diretory(docs is the default documentation directory)
mkdir docs

# create a markdown file
echo '# Hello RcPress' > docs/README.md

```

Run server

```bash
# start spa mode server
rcpress dev
# start ssr mode server
rcpress server

# Visit `3000` port and that's all.
```

Build

```bash
# build spa in production
rcpress build
# build ssr and generate static html files in production
rcpress generate
```

## Homepage Screenshot

<p align="center">
<img src="https://www.yvescoding.com/rcpress/screenshot.png" width="700" />
</p>

## Thanks

- [Ant Design](https://ant.design/)
- [VuePress](https://rcpress.vuejs.org/)
- [GatsbyJs](https://www.gatsbyjs.org/)

## WeChat Communication

There are more than 100 members in the group, add my WeChat, I will invite you to the communication group.

 <img src="https://github.com/wangyi7099/pictureCdn/blob/master/allPic/vuescroll/wx.png?raw=true" width="400" alt="Demo" style="max-width:100%;">

## License

**MIT** By Yves Wang(Wangyi Yi)
