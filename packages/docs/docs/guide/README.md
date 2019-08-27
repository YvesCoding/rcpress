import './introduction.less'

# Introduction

- AntdSite is a static website generator based on React.js.
- It's driven by [Gatsby Js](https://www.gatsbyjs.org/)
- It is built with [Ant Design](https://ant.design/) and its configuration style borrows from [Vuepress](https://vuepress.vuejs.org/).

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

## Features

- It only needs a simple configuration and some markdown knowledge to get started quickly. Users who are familiar with [Vuepress](https://vuepress.vuejs.org/) are more comfortable to use.
- Supports rendering to common Ant Design components using markdown syntax, such as [Alert](https://www.yvescoding.com/antdsite/guide/markdown#prompt-box)
- Support [mdx](https://github.com/mdx-js/mdx), support [custom layout](https://www.yvescoding.com/antdsite/guide/theme#custom-layout) (eg custom website header, bottom, home page, etc.)

## Technology Stack

- [Ant Design](https://ant.design/docs/react/introduce)
- [Gatsby](https://www.gatsbyjs.org/)
- markdown
- [mdx](https://github.com/mdx-js/mdx)
- [React](https://reactjs.org/)

## Support environment

- Modern browsers and IE11.
- Support server rendering.

## Version

- antdsite version: [![npm package](https://img.shields.io/npm/v/antdsite.svg?style=flat-square)](https://www.npmjs.org/package/antdsite)
- antdsite-cli version: [![npm package](https://img.shields.io/npm/v/antdsite-cli.svg?style=flat-square)](https://www.npmjs.org/package/antdsite-cli)
