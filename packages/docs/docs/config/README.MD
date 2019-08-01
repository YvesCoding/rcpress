# 基本配置

> 注意
>
> 文本大部分复制于[vuepress](https://vuepress.vuejs.org/zh/config/)，略作修改

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

## 主题

### themeConfig

- 类型: `Object`
- 默认值: `{}`

为当前的主题提供一些配置，这些选项依赖于你正在使用的主题。

**也可以参考:**

- [默认主题](/zh/default-theme-config/)。

## 浏览器兼容性

### evergreen

- 类型: `boolean`
- 默认值: `false`

如果你的对象只有那些 “常青树” 浏览器，你可以将其设置成 `true`，这将会禁止 ESNext 到 ES5 的转译以及对 IE 的 polyfills，同时会带来更快的构建速度和更小的文件体积。
