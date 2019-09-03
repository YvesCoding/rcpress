const { selectAll } = require('unist-util-select');

module.exports = ({ markdownAST }) => {
  // `heading` is equivalent to `h1...h6` in markdown.
  // specify [depth] allow us to target the right heading tag.
  // selectAll equals to document.querySelectorAll
  const processNodes = selectAll('heading, listItem', markdownAST);

  processNodes.forEach(node => {
    if (!node.data) node.data = {};

    node.data.hProperties = node.data.hProperties || {};
    node.data.hProperties.className = node.data.hProperties.className || '';
    node.data.hProperties.className += '__internal';
  });
};
