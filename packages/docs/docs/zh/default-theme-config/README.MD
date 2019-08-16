# 默认主题

> 本节大部分复制于[vepress](https://vuepress.vuejs.org/zh/default-theme-config),略作修改
>
> 本页所列的选项仅对默认主题生效。如果你在使用一个自定义主题，选项可能会有不同

## 首页

默认的主题提供了一个首页（Homepage）的布局 (用于 [这个网站的主页](/zh))。想要使用它，需要在你的根级 `README.md` 的 [YAML front matter](https://jekyllrb.com/docs/front-matter/) 指定 `home: true`。以下是这个网站实际使用的数据：

```yaml
---
actionText: 快速上手 →
actionLink: /zh/guide/
showStar: true
home: true
features:
  - title: 门槛底
    details: 只需要简单配置，会一些markdown语法就能快速上手
  - title: UI组件丰富
    details: 文档的设计来源于<a target="_blank" href="https://ant.design/docs/react/introduce-cn">Ant Design</a>网站，不仅界面美观，还能直接使用所有的Ant Design 组件。
  - title: 功能强大
    details: 得益于<a target="_blank" href="https://github.com/mdx-js/mdx">mdx</a>，我们可以在markdown里使用JSX。
---

```

任何 `YAML front matter` 之后额外的内容将会以普通的 markdown 被渲染，并插入到 `features` 的后面。

<Alert message="警告" description={<p>showStar 只支持 <strong>GitHub</strong></p>} type="warning" showIcon />

## 导航栏

The Navbar may contain your page title, [Search Box](#search-box), [Navbar Links](#navbar-links), [Languages](../guide/i18n) and [Repository Link](#git-repo-and-edit-links), all of them depends on your configuration.

### 导航栏链接

你可以通过 `themeConfig.nav` 增加一些导航栏链接:

```js
// .antdsite/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/', important: true }, // 标签右上会有红点显示
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' }
    ]
  }
};
```

当你提供了一个 `items` 数组而不是一个单一的 `link` 时，它将显示为一个 `下拉列表` ：

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/language/chinese' },
          { text: 'Japanese', link: '/language/japanese' }
        ]
      }
    ]
  }
};
```

## 侧边栏

想要使 侧边栏 Sidebar 生效，需要配置 `themeConfig.sidebar`，基本的配置，需要一个包含了多个链接的数组：

```js
// .antdsite/config.js
module.exports = {
  themeConfig: {
    sidebar: ['/', '/page-a', ['/page-b', 'Explicit link text']]
  }
};
```

你可以省略 `.md` 拓展名，同时以 `/` 结尾的路径将会被视为 `*/README.md`，这个链接的文字将会被自动获取到（无论你是声明为页面的第一个 header，还是明确地在 `YAML front matter` 中指定页面的标题）。如果你想要显示地指定链接的文字，使用一个格式为 `[link, text]` 的数组。

### 侧边栏分组

你可以通过使用**对象**来将侧边栏划分成多个组：

```js
// .antdsite/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',
        collapsable: false,
        children: ['/']
      },
      {
        title: 'Group 2',
        children: [
          {
            title: 'Group 3', // 最多两层分组
            children: [
              /* ... */
            ]
          }
        ]
      }
    ]
  }
};
```

侧边栏的每个子组默认是可折叠的，你可以设置 `collapsable: false` 来让一个组永远都是展开状态。

### 多个侧边栏

如果你想为不同的页面组来显示不同的侧边栏，首先，将你的页面文件组织成下述的目录结构：

```
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar/
   ├─ README.md
   ├─ three.md
   └─ four.md
```

接着，遵循以下的侧边栏配置：

```js
// .antdsite/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      '/foo/': ['' /* /foo/ */, 'one' /* /foo/one.html */, 'two' /* /foo/two.html */],

      '/bar/': ['' /* /bar/ */, 'three' /* /bar/three.html */, 'four' /* /bar/four.html */]
    }
  }
};
```

### 侧边栏首页

如果你的目录结构是这样的：

```bash
├─ foo/
│ ├─ one.md
│ └─ two.md
```

可以在`one.md`中通过 `YAML front matter` 将其设置为首页：

```yaml
---
home: true
---

```

```js
// .antdsite/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      '/foo/': [
        'one' /* /foo/one.html 或者 /foo 将会被重定向到 /foo/one */,
        'two' /* /foo/two.html */
      ]
    }
  }
};
```

## 右侧目录

### 嵌套的标题链接

默认情况下，右侧目录会自动地显示由当前页面的标题（headers）组成的链接，并按照页面本身的结构进行嵌套，你可以通过 `themeConfig.maxTocDeep` 来修改它的行为。默认的深度是 `3`，如果设置成`1`, 它将提取到 `h1` 的标题，设置值为`2`，它将提取到`h2`的标题，以此类推。

也可以使用 `YAML front matter` 来为某个页面重写此值：

```md
---
maxTocDeep: 4
---
```

## 内置搜索

你可以通过设置 `themeConfig.search: false` 来禁用默认的搜索框，或是通过 `themeConfig.searchMaxSuggestions` 来调整默认搜索框显示的搜索结果数量：

```js
module.exports = {
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10
  }
};
```

## 最后更新时间

你可以通过 `themeConfig.lastUpdated` 选项来获取文件最后一次修改的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的顶部：

```js
module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated' // string | boolean
  }
};
```

请注意，`themeConfig.lastUpdated` 默认是开启的，如果给定一个字符串，它将会作为前缀显示（默认值是：`Last Updated`）。

你可以通过设置 frontmatter `disableUpdateTime`为`true`来关闭特定页面的`lastUpdated`

```md
---
disableUpdateTime: true
---
```

## Git 仓库和编辑链接

当你提供了 `themeConfig.repo` 选项，将会自动在每个页面的导航栏生成生成一个 GitHub 链接，以及在页面的底部生成一个 `"Edit this page"` 链接。

```js
// .antdsite/config.js
module.exports = {
  themeConfig: {
    repo: 'YvesCoding/antdsite', // 假定是 GitHub. 同时也可以是一个完整的 Gitee URL,默认为Gihub仓库，支持Github,Bitbucket,Gitee。
    docsRepo: 'YvesCoding/antdsite', // 自定义文档仓库，默认和docsRepo的值一致
    docsRelativeDir: 'packages/docs', // 项目根目录到文档的相对地址，默认为''
    docsDir: 'docs', // 文档目录 默认为docs
    docsBranch: 'master', // 文档所在git分支
    editLinks: true, // 默认是 false, 设置为 true 来启用
    editLinkText: '帮助我们改善此页面！', // 默认为 "Edit this page"
    showAvatarList: true // 是否显示编辑过此页面的用户用户列表, 设置为false关闭
  }
};
```

你可以通过在特定的页面设置 frontmatter `disableEditLink`为`true`来关闭它的`editLinks`

```md
---
disableEditLink: true
---
```

## 回到顶部

```js
module.exports = {
  themeConfig: {
    // 是否启用回到顶部按钮
    showBackToTop: true
  }
};
```

## 定制主题颜色

你可以通过设置`themeConfig.themeColors`来变更主题的颜色。

```js
module.exports = {
  themeConfig: {
    themeColors: {
      'primary-color': 'red'
    }
  }
};
```

`themeConfig.themeColors`的值会赋给`less-loader`的`modifyVars`。 具体请参考[Ant Design - 在 webpack 中定制主题](https://ant.design/docs/react/customize-theme-cn#%E5%9C%A8-webpack-%E4%B8%AD%E5%AE%9A%E5%88%B6%E4%B8%BB%E9%A2%98)
