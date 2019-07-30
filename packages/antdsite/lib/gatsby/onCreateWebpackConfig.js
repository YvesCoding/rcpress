const { resolveLayouts } = require('../util');

module.exports = ({ stage, actions, loaders }) => {
  resolveLayouts(actions);
  if (stage === 'develop') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-hot-loader/,
            use: [loaders.js()],
          },
        ],
      },
    });
  }
};
