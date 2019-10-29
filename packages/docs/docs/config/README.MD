# Config Reference

> Most of the text is copied in [rcpress](https://rcpress.vuejs.org/config/), with minor modifications

::: tip
Don't worry about the default settings being overwritten, rcpress will use the [deepMerge function](https://github.com/YvesCoding/rcpress/blob/e85108dbac8fdd09d0d1673bb4d4b37b64e4cfbc/packages/rcpress/lib/util.js#L5) to **deep merge** the new settings and default configuration.
:::

## base

- Type: `string`
- Default: `/`

The base URL to which the site will be deployed. You will need to set this if you plan to deploy your site under a sub path, for example GitHub pages. If you plan to deploy your site to `https://foo.github.io/bar/`, then `base` should be set to `"/bar/"`. It should always start and end with a forward slash (/).

The `base` is automatically prepended to all the URLs that start with `/` in other options, so you only need to specify it once.

## title

- Type: `string`
- Default: `Current working directory name`

Title for the site. This will be the prefix for all page titles, and displayed in the navbar in the default theme.

## description

- Type: `string`
- Default: `undefined`

Description for the site. This will be rendered as a `<meta>` tag in the page HTML.

## head

- Type: `Array`
- Default: `[]`

Extra tags to be injected to the page HTML `<head>`. Each tag can be specified in the form of `[tagName, { attrName: attrValue }, innerHTML?]`. For example, to add a custom favicon:

```js
module.exports = {
  head: [['123', { rel: 'icon', href: '/logo.png' }]]
};
```

## locales

- Type: `{ [path: string]: Object }`
- Default: `undefined`

Specify locales for i18n support. For more details, see the guide on [Internationalization](../guide/i18n).

## less/scss/sass

Set options for the corresponding loader, for example

```js
// Modify ant design theme color to red
module.exports = {
  title: 'xxx',
  less: {
    modifyVars: {
      // Assign to less-loader
      'primary-color': 'red'
    }
  }
};
```

## themeConfig

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

### serviceWorker

- Type: `boolean`
- Default: `false`

If set to `true`, VuePress will automatically generate and register a service worker that caches the content for offline use (only enabled in production).

If developing a custom theme, the `Layout.js` component will also be emitting the following events:

- `sw-ready`
- `sw-cached`
- `sw-updated`
- `sw-offline`
- `sw-error`

::: tip | PWA NOTES
The `serviceWorker` option only handles the service worker. To make your site fully PWA-compliant, you will need to provide the Web App Manifest and icons in `.rcpress/public`. For more details, see [MDN docs about the Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).

Also, only enable this if you are able to deploy your site with SSL, since service worker can only be registered under HTTPs URLs.
:::
