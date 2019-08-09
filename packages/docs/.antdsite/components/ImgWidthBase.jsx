import React from 'react';
import { PageContext } from 'antdsite';

export default ({ url, width }) => (
  <PageContext.Consumer>
    {ctx => {
      return <img src={`${ctx.webConfig.base}${url}`} width={width} />;
    }}
  </PageContext.Consumer>
);
