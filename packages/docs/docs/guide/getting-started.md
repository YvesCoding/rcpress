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

##Create an initial project using cli

Use `cli` to initialize a default initial project

```Celebration
Antdsite my-docs
```

Initialize in an existing project

```Celebration
Antdsite ./-force
```

After the initialization is complete, switch to the initialized directory and run the website.

```Celebration
Yarn start
# 或
Start with npm
```

Visit the default address `localhost:8000` to see the effect page

## Project Structure

After initialization you will see the following directory:

```bash{numberLines:true}
├── .antdsite
    ├── config.js # antdsite configuration file
├── docs # store the document directory
    ├── guide
        ├── introduction.md
        ├── page-collapsed.md
        ├── group-1-item.md
        ├── group-2-item.md
    ├── README.MD
├── src # is mainly used to store 404 pages, put under src/pages because only this directory can be recognized by gatsby
    ├── pages
        ├── 404.js
        ├── 404.css
├── static # Used to store some static files of the website, which can be directly accessed: eg: www.xxx.com/favicon.png
    ├── favicon.png # Used to store website logo
├── package.json # mainly contains devDependencies dependencies: antdsite and gatsby
├── gatsby-config.js # gatsby configuration file, configured, no need to change.
```

Let's briefly explain the configuration file of the initialization project:

```js
module.exports = {
  // Website title, you can not set, the default is the directory name of the document
  title: 'my-docs',
  // Site description, used to generate a description of the seo search and home page.
  description: 'My first antdsite app',
  // Generally shown on the front page and top left corner
  logo: '/favicon.png',
  // The text at the bottom of the home page supports html format
  footer: 'MIT Licensed | Copyright © 2019-present Yi(Yves) Wang',
  // Each element in the format is [tagName, {/* element attribute, which will be attached to the generated element as it is. */}, /* child node */]
  // some elements that will be inserted into the head of the site when the site is generated,
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  themeConfig: {
    // The website header link can be set to important and will be displayed in red.
    nav: [
      {
        text: 'Guide',
        link: '/guide'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/YvesCoding/antdsite',
        important: true
      }
    ],
    sidebar: {
      // Note the point.
      // The set property name must be the file/directory that exists in your document directory (default is docs)
      // The physical path of the antdsite lookup file is: docs (the document directory you set) + the key name in the sidebar
      // For example, the physical path corresponding to /guide/ below is docs/guide/
      '/guide/': [
        // Corresponding physical path: docs/guide/introduction.md
        // Since the frontmatter setting home is true, the access path does not have introduction, direct /guide/
        'introduction',
        {
          title: 'page-collapsed',
          children: ['page-collapsed']
        },
        {
          title: 'page-group-exapmle',
          // The secondary menu is collapsed by default, and false is set to default expansion.
          collapsable: false,
          children: [
            // You can set a deeper menu and support up to two layers.
            // See the effect after running the initialization project
            {
              // Set the level 3 menu title
              title: 'group-1',
              // Corresponding physical path: docs/guide/group-1-item.md
              children: ['group-1-item']
            },
            {
              title: 'group-2',
              // Corresponding physical path: docs/guide/group-2-item.md
              children: ['group-2-item']
            }
          ]
        }
      ]
    }
  }
};
```

Relevant information:

- For detailed configuration file description, please refer to: [Configuration section](../config)

- If you want to customize the head, foot, or home page, etc., please refer to [custom theme](theme)

## Screenshots

import ImgWidthBase from '@components/ImgWidthBase'

<p align="center">
<ImgWidthBase url="screenshot.png" width={700}/>  
</p>

<p align="center">
<ImgWidthBase url="screenshot-1.png" width={700}/>
</p>
