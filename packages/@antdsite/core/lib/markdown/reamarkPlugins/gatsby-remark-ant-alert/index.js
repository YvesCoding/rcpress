const remarkCustomBlocks = require(`./custom-blocks`);

module.exports.setParserPlugins = options => {
  return [[remarkCustomBlocks, options]];
};
