const mdx = require(`@mdx-js/mdx`);
const generateTOC = require(`mdast-util-toc`);
const { deepMerge, emoji, parseFrontmatter } = require('@rcpress/util');
const toString = require(`mdast-util-to-string`);
const { unifiedPlugins, reamrk2mdast } = require('./util');
const path = require('path');
const visit = require('unist-util-visit');
const LRU = require('lru-cache');
const hash = require('hash-sum');

/**
 * @returns html, toc, frontMatter, headings
 * @param {*} mdContent mdx content
 */
const createMarkdown = async ({ markdown: options = {}, base = '/' }) => {
  const cache = new LRU({ max: 1000 });
  const resolvePlugin = (plugins, dirName) =>
    plugins.map(plugin => [
      require(path.resolve(
        __dirname,
        `./${dirName}/${Array.isArray(plugin) ? plugin[0] : plugin}`
      )),
      plugin[1]
    ]);

  const defaultOptions = {
    maxTocDepth: 3,
    mdastPlugins: resolvePlugin(
      [
        'remark-default-class-name',
        'remark-header-custom-ids',
        'remark-img-warpper-p',
        'remark-emoji',
        'reamrk-prism'
      ],
      'mdastPlugins'
    ),
    remarkPlugins: resolvePlugin(
      [
        [
          'remark-ant-alert',
          {
            info: [
              {
                alias: 'tip',
                defaultTitle: 'Tip'
              },
              {
                alias: 'tip-zh',
                defaultTitle: '提示'
              }
            ],
            warning: [
              {
                alias: 'warning',
                defaultTitle: 'Warning'
              },
              {
                alias: 'warning-zh',
                defaultTitle: '警告'
              }
            ],
            error: [
              {
                alias: 'error',
                defaultTitle: 'Caveat'
              },
              {
                alias: 'error-zh',
                defaultTitle: '严重警告'
              }
            ]
          }
        ]
      ],
      'remarkPlugins'
    )
  };

  options = deepMerge(defaultOptions, options);

  options.remarkPlugins = [
    ...unifiedPlugins(options.remarkPlugins || []),
    ...(await reamrk2mdast({
      remarkPlugins: unifiedPlugins(options.mdastPlugins || []),
      // add prefix in link of markdown
      pathPrefix: base
    }))
  ];

  const compiler = mdx.createMdxAstCompiler(options);

  const md = rawMDX => {
    const key = hash(rawMDX);
    const cached = cache.get(key);
    if (cached) return cached;

    let results = {
      toc: [],
      headings: [],
      frontMatter: {}
    };

    const { content: frontMatterCodeResult } = (results.frontMatter = parseFrontmatter(rawMDX));
    const content = `${frontMatterCodeResult}`;
    const mdast = compiler.parse(content);

    // toc
    results.toc = getItems(generateTOC(mdast, { maxDepth: options.maxTocDepth }).map, {});

    // headings
    visit(mdast, `heading`, heading => {
      results.headings.push({
        value: toString(heading),
        depth: heading.depth
      });
    });

    cache.set(key, results);

    return results;
  };
  md.render = input => {
    const key = hash(input + '__raw__');
    const cached = cache.get(key);
    if (cached) return cached;

    const res = mdx.sync(input, options);
    cache.set(key, res);
    return res;
  };

  return md;
};

module.exports = createMarkdown;

function getItems(node, current) {
  if (!node) {
    return {};
  } else if (node.type === 'paragraph') {
    visit(node, item => {
      if (item.type === 'link') {
        current.url = item.url;
      }
      if (item.type === 'text') {
        current.title = emoji(item.value);
      }
    });
    return current;
  } else {
    if (node.type === 'list') {
      current.items = node.children.map(i => getItems(i, {}));
      return current;
    } else if (node.type === 'listItem') {
      const heading = getItems(node.children[0], {});
      if (node.children.length > 1) {
        getItems(node.children[1], heading);
      }
      return heading;
    }
  }
  return {};
}
