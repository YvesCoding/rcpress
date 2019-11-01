---
actionText: Get Started →
actionLink: /guide/
showStar: true
home: true
features:
  - title: Easy to get started
    details: It only requires simple configuration and some markdown knowledge to get started quickly, users who are familiar with <a href="https://rcpress.vuejs.org/">Vuepress </a> are more comfortable to use
  - title: From markdown to antd
    details: Supports rendering to common Ant design components using the markdown syntax, such as <a href="guide/markdown#prompt-box">Alert</a>
  - title: Powerful
    details: Support <a target="_blank" href="https://github.com/mdx-js/mdx">mdx</a> to support <a href="guide/theme#custom-layout">custom layout</a> (eg custom site header, bottom, homepage, etc.)
---

# Get Started

## Install

Install `@rcpress/cli` via [yarn](https://yarnpkg.com)

```bash
yarn global add @rcpress/cli
```

Or install via [npm](https://docs.npmjs.com/cli/install.html)

```bash
npm install @rcpress/cli -g
```

## Usage

Create diretory and markdown file

```bash
# create docs diretory(docs is the default documentation directory).
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

# Visit the default address `localhost:3000` to see the effect page
```

Build

```bash
# build spa in production
rcpress build
# build ssr and generate static html files in production
rcpress generate
```
