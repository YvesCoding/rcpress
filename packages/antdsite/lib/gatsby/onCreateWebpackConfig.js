module.exports = ({ stage, actions, loaders, getConfig }) => {
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
