const visit = require("unist-util-visit");


// ensure only one `/` in new url
const withPathPrefix = (url, pathPrefix) =>
  (pathPrefix + url).replace(/\/\//, `/`);

module.exports = async function reamrk2mdast({
  remarkPlugins,
  mdxNode,
  pathPrefix
}) {
  let pathPlugin = undefined;
  if (pathPrefix) {
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
      if (_.isFunction(require(plugin.resolve))) {
        return true;
      } else {
        debug("userPlugins: filtering out", plugin);
        return false;
      }
    })
    .map(plugin => {
      debug("userPlugins: contructing remark plugin for ", plugin);
      const requiredPlugin = require(plugin.resolve);
      const wrappedPlugin = () =>
        async function transformer(markdownAST) {
          await requiredPlugin(
            {
              markdownAST,
              markdownNode: mdxNode,
              getNode,
              files: fileNodes,
              pathPrefix,
              reporter,
              cache
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
