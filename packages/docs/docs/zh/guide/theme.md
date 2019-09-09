# 自定义主题

## 自定义布局

开发自定义的主题需要在`,rcpress`目录下新建一个`theme`目录。

```bash
├── .rcpress
    ├── theme           # 主题文件夹，用于存放自定义主题
```

你可以通过建立不同的文件来自定义整个布局或者部分布局。

```bash
├── .rcpress
    ├── theme                 # 主题文件夹，用于存放自定义主题
        ├── layout.js         # 自定义整个布局
        ├── header.js         # 自定义整个页面头部
        ├── main-content.js   # 自定义除了首页外的内容页面
        ├── heme.js           # 自定义首页
        ├── footer.js         # 自定义首页尾部
```

其中：

- 自定义 layout 的话会自定义所有布局。
- 自定义其他文件为部分布局。

## 获取网站数据和当前页面的数据

页面的数据都存在从`rcpress`导出的`PageContext`中

```js
import { PageContext } from '@app';
```

`PageContext`是由`React.createContext` api 创建而成，用法可以参照一下 react 的[文档](https://reactjs.org/docs/context.html#reactcreatecontext)。

`PageContext`的值为一个`Object`，其中包含 6 个属性：

```js
{
  siteData: {},
  slug: '',
  currentLocaleWebConfig: {},
  currentPageSidebarItems: {},
  allPagesSidebarItems: {},
  currentPageInfo: {},
}
```

以下逐项进行讲解：

### siteData

- 类型: `Object`

也就是你`.rcpress/config.js`文件里的所有内容。

### slug

- 类型: `String`

网站当前页面路径

### currentLocaleWebConfig

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
rcpress-cli --eject
```

即可把所有默认主题拷贝到当前工作目录下的`.rcpress/theme`文件夹下， 然后你就=可以修改整个默认主题了。
