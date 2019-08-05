const { resolveLayouts, setThemeColors } = require('../util');

module.exports = ({ stage, actions, loaders }) => {
  resolveLayouts(actions);
  setThemeColors(actions);

  if (stage === 'develop') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-hot-loader/,
            use: [loaders.js()]
          }
        ]
      }
    });
  }
};
