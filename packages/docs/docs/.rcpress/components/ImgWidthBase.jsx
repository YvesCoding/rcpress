import React from 'react';
import { SiteContext } from '@rcpress/core';
import { resolvePathWithBase } from 'rcpress/src/default-theme/components/utils';

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
