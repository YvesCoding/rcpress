# 快速上手

## 安装 cli

使用 [yarn](https://yarnpkg.com) 安装`antdsite-cli`

```bash
yarn global add antdsite-cli
```

或者使用[npm](https://docs.npmjs.com/cli/install.html) 安装

```bash
npm install antdsite-cli -g
```

## 使用 cli 创建项目

使用 `cli` 来初始化一个默认的入门网站

```bash
antdsite my-docs

# 或者指定一个路径
# ./表示在当前目录创建项目，可以省略
# --force 表示强制创建项目。
antdsite ./ --force

```

切换到初始化的网站目录，运行网站

```bash
cd my-docs

yarn start
# OR
npm start
```

访问默认的地址 `localhost:8000` 即可看到效果页面

## 效果图

import ImgWidthBase from '@components/ImgWidthBase'

<p align="center">
<ImgWidthBase url="screenshot.png" width={700}/>  
</p>

<p align="center">
<ImgWidthBase url="screenshot-1.png" width={700}/>
</p>
