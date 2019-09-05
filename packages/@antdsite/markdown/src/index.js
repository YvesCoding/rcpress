const grayMatter = require(`gray-matter`);
const mdx = require(`@mdx-js/mdx`);
const generateTOC = require(`mdast-util-toc`);
const { deepMerge, emoji } = require('@antdsite/util');
const toString = require(`mdast-util-to-string`);
const { unifiedPlugins, reamrk2mdast } = require('../util')
const path = require("path")
const visit = require("unist-util-visit");

/**
 * @returns html, toc, frontMatter, headings
 * @param {*} mdContent mdx content
 */
const createMarkdown = async ({ markdown: options = {}, base = "/" }) => {
  const resolvePlugin = (plugins, dirName) =>
    plugins.map(plugin => require(path.resolve(__dirname, `./${dirName}/${plugin}`)));

  const defaultOptions = {
    maxTocDepth: 3,
    mdastPlugins: resolvePlugin([
      'remark-default-class-name',
      'remark-header-custom-ids',
      'remark-img-warpper-p',
      'remark-emoji'
    ], "mdastPlugins"),
    remarkPlugins: resolvePlugin([
      'gatsby-remark-ant-alert'
    ], "remarkPlugins")
  };

  options = deepMerge(defaultOptions, options);

  options.remarkPlugins = [...unifiedPlugins(options.remarkPlugins), ...await reamrk2mdast({
    remarkPlugins: unifiedPlugins(options.mdastPlugins),
    pathPrefix: base
  })]

  const compiler = mdx.createMdxAstCompiler(options);

  const md = rawMDX => {
    let results = {
      toc: [],
      headings: [],
      frontMatter: {}
    };

    const { content: frontMatterCodeResult } = (results.frontMatter = grayMatter(rawMDX));
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
    return results;
  };
  md.render = input => mdx.sync(input);

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
