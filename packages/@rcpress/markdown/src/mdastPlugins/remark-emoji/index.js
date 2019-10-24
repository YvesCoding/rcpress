const { emoji } = require('@rcpress/util');
const visit = require('unist-util-visit');

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'text', function(node) {
    node.value = emoji(node.value);
  });
};
