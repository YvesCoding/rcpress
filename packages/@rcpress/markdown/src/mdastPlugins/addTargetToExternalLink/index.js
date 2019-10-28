const visit = require('unist-util-visit');

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'link', function(node) {
    if (node.url.startsWith('http')) {
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.target = node.data.hProperties.target || '_blank';
    }
  });
};
