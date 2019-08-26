---
actionText: Get Started →
actionLink: /guide/
showStar: true
home: true
features:
  - title: Easy to get started
    details: It only requires simple configuration and some markdown syntax to get started quickly, users who are familiar with <a href="https://vuepress.vuejs.org/">Vuepress </a> are more comfortable to use
  - title: From markdown to antd
    details: Supports rendering to common Ant design components using the markdown syntax, such as <a href="guide/markdown#prompt-box">Alert</a>
  - title: Powerful
    details: Support <a target="_blank" href="https://github.com/mdx-js/mdx">mdx</a> to support <a href="guide/theme#custom-layout">custom layout</a> (eg custom site header, bottom, homepage, etc.)
---

# Get Started

## Install

Install `antdsite-cli` via [yarn](https://yarnpkg.com)

```bash
yarn global add antdsite-cli
```

Or install via [npm](https://docs.npmjs.com/cli/install.html)

```bash
npm install antdsite-cli -g

```

## Usage

Use `cli` to initialize a website

```bash
antdsite my-docs
```

Switch to the initialized site directory and run the Site

```bash
cd my-docs

yarn start
# OR
npm start
```

Visit the default address `localhost:8000` to see the effect page

import ImgWidthBase from '@components/ImgWidthBase'

<p align="center">
<ImgWidthBase url="screenshot.png" width={700}/>
</p>
