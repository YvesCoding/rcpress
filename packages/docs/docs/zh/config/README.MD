# 配置参考

> 文本大部分复制于[antdsite](https://antdsite.vuejs.org/zh/config/)，略作修改

::: tip-zh
不必担心默认的设置会被覆盖掉，antdsite 会使用[deepMerge 函数](https://github.com/YvesCoding/antdsite/blob/e85108dbac8fdd09d0d1673bb4d4b37b64e4cfbc/packages/antdsite/lib/util.js#L5)将新设置的配置和默认配置进行**深度合并**
:::

## 基本配置

### base

- 类型: `string`
- 默认值: `/`

部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。如 Github pages，如果你想将你的网站部署到 `https://foo.github.io/bar/`，那么 `base` 应该被设置成 `"/bar/"`，它的值应当总是以斜杠开始，并以斜杠结束。

`base` 将会自动地作为前缀插入到所有以 `/` 开始的其他选项的链接中，所以你只需要指定一次。

### title

- 类型: `string`
- 默认值: `当前工作目录名称`

网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上。

### description

- 类型: `string`
- 默认值: `undefined`

网站的描述，它将会以 `<meta>` 标签渲染到当前页面的 HTML 中。

### head

- 类型: `Array`
- 默认值: `[]`

额外的需要被注入到当前页面的 HTML `<head>` 中的标签，每个标签都可以以 `[tagName, { attrName: attrValue }, innerHTML?]` 的格式指定，举个例子，增加一个自定义的 favicon：

```js
module.exports = {
  head: [['link', { rel: 'icon', href: '/logo.png' }]]
};
```

### locales

- 类型: `{ [path: string]: Object }`
- 默认值: `undefined`

提供多语言支持的语言配置。具体细节请查看 [多语言支持](../guide/i18n)。

### logo

- 类型: `string`
- 默认值: ``

你可以在导航栏加上一个 logo 通过`logo`属性. logo 可以放在[静态文件夹](https://www.gatsbyjs.org/docs/static-folder/).

```js
// .antdsite/config.js
module.exports = {
  themeConfig: {
    logo: '/assets/img/logo.png'
  }
};
```

### footer

- 类型: `string`
- 默认值: `null`

设置网站的足部。如果不设置则不显示足部。

```js
// .antdsite/config.js
module.exports = {
  themeConfig: {
    footer:
      'MIT Licensed | Copyright © 2019-present <a target="_blank" href="https://github.com/wangyi7099">Yi(Yves) Wang</a>'
  }
};
```

### prefetch

- 类型: `boolean`
- 默认值: `true`

是否开启页面预加载。建议服务器宽带较慢时禁用此项。

### useCNDForLargeFiles

- 类型: `boolean`
- 默认值: `true`

对于体积较大的文件，是否从 CDN 加载。建议服务器宽带较慢时启用此项。

### largeFileList

- 类型:

```ts
Array<{name:string,umdName:string,cdnLink:string,order?:number}>
```

- 默认值:

```js
[
  {
    name: 'moment',
    umdName: 'moment',
    cdnLink: 'https://gw.alipayobjects.com/os/lib/moment/2.24.0/min/moment.min.js'
  },
  {
    order: 2,
    name: 'react-dom',
    umdName: 'ReactDOM',
    cdnLink: 'https://gw.alipayobjects.com/os/lib/react-dom/16.8.1/umd/react-dom.production.min.js'
  },
  {
    order: 1,
    name: 'react',
    umdName: 'React',
    cdnLink: 'https://gw.alipayobjects.com/os/lib/react/16.8.1/umd/react.production.min.js'
  }
];
```

将从 CDN 加载的文件列表。

## 主题

### themeConfig

- 类型: `Object`
- 默认值: `{}`

为当前的主题提供一些配置，这些选项依赖于你正在使用的主题。

**也可以参考:**

- [默认主题](../default-theme-config/)。

## markdown

### alert

Alert 最终会渲染成 **Ant Design** 的 [Alert](https://ant.design/components/alert-cn/)组件。可以通过配置`alert`来设置不同的别名和默认标题，默认的配置项如下：

```js
const config = {
  markdown: {
    alert: {
      info: [
        {
          alias: 'tip',
          defaultTitle: 'Tip'
        },
        {
          alias: 'tip-zh',
          defaultTitle: '提示'
        }
      ],
      warning: [
        {
          alias: 'warning',
          defaultTitle: 'Warning'
        },
        {
          alias: 'warning-zh',
          defaultTitle: '警告'
        }
      ],
      error: [
        {
          alias: 'error',
          defaultTitle: 'Caveat'
        },
        {
          alias: 'error-zh',
          defaultTitle: '严重警告'
        }
      ]
    }
  }
};
```

其中:

- info：对应 `type="info"` 时 alert 组件
- warning： 对应 `type="warning"` 时 alert 组件
- error：对应 `type="error"` 时 alert 组件

你可以为每种类型设置多个别名和默认标题，如：

```js
const config = {
  markdown: {
    alert: {
      info: [
        alias: 'tip-alias',
        defaultTitle: 'Tip Alias'
      ]
    }
  }
};
```

**也可以参考:**

- [markdown 扩展](../guide/markdown/)
