# Config Reference

> Most of the text is copied in [vuepress](https://vuepress.vuejs.org/config/), with minor modifications

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

## Theming

### themeConfig

- Type: `Object`
- Default: `{}`

Provide config options to the used theme. The options will vary depending on the theme you are using.

**Also see:**

- [Default Theme Configuration](../default-theme-config).
