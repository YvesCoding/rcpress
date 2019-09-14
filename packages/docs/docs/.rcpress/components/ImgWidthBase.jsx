import React from 'react';
import { SiteContext } from '@rcpress/core';

const resolvePathWithBase = (p1, p2) => {
  return (p1 + p2).replace(/\/\//g, '/');
};

export default ({ url, width, height, ...rest }) => (
  <SiteContext.Consumer>
    {ctx => {
      return (
        <img
          {...rest}
          src={resolvePathWithBase(url, ctx.siteData.base)}
          width={width}
          height={height}
        />
      );
    }}
  </SiteContext.Consumer>
);
