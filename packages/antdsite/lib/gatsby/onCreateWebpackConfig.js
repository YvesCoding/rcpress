const { resolveLayouts, setThemeColors, getFinalConfig } = require('../util');
const largeFileList = require('../large-file-list');
const config = getFinalConfig();

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

  if (config.useCNDForLargeFiles && stage !== 'build-html') {
    const externals = {};
    largeFileList.forEach(file => {
      externals[file.name] = file.umdName;
    });

    actions.setWebpackConfig({
      externals
    });
  }
};
