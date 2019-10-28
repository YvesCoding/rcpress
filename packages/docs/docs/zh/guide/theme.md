# 自定义主题

## 自定义布局

要开发自定义主题，您需要在 rcpress 目录下创建一个新的主题目录。

您可以通过创建“ Layout.js”来自定义主题。

```bash
├── .rcpress
    ├── theme                 # Theme folder for storing custom themes
        ├── Layout.js         # Customize the entire
```

## 使用依赖项中的主题

```js
module.exports = {
  theme: 'xxx'
};
```

## 获取站点数据和当前页面数据

页面数据存储在 `SiteContext` 中。它是从 rcpress 导出的。

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

也可以通过`react hook`获取站点数据。

```js
import { useSiteContext } from '@rcpress/core';

const siteContext = useSiteContext();
console.log(siteContext);
```

`SiteContext`是由`React.createContext` api 创建而成，用法可以参照一下 react 的[文档](https://reactjs.org/docs/context.html#reactcreatecontext)。

`SiteContext`的值为一个`Object`，其中包含 6 个属性：

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

以下逐项进行讲解：

### siteData

- 类型: `Object`

也就是你`.rcpress/config.js`文件里的所有内容。

### path

- 类型: `String`

网站当前页面路径

### currentLocaleSiteData

- 类型: `Object`

当前语言下的网站配置，如果没有设置多语言的话那么和`siteData`一样

### currentPageSidebarItems

- 类型: `Object`

当前页面(除了首页)的左侧菜单栏。

### allPagesSidebarItems

- 类型: `Object`

所有页面(除了首页)的左侧菜单栏。

### currentPageInfo

- 类型: `Object`

当前页面数据,值为：

```js
{
  code: {
    body: '' // 当前页面内容代码。只能用mdx插件的`MDXRenderer`函数进行渲染。
  },
  fields: {
    avatarList: [{}]， // 为当前页面贡献过的用户信息列表
    modifiedTime: '1564579847121', // 当前页面修改时间戳
    path: 'packages/docs/docs/zh/guide/theme.md' // 从当前页面文件到项目根目录的相对路径
  }，
  tableOfContents:{
      items: [] // 当前页目录
  },
  headings: [{depth:1,value:'自定义主题'}] // 当前页标题
}
```

## 修改默认主题

在项目根目录下运行下列命令:

```bash
rcpress eject
```

即可把所有默认主题拷贝到当前工作目录下的`.rcpress/theme`文件夹下， 然后你就=可以修改整个默认主题了。
