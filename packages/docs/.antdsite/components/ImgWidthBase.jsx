import React from 'react';
import { PageContext } from 'antdsite';
import { resolvePathWithBase } from 'antdsite/src/default-theme/components/utils';

export default ({ url, width, height }) => (
  <PageContext.Consumer>
    {ctx => {
      return (
        <img src={resolvePathWithBase(url, ctx.webConfig.base)} width={width} height={height} />
      );
    }}
  </PageContext.Consumer>
);
