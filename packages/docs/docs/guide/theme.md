# Custom Themes

## Custom layout

To develop custom themes, you need to create a new theme directory under the `rcpress` directory.

You can customize theme by creating `Layout.js`.

```bash
├── .rcpress
    ├── theme                 # Theme folder for storing custom themes
        ├── Layout.js         # Customize the entire
```

## Using a theme from a dependency

```js
module.exports = {
  theme: 'xxx'
};
```

## Get site data and current page data

Page data stores in `SiteContext`. which is exported from `rcpress`.

```jsx
import { SiteContext } from '@rcpress/core';

<SiteContext.Provider>
{
  siteContext => {
    console.log(siteContext)
  }
}
</SiteContext.Provier>
```

you can also access site data by hook.

```js
import { useSiteContext } from '@rcpress/core';

const siteContext = useSiteContext();
console.log(siteContext);
```

`SiteContext` is created by `React.createContext` api, you can refer to react's [document](https://reactjs.org/docs/context.html#reactcreatecontext).

The value of `SiteContext` is an `Object`, which contains six attributes:

```js
{
  siteData: {},
  path: '',
  currentLocaleSiteData: {},
  currentPageSidebarItems: {},
  allPagesSidebarItems: {},
  currentPageInfo: {},
}
```

The following are explained item by item:

### siteData

- Type: `Object`

That's all in your `rcpress/config.js` file.

### path

- Type: `String`

Current Page Path of Website

### currentLocaleSiteData

- Type: `Object`

Website configuration in the current language, it will be the same as `siteData` if there are not locates set.

### currentPageSidebarItems

- Type: `Object`

The left menus of the current page (except the home page).

### allPagesSidebarItems

- Type: `Object`

The left menus of all pages (except the home page).

### currentPageInfo

- Type: `Object`

Current page data, the value is:

```js
{
  code: {
    body: '' // Current page content code. Only can be used by `MDX Renderer' of mdx plugin for rendering.
  },
  fields: {
    avatarList: [{}]， // List of User Information Contributed to the Current Page
    modifiedTime: '1564579847121', // Current page modification timestamp
    path: 'packages/docs/docs/zh/guide/theme.md' // Relative paths from current page file to project root directories
  }，
  tableOfContents:{
      items: [] // Current page directory
  },
  headings: [{depth:1,value:'Custom Theme'}] // Current page title
}
```

## Modify the default theme

Run the following commands in the project root directory:

```bash
rcpress eject
```

You can copy entire theme to the `.rcpress/theme` folder in the current working directory, and then you can modify the entire default theme.
