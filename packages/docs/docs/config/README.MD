# Config Reference

> Most of the text is copied in [vuepress](https://vuepress.vuejs.org/config/), with minor modifications

::: tip
Don't worry about the default settings being overwritten, antdsite will use the [deepMerge function](https://github.com/YvesCoding/antdsite/blob/e85108dbac8fdd09d0d1673bb4d4b37b64e4cfbc/packages/antdsite/lib/util.js#L5) to **deep merge** the new settings and default configuration.
:::

## Basic Config

### base

- Type: `string`
- Default: `/`

The base URL to which the site will be deployed. You will need to set this if you plan to deploy your site under a sub path, for example GitHub pages. If you plan to deploy your site to `https://foo.github.io/bar/`, then `base` should be set to `"/bar/"`. It should always start and end with a forward slash (/).

The `base` is automatically prepended to all the URLs that start with `/` in other options, so you only need to specify it once.

### title

- Type: `string`
- Default: `Current working directory name`

Title for the site. This will be the prefix for all page titles, and displayed in the navbar in the default theme.

### description

- Type: `string`
- Default: `undefined`

Description for the site. This will be rendered as a `<meta>` tag in the page HTML.

### head

- Type: `Array`
- Default: `[]`

Extra tags to be injected to the page HTML `<head>`. Each tag can be specified in the form of `[tagName, { attrName: attrValue }, innerHTML?]`. For example, to add a custom favicon:

```js
module.exports = {
  head: [['link', { rel: 'icon', href: '/logo.png' }]]
};
```

### locales

- Type: `{ [path: string]: Object }`
- Default: `undefined`

Specify locales for i18n support. For more details, see the guide on [Internationalization](../guide/i18n).

### logo

- Type: `string`
- Default: ``

You can add a logo to the navbar via `logo`. Logo can be placed in [static folder](https://www.gatsbyjs.org/docs/static-folder/).

```js
// .antdsite/config.js
module.exports = {
  themeConfig: {
    logo: '/assets/img/logo.png'
  }
};
```

### footer

- Type: `string`
- Default: `null`

Set website footer. Footer will not display if it isn't set any value.

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

- Type: `boolean`
- Default: `true`

Whether to enable page preloading. It is recommended to disable this when the server bandwidth is slow.

### useCNDForLargeFiles

- Type: `boolean`
- Default: `true`

For larger files, whether to load from CDN. It is recommended to enable this when the server bandwidth is slow.

### largeFileList

- Type:

```ts
Array<{name:string,umdName:string,cdnLink:string,order?:number}>
```

- Default:

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

A list of files to be loaded from the CDN.

## Theming

### themeConfig

- Type: `Object`
- Default: `{}`

Provide config options to the used theme. The options will vary depending on the theme you are using.

**Also see:**

- [Default Theme Configuration](../default-theme-config).

## markdown

### alert

The Alert will eventually be rendered into the [Alert](https://ant.design/components/alert-cn/) component of **Ant Design**. You can set different aliases and default titles by configuring `alert`. The default configuration items are as follows:

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

among them:

- info: corresponding to `type="info"` alert component
- warning: corresponds to `type="warning"` alert component
- error: corresponding to `type="error"` alert component

You can set multiple aliases and default titles for each type, such as:

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

**See also:**

- [Markdown Extensions](../guide/markdown/)
