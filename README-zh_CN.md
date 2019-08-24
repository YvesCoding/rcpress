## 前言

## 简介

- Antdsite 是一个基于 React.js 的静态网站生成器。
- 它是由[Gatsby Js](https://www.gatsbyjs.org/)驱动的
- 使用 [Ant Design](https://ant.design/)设计构建， 并且它的配置项借鉴了[Vuepress](https://vuepress.vuejs.org/)

### 由来

以前我是[vuepress](VuePress)的用户，在开发 vue 组件中使用它来写文档感觉非常顺手。 后来我开始研究上了 react，开发 react 组件就得有文档呀，我在这期间陆续试了几个基于 react 的文档生成器，像[docz](https://github.com/pedronauck/docz), [docusaurus](https://github.com/facebook/docusaurus) . 但是试用了下，感觉都不如 vuepree 顺手。后来，我访问[Ant Design](https://ant.design/index-cn)官网的时候突然冒出来一个想法： 把`Ant Design`官网做成可配置可以吗？ 答案是可以的。于是，[antdsite](https://www.yvescoding.com/antdsite/)就诞生了。

总的来说就是：

- 文档的配置模仿了 vuepress 的配置。
- 文档的界面设计来源于 Ant Design 的官网。
- 说白了就是 Ant Design 官网，我给它改成可配置的了，并且让它功能更强大！

## 特点

- [Vuepree](https://vuepress.vuejs.org/) 配置风格，使用起来功能强大，简单方便。
- 支持[mdx](https://github.com/mdx-js/mdx).
- 内置了 [Ant Design](https://ant.design).
- 支持[custom layout](https://www.yvescoding.com/antdsite/zh/guide/theme#custom-layout)(例如自定义网站头部，底部， 首页等等).

## 快速开始

### 安装

使用 cli 快速初始化一个项目

```bash

yarn global add antdsite-cli

# 或者如果你使用 npm

npm i antdsite-cli -g
```

### 用法

使用命令行工具`antdsite-cli`初始化项目

```bash
antdsite my-docs
```

然后访问本地`8000`端口就可以啦,具体可以参考官网的[快速上手](https://www.yvescoding.com/antdsite/zh/guide/getting-started).

### 截图

![](/img/remote/1460000020055048?w=1445&h=414)

## 在 markdown 里面使用 Ant Design

两种方法使用 Ant Design

### 直接在 markdown 中导入 antd 组件

```js
import { Button } from 'antd';

<Button />;
```

参考链接和 demo：[使用 antd](https://www.yvescoding.com/antdsite/zh/guide/usejsx#%E4%BD%BF%E7%94%A8antd)

### 设置 antd 为全局组件

可以在 globalComponent.js 中设置全局组件，这样可以不用在 markdown 中频繁导入 antd 就能直接使用它的 UI 组件了。

```js
// .antdsite/globalComponent.js
import { Button } from 'antd';

export default {
  Button
};
```

直接在 markdown 中使用`Button`

```js
<Button />
```

参考链接和 demo：[全局组件](https://www.yvescoding.com/antdsite/zh/guide/global-component)

## 关于 gatsby

antdsite 涉及 gatsby 还是很少的，具体只包括：

- 打包命令，运行命令：`gatsby build` `gatsby develop`
- 在 gatsby-config 里设置主题为`antdsite`

```js
// gatsby-config.js
module.exports = {
  __experimentalThemes: ['antdsite']
};
```

- 在设置了[base](https://www.yvescoding.com/antdsite/zh/config/#base)的情况下，打包命令加上`--prefix-paths`参数 `gatsby build --prefix-paths`

## 常见问题

> 这个和 vuepress 配置完全一样的吗？

大部分是模仿的 vuepress 的配置的，但也有一些不同。比如配置中没有自定义端口，地址,PWA 等。 那些需要配置[Gatsby](https://www.gatsbyjs.org/docs/static-folder/)的，交给 AntdSite 反而更加繁琐。

> 我不会 react 可以使用吗？

完全可以。上手的要是是仅仅是 markdown 基础知识和一点 js 知识。

> 可以将自定义主题做成插件形式发布到 npm 上吗？

这个暂时不可以，不过未来可以考虑加入这个功能。

如果还有问题可以留言一起讨论～

## 写在最后

希望大家能踊跃尝试，有好的意见和建议可以反馈给我

- [github 地址](https://github.com/YvesCoding/antdsite)
- [官网](https://www.yvescoding.com/antdsite/)
