var path = require('path');

exports.onCreateWebpackConfig = ({ stage, actions, loaders }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, '.antdsite/components')
      }
    }
  });
};

var a = {
  dependencies: {
    antdsite: '^0.0.7',
    gatsby: '^2.13.39',
    react: '^16.8.0',
    'react-dom': '^16.8.0'
  },
  scripts: {
    build: 'npm run clean && gatsby build',
    start: 'npm run clean && gatsby develop',
    clean: 'gatsby clean'
  }
};
