var path = require('path');

function resolve(pn) {
  return path.resolve(__dirname, pn);
}

exports.createPages = require(resolve('./lib/gatsby/createPages'));
exports.onCreateNode = require(resolve('./lib/gatsby/onCreateNode'));
exports.onCreatePage = require(resolve('./lib/gatsby/onCreatePage'));
exports.onCreateWebpackConfig = require(resolve('./lib/gatsby/onCreateWebpackConfig'));
exports.createSchemaCustomization = require(resolve('./lib/gatsby/createSchemaCustomization'));
