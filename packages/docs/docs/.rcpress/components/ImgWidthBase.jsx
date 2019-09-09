import React from 'react';
import { PageContext } from '@app';
import { resolvePathWithBase } from 'rcpress/src/default-theme/components/utils';

export default ({ url, width, height, ...rest }) => (
  <PageContext.Consumer>
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
  </PageContext.Consumer>
);
