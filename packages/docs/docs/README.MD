---
actionText: Get Started →
actionLink: /guide/
showStar: true
home: true
features:
  - title: Easy to get started
    details: It only requires simple configuration and some markdown syntax to get started quickly
  - title: Rich UI components
    details: Document design comes from <a target="_blank" href="https://ant.design/">Ant Design</a> website, which not only has a beautiful interface, but also can directly use all Ant Design components.
  - title: Powerful
    details: Thanks to <a target="_blank" href= "https://github.com/mdx-js/mdx">mdx</a>, we can use JSX in markdown.
---

# Get Started

## Install via cli

#### Install `antdsite-cli` via [yarn](https://yarnpkg.com)

```bash
yarn global add antdsite-cli
```

#### Or install via [npm](https://docs.npmjs.com/cli/install.html)

```bash
npm install antdsite-cli -g

```

#### Use `cli` to initialize a website

```bash
antdsite my-docs
```

#### Switch to the initialized site directory and run the Site

```bash
cd my-docs

yarn start
# OR
npm start
```

#### Visit the default address `localhost:8000` to see the effect page

import ImgWidthBase from '@components/ImgWidthBase'

<p align="center">
<ImgWidthBase url="screenshot.png" width={700}/>
</p>
