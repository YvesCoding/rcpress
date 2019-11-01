import React from 'react';
import { SiteContext } from '@rcpress/core';

const resolvePathWithBase = (filePath, base) => {
  return (base + '/' + filePath).replace(/\/\//g, '/');
};

export default ({ url, width, height, ...rest }) => (
  <SiteContext.Consumer>
    {ctx => {
      return (
        <img
          {...rest}
          src={resolvePathWithBase(url, ctx.siteData.base || '/')}
          width={width}
          height={height}
        />
      );
    }}
  </SiteContext.Consumer>
);
