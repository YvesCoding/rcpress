const { isFunction, isString, isArray } = require('lodash');
const visit = require('unist-util-visit');
const { withPathPrefix, logger } = require('@rcpress/util');

module.exports.unifiedPlugins = plugins =>
  plugins.map(p => {
    if (!isArray(p)) {
      p = [p];
    }
    p[0] = isString(p[0]) ? require(p[0]) : p[0];

    return p;
  });

module.exports.reamrk2mdast = async function reamrk2mdast({
  remarkPlugins,
  pathPrefix
}) {
  let pathPlugin = undefined;
  if (pathPrefix && pathPrefix != '/') {
    pathPlugin = () =>
      async function transformer(markdownAST) {
        // Ensure relative links include `pathPrefix`
        visit(markdownAST, `link`, node => {
          if (
            node.url &&
            node.url.startsWith(`/`) &&
            !node.url.startsWith(`//`)
          ) {
            // TODO: where does withPathPrefix
            node.url = withPathPrefix(node.url, pathPrefix);
          }
        });
        return markdownAST;
      };
  }

  // return list of remarkPlugins
  const userPlugins = remarkPlugins
    .filter(plugin => {
      if (isFunction(plugin[0])) {
        return true;
      } else {
        return false;
      }
    })
    .map(plugin => {
      const requiredPlugin = plugin[0];
      const wrappedPlugin = () =>
        function transformer(markdownAST) {
          requiredPlugin(
            {
              markdownAST,
              pathPrefix
            },
            plugin.options || {}
          );

          return markdownAST;
        };

      return [wrappedPlugin, {}];
    });

  if (pathPlugin) {
    return [pathPlugin, ...userPlugins];
  } else {
    return [...userPlugins];
  }
};
