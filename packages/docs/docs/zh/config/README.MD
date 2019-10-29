# 配置参考

> 文本大部分复制于[rcpress](https://rcpress.vuejs.org/zh/config/)，略作修改

::: tip-zh
不必担心默认的设置会被覆盖掉，rcpress 会使用[deepMerge 函数](https://github.com/YvesCoding/rcpress/blob/e85108dbac8fdd09d0d1673bb4d4b37b64e4cfbc/packages/rcpress/lib/util.js#L5)将新设置的配置和默认配置进行**深度合并**
:::

## base

- 类型: `string`
- 默认值: `/`

部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。如 Github pages，如果你想将你的网站部署到 `https://foo.github.io/bar/`，那么 `base` 应该被设置成 `"/bar/"`，它的值应当总是以斜杠开始，并以斜杠结束。

`base` 将会自动地作为前缀插入到所有以 `/` 开始的其他选项的链接中，所以你只需要指定一次。

## title

- 类型: `string`
- 默认值: `当前工作目录名称`

网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上。

## description

- 类型: `string`
- 默认值: `undefined`

网站的描述，它将会以 `<meta>` 标签渲染到当前页面的 HTML 中。

## head

- 类型: `Array`
- 默认值: `[]`

额外的需要被注入到当前页面的 HTML `<head>` 中的标签，每个标签都可以以 `[tagName, { attrName: attrValue }, innerHTML?]` 的格式指定，举个例子，增加一个自定义的 favicon：

```js
module.exports = {
  head: [['link', { rel: 'icon', href: '/logo.png' }]]
};
```

## locales

- 类型: `{ [path: string]: Object }`
- 默认值: `undefined`

提供多语言支持的语言配置。具体细节请查看 [多语言支持](../guide/i18n)。

## less/scss/sass

设置给对应的 loader 的 option， 例如

```js
// 修改ant design 主题颜色为红色
module.exports = {
  title: 'xxx',
  less: {
    modifyVars: {
      // 赋值给less-loader
      'primary-color': 'red'
    }
  }
};
```

## themeConfig

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

### serviceWorker

- 类型: `boolean`
- 默认值: `false`

如果设置成 `true`，VuePress 将会自动生成并且注册一个 service worker，它缓存了那些已访问过的页面的内容，用于离线访问（仅在生产环境生效）。

如果你正在开发一个自定义主题，`Layout.js` 组件将会自动触发下述的事件：

- `sw-ready`
- `sw-cached`
- `sw-updated`
- `sw-offline`
- `sw-error`

::: tip | PWA NOTES
`serviceWorker` 选项仅仅用来控制 service worker，为了让你的网站完全地兼容 PWA，你需要在 `.rcpress/public` 提供 Manifest 和 icons，更多细节，请参见 [MDN docs about the Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).
此外，只有您能够使用 SSL 部署您的站点时才能启用此功能，因为 service worker 只能在 HTTPs 的 URL 下注册。
:::
