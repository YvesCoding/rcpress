# Command Line Tool

```bash
antdsite [projectName] [optons]
```

## projectName

Prject can be a project name such as:

```bash
antdsite my-docs
```

Can also be a path name such as:

```bash
antdsite ./
```

## options

### --use-npm

By default, `yarn` is used to download dependencies. If you specify this parameter, use npm to download dependencies.

### --force

By default, if the directory to be created has files other than the following:

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

Can not be considered a [secure](https://github.com/facebook/create-react-app/blob/30fc0bf5ed566d9b42194d56541d278013d7928c/packages/create-react-app/createReactApp.js#L791) project, the project will not be created successfully, the program will automatically exit. Specify `--force` to ignore this rule and force the creation of the project. If there is package.json, it will be merged.

### --ejct

Copy the entire default theme to the current folder, you can modify the entire default theme.

Refer to:

[Custom Themes](./theme)
