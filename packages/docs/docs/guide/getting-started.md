# Quick Start

## Install via cli

#### Install `antdsite-cli` via [yarn](https://yarnpkg.com)

```bash
yarn global add antdsite-cli
```

#### Or install via [npm](https://docs.npmjs.com/cli/install.html)

```bash
npm install antdsite-cli -g
```

#### Use `cli` to initialize a website

```bash
antdsite my-docs
```

#### Switch to the initialized site directory and run the Site

```bash
cd my-docs

yarn start
# OR
npm start
```

#### Visit the default address `localhost:8000` to see the effect page

<p align="center">
<img src="https://github.com/wangyi7099/pictureCdn/blob/master/allPic/antdsite/screenshot.png?raw=true" width="700" />
</p>

## Install in an existing project

Add dependencies and run scripts in `package.json`

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

If you use yarn, the script is as follows

```json
{
  "scripts": {
    "build": "yarn clean && gatsby build",
    "start": "yarn clean && gatsby develop",
    "clean": "gatsby clean"
  }
}
```

Installation dependency

```bash
yarn # or npm
```

Create a new docs folder and add a README.MD file

```bash
mkdir docs

echo '# Hello AntdSite' > docs/README.md
```

Run project

```bash
yarn start
# OR
npm start
```

Generate static files

```bash
yarn build
# OR
npm run build
```
