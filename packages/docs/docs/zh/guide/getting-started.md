---
title: 开始使用
---

# 开始上手

## 通过 cli 安装

#### 使用 [yarn](https://yarnpkg.com) 安装`antdsite-cli`

```bash
yarn global add antdsite-cli
```

#### 或者使用[npm](https://docs.npmjs.com/cli/install.html) 安装

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

#### 访问默认的地址 `localhost:8000` 即可看到效果页面

<p align="center">
<img src="https://github.com/wangyi7099/pictureCdn/blob/master/allPic/antdsite/screenshot.png?raw=true" width="700" />
</p>

## 在现有项目安装

在`package.json`里添加依赖和运行脚本

```json
{
  "dependencies": {
    "antdsite": "^0.0.7",
    "gatsby": "^2.13.39",
    "react": "^16.8.0",
    "react-dom": "^16.8.0"
  },
  "scripts": {
    "build": "npm run clean && gatsby build",
    "start": "npm run clean && gatsby develop",
    "clean": "gatsby clean"
  }
}
```

如果你使用 yarn 的话，脚本如下

```json
{
  "scripts": {
    "build": "yarn clean && gatsby build",
    "start": "yarn clean && gatsby develop",
    "clean": "gatsby clean"
  }
}
```

安装依赖

```bash
yarn # or npm
```

新建 docs 文件夹并添加一个 README.MD 文件

```bash
mkdir docs

echo '# Hello AntdSite' > docs/README.md
```

运行项目

```bash
yarn start
# OR
npm start
```

生成静态文件

```bash
yarn build
# OR
npm run build
```
