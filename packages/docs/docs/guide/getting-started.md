# Quick Start

## Install cli

Install via [yarn](https://yarnpkg.com) `antdsite-cli`

```bash
yarn global add antdsite-cli
```

or install via [npm](https://docs.npmjs.com/cli/install.html)

```bash
npm install antdsite-cli -g
```

## Create project via cli

Initialize a default starter wesite via `cli`

```bash
antdsite my-docs

# Or specify a path
# ./ indicates that the project is created in the current directory and can be omitted.
# --force indicates that the project is forcibly created.
antdsite ./ --force

```

Switch to the initial website directory and run the website

```bash
cd my-docs

yarn start
# OR
npm start
```

Visit the default address `localhost:8000` to see the effect page

## Screenshots

import ImgWidthBase from '@components/ImgWidthBase'

<p align="center">
<ImgWidthBase url="screenshot.png" width={700}/>  
</p>

<p align="center">
<ImgWidthBase url="screenshot-1.png" width={700}/>
</p>
