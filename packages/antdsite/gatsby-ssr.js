const React = require('react');
const config = require('./.cache/finalConfig');

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  if (config.useCNDForLargeFiles) {
    const headComponents = getHeadComponents() || [];
    const fileList = config.largeFileList;
    // sort by order desc
    fileList.sort((a, b) => {
      return b.order - a.order;
    });

    fileList.forEach(file => {
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
