# Config File

## config.js

The website configuration file is named `config.js`, and `config.js`under the `antdsite` folder in the website root directory.

```bash
├── .antdsite
    ├── config.js
├── docs
├── package.json
```

## Basic configuration

`The basic config.js` configuration is as follows:

```js
module.exports = {
  title: 'my-docs',
  description: 'some descriptions...'
};
```

It needs to basically include a `title` and `description`. Detailed configuration can be referred to in the section [Configuration](/config/).

## Theme Configuration

A VuePress theme is responsible for all the layout and interactivity details of your site. VuePress ships with a default theme (you are looking at it right now) which is designed for technical documentation. It exposes a number of options that allow you to customize the navbar, sidebar and homepage, etc. For details, check out the [Default Theme Config](../default-theme-config) page.

If you wish to develop a custom theme, see [Custom Themes](./theme).
