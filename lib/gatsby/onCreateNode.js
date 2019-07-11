/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable no-multi-assign */
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const himalaya = require('himalaya');
var { themeConfig, base } = require('../util').getFinalConfig();

// // 获取用户的头像列表
const getAvatarList = async filename => {
  const sourcePath = `https://github.com/${themeConfig.docsRepo || themeConfig.repo}/contributors/${
    themeConfig.docsBranch
  }`;
  const url = `${sourcePath}${filename}/list`;
  const html = await fetch(url).then(res => res.text());
  const ast = himalaya.parse(html)[0].children || [];
  const data = ast
    .map(item => {
      if (item.type === 'element') {
        const AlinkAST = item.children[1];
        const href = AlinkAST.attributes.find(({ key }) => key === 'href').value;
        const img = AlinkAST.children[1];
        const text = AlinkAST.children[2].content;
        const src = img.attributes.find(({ key }) => key === 'src').value;
        return {
          href,
          text,
          src,
        };
      }
      return null;
    })
    .filter(item => item && item.src);
  return data;
};

function withBase(_path) {
  return (base + _path).replace(/\/\//g, '/');
}

// Add custom fields to MarkdownRemark nodes.
module.exports = exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  switch (node.internal.type) {
    case 'Mdx':
      const { relativePath, sourceInstanceName } = getNode(node.parent);

      let slug;
      const filePath = node.fileAbsolutePath; // path.join(process.cwd(), sourceInstanceName, relativePath);
      const stats = fs.statSync(filePath);
      const mtime = new Date(stats.mtime).getTime();
      const mdFilePath = path.join(sourceInstanceName, relativePath);
      createNodeField({
        node,
        name: `modifiedTime`,
        value: mtime,
      });

      slug = `${relativePath.replace(/(readme)?\.mdx?/i, '')}`;
      if (!slug.startsWith('/')) {
        slug = '/' + slug;
      }

      createNodeField({
        node,
        name: 'slug',
        value: withBase(slug),
      });

      createNodeField({
        node,
        name: 'path',
        value: mdFilePath,
      });

    // const html = await getAvatarList(mdFilePath);
    // createNodeField({
    //   node,
    //   name: 'avatarList',
    //   value: html,
    // });
  }
};
