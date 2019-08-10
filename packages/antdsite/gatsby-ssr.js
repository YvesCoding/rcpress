const React = require('react');
const largeFileList = require('./lib/large-file-list');
const config = require('./.cache/finalConfig');

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  if (config.useCNDForLargeFiles) {
    const headComponents = getHeadComponents() || [];
    largeFileList.forEach(file => {
      headComponents.unshift(
        React.createElement('script', {
          type: 'text/javascript',
          src: file.cdnLink,
          key: file.cdnLink
        })
      );
    });
    replaceHeadComponents(headComponents);
  }
};
