# Default Theme Config

> Most of the text is copied in [vuepress](https://vuepress.vuejs.org/zh/default-theme-config), with minor modifications
>
> All options listed on this page apply to the default theme only. If you are using a custom theme, the options may be different.

## Homepage

The default theme provides a homepage layout (which is used on [the homepage of this very website](/)). To use it, specify `home: true` plus some other metadata in your root `README.md`'s [YAML front matter](https://jekyllrb.com/docs/front-matter/). This is the actual data used on this site:

```yaml
---
actionText: Get Started →
actionLink: /guide/
showStar: true
home: true
features:
  - title: Easy to get started
    details: It only requires simple configuration and some markdown syntax to get started quickly
  - title: Rich UI components
    details: Document design comes from <a target="_blank" href="https://ant.design/">Ant Design</a> website, which not only has a beautiful interface, but also can directly use all Ant Design components.
  - title: Powerful
    details: Thanks to <a target="_blank" href= "https://github.com/mdx-js/mdx">mdx</a>, we can use JSX in markdown.
---

```

Any additional content after the `YAML front matter` will be parsed as normal markdown and rendered after the features section.

<Alert message="Warning" description={<p>showStar only supports <strong>GitHub</strong></p>} type="warning" showIcon />

## Navbar

The Navbar may contain your page title, [Search Box](#search-box), [Navbar Links](#navbar-links), [Languages](../guide/i18n) and [Repository Link](#git-repo-and-edit-links), all of them depends on your configuration.

### Navbar Links

You can add links to the navbar via `themeConfig.nav`:

```js
// .antdsite/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/', important: true }, // There will be red dots on the right of the label.
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' }
    ]
  }
};
```

These links can also be dropdown menus if you provide an array of `items` instead of a `link`:

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

## Sidebar

To enable the sidebar, use `themeConfig.sidebar`. The basic configuration expects an Array of links:

```js
// .antdsite/config.js
module.exports = {
  themeConfig: {
    sidebar: ['/', '/page-a', ['/page-b', 'Explicit link text']]
  }
};
```

You can omit the `.md` extension, and paths ending with `/` are inferred as `*/README.md`. The text for the link is automatically inferred (either from the first header in the page or explicit title in `YAML front matter`). If you wish to explicitly specify the link text, use an Array in form of `[link, text]`.

### Sidebar Groups

You can divide sidebar links into multiple groups by using **objects**:

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
            title: 'Group 3', // Max to level 2 group
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

Sidebar groups are collapsable by default. You can force a group to be always open with `collapsable: false`.

### Multiple Sidebars

If you wish to display different sidebars for different sections of content, first organize your pages into directories for each desired section:

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

Then, update your configuration to define your sidebar for each section.

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

### Sidebar HomePage

If your directory structure is like this:

```bash
├─ foo/
│ ├─ one.md
│ └─ two.md
```

In `one.md`, it can be set to the front page by `YAML front matter`:

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
        'one' /* /foo/one.html or /foo will be redirect to /foo/one */,
        'two' /* /foo/two.html */
      ]
    }
  }
};
```

## Catalogue on the right

### Nested Header Links

The sidebar automatically displays links for headers in the current active page, nested under the link for the page itself. You can customize this behavior using `themeConfig.maxTocDeep`. the default depth is `3`，which extracts the `h1` headers，if set to `2`，it will extracts the `h2` headers, and so on.

You can also override this value for a page using `YAML front matter`:

```md
---
maxTocDeep: 4
---
```

## Built-in Search Box

You can disable the built-in search box with `themeConfig.search: false`, and customize how many suggestions will be shown with `themeConfig.searchMaxSuggestions`:

```js
module.exports = {
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10
  }
};
```

## Last Updated

The `themeConfig.lastUpdated` option allows you to get the UNIX timestamp(ms) of each file's last modification, and it will also display at the top of each page in an appropriate format:

```js
module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated' // string | boolean
  }
};
```

Note that it's `off` by default. If given a `string`, it will be displayed as a prefix (default value: `Last Updated`).

## Git Repo and Edit Links

Providing `themeConfig.repo` auto generates a GitHub link in the navbar and "Edit this page" links at the bottom of each page.

```js
// .antdsite/config.js
module.exports = {
  themeConfig: {
    repo: 'YvesCoding/antdsite', // Assumes GitHub. Can also be a full Gitee url  Defaults to "GitHub"/"Gitee"/"Bitbucket" depending on `themeConfig.repo`
    docsRepo: 'YvesCoding/antdsite', // Custom document repo, default to docsRepo
    docsRelativeDir: 'packages/docs', // Relative path from project root to docs folder.
    docsDir: 'docs', // The directory of document
    docsBranch: 'master', // The git branch of document
    editLinks: true, // // defaults to false, set to true to enable
    editLinkText: 'Help us improve this page!', // custom text for edit link. Defaults to "Edit this page"
    showAvatarList: true // Whether to display a list of users who edited this page, set it to false to disable
  }
};
```

## Back To Top

```js
module.exports = {
  themeConfig: {
    // Whether to enable back to top
    showBackToTop: true
  }
};
```

## Cutom Theme Color

You can change theme color by setting `themeConfig.themeColors`

```js
module.exports = {
  themeConfig: {
    themeColors: {
      'primary-color': 'red'
    }
  }
};
```

The value of `themeConfig.themeColors` is assigned to `modifyVars` of `less-loader`. For details, please refer to: [Ant Design - Customize in webpack](https://ant.design/docs/react/customize-theme#Customize-in-webpack)
