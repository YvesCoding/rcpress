# 配置文件

## config.js

网站配置文件名为`config.js`，在网站根目录下`.rcpress`文件夹下的`config.js`

```bash
├── .rcpress
    ├── config.js
├── docs
├── package.json
```

## 基本配置

`config.js` 的基本配置如下:

```js
module.exports = {
  title: 'my-docs',
  description: 'some descriptions...'
};
```

需要基本包含一个`title`和`description`，详细的配置可以参考[配置](/zh/config/)一节。

## 主题配置

一个 RcPress 主题应该负责整个网站的布局和交互细节。在 RcPress 中，目前自带了一个默认的主题（正是你现在所看到的），它是为技术文档而设计的。同时，默认主题提供了一些选项，让你可以去自定义头部（header）、 底部（footer）和 首页（home） 等，详情请参见 [默认主题](/zh/default-theme-config/)

如果你想开发一个自定义主题，可以参考 [自定义主题](/zh/guide/theme)。
