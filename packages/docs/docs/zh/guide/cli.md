# 命令行工具

```bash
rcpress [projectName] [optons]
```

## projectName

prject 可以是一个项目名称，如：

```bash
rcpress my-docs
```

也可以是一个路径名称，如：

```bash
rcpress ./
```

## options

### --use-npm

默认使用`yarn`下载依赖。如果指定此参数则使用 npm 下载依赖。

### --force

默认如果待创建的目录存在以下之外的文件：

```js
const validFiles = [
  '.DS_Store',
  'Thumbs.db',
  '.git',
  '.gitignore',
  '.idea',
  'README.md',
  'LICENSE',
  '.hg',
  '.hgignore',
  '.hgcheck',
  '.npmignore',
  'mkdocs.yml',
  'docs',
  '.travis.yml',
  '.gitlab-ci.yml',
  '.gitattributes'
];
```

则不能被认为是一个[安全](https://github.com/facebook/create-react-app/blob/30fc0bf5ed566d9b42194d56541d278013d7928c/packages/create-react-app/createReactApp.js#L791)项目, 项目将不会被创建成功，程序将自动退出， 指定 `--force` 则无视此条规则，强制创建项目，如果存在 package.json 将会被 merge。

### --ejct

拷贝整个默认的主题到当前文件夹下，你可以对整个默认主题进行修改。

参考：

[自定义主题](./theme)
