---
title: 开始使用
---

# 开始上手

## 通过 cli 安装

#### 使用 [yarn](https://yarnpkg.com) 进行安装`antdsite-cli`

```bash
yarn global add antdsite-cli
```

#### 或者使用[npm](https://docs.npmjs.com/cli/install.html)进行安装

```bash
npm install antdsite-cli -g
```

#### 使用 `cli` 来初始化一个网站

```bash
antdsite my-docs
```

#### 切换到初始化的网站目录，运行网站

```bash
cd my-docs

yarn start
# OR
npm start
```

#### 访问默认的地址 `localhost:8000` 即可看到效果页面。

<p aligin="center">
<img src="https://github.com/wangyi7099/pictureCdn/blob/master/allPic/antdsite/screenshot.png?raw=true" width="700" />
</p>

## 在现有项目安装

### 修改 package.json

#### 在`package.json`里添加依赖和启动脚本

#### 添加依赖

```diff
   "dependencies": {
+    "antdsite": "^0.0.7",
+    "gatsby": "^2.13.39",
+    "react": "^16.8.0",
+    "react-dom": "^16.8.0"
  },
```

#### 如果你使用 yarn 的话，添加的脚本如下

```diff
  "scripts": {
+    "build": "yarn clean && gatsby build",
+    "start": "yarn clean && gatsby develop",
+    "clean": "gatsby clean"
   }
```

#### npm 脚本如下

```diff
  "scripts": {
+    "build": "npm run clean && gatsby build",
+    "start": "npm run clean && gatsby develop",
+    "clean": "gatsby clean"
   }
```

### 安装依赖

##### 执行`yarn`或者`npm`命令安装依赖

```bash
yarn
# OR
npm
```

### 新建一个 docs 文件夹

```bash
mkdir docs
```

### 新建一个 .antdsite 文件夹

```bash
mkdir .antdsite
```

### 进入 .antdsite 建立 config.js

在.antdsite 目录建立`config.js`

```js
module.exports = {
  title: 'hello'
};
```

### 运行项目

```bash
yarn start
# OR
npm start
```
