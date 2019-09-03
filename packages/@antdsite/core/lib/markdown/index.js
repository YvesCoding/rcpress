const grayMatter = require(`gray-matter`);
const mdx = require(`@mdx-js/mdx`);
const generateTOC = require(`mdast-util-toc`);
const { deepMerge } = require('@antdsite/util');
const path = require('path');
const toString = require(`mdast-util-to-string`);

const resolvePlugin = plugins =>
  plugins.map(plugin => path.resolve(__dirname, `./reamarkPlugins/${plugin}`));

/**
 * @returns html, toc, frontMatter, headings
 * @param {*} mdContent mdx content
 */
const genMarkdownInfo = options => {
  const defaultOptions = {
    maxTocDepth: 3,
    remarkPlugins: [
      resolvePlugin([
        'gatsby-remark-ant-alert',
        'remark-default-class-name',
        'remark-header-custom-ids',
        'remark-img-warpper-p'
      ])
    ]
  };
  options = deepMerge(options, defaultOptions);

  return async rawMDX => {
    let results = {
      html: '',
      toc: [],
      headings: [],
      frontMatter: {}
    };

    const { data, content: frontMatterCodeResult } = grayMatter(rawMDX);
    const content = `${frontMatterCodeResult}`;
    const compiler = mdx.createMdxAstCompiler(options);
    const mdast = compiler.parse(content);

    // frontmatter
    results.frontMatter = data;

    // toc
    results.toc = generateTOC(mdast, { maxDepth: options.maxTocDepth });

    // headings
    visit(mdast, `heading`, heading => {
      results.headings.push({
        value: toString(heading),
        depth: heading.depth
      });
    });

    return results;
  };
};
