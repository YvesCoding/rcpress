# Quick Start

## Install

Install `@rcpress/cli` via [yarn](https://yarnpkg.com)

```bash
yarn global add @rcpress/cli
```

Or install via [npm](https://docs.npmjs.com/cli/install.html)

```bash
npm install @rcpress/cli -g
```

## Usage

Create diretory and markdown file

```bash
# create docs diretory(docs is the default documentation directory)
mkdir docs

# create a markdown file
echo '# Hello RcPress' > docs/README.md

```

Run server

```bash
# start spa mode server
rcpress dev
# start ssr mode server
rcpress server

# Visit the default address `localhost:3000` to see the effect page
```

Build

```bash
# build spa in production
rcpress build
# build ssr and generate static html files in production
rcpress generate
```

## Project Structure

RcPress follows the same principle with Vuepress, which is **"Convention is better than configuration"**, the recommended document structure is as follows:

```bash{numberLines:true}
├── docs # store the document directory
    ├── .rcpress
        ├── globalComponent.js # used to store global components which you can use them directly in markdown.
        ├── config.js # rcpress configuration file
        ├── style.less # rcpress global style
        ├── public # Used to store some static files of the website, which can be directly accessed: eg: www.xxx.com/favicon.png
        ├── theme
            ├── Layout.(t|j)sx? # override the default theme.
    ├── guide
        ├── README.MD
    ├── README.MD
├── package.json
```

Let's briefly explain the configuration file of the initialization project:

```js
module.exports = {
  // Website title, you can not set, the default is the directory name of the document
  title: 'my-docs',
  // Site description, used to generate a description of the seo search and home page.
  description: 'My first rcpress app',
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
        link: 'https://github.com/YvesCoding/rcpress',
        important: true
      }
    ],
    sidebar: {
      // Note the point.
      // The set property name must be the file/directory that exists in your document directory (default is docs)
      // The physical path of the rcpress lookup file is: docs (the document directory you set) + the key name in the sidebar
      // For example, the physical path corresponding to /guide/ below is docs/guide/
      '/guide/': [
        // Corresponding physical path: docs/guide/introduction.md
        // Since the frontMatter setting home is true, the access path does not have introduction, direct /guide/
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
