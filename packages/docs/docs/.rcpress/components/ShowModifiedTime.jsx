import React from 'react';
import moment from 'moment';
import { SiteContext } from '@rcpress/core';

export const ShowTime = () => {
  return (
    <SiteContext.Consumer>
      {context => {
        return (
          <div className="modifiedTime modifiedTimeLeft">
            {context.currentLocaleSiteData.themeConfig.lastUpdated}{' '}
            {moment(context.currentPageInfo.lastUpdated).format('YYYY-MM-DD HH:mm:SS')}
          </div>
        );
      }}
    </SiteContext.Consumer>
  );
};
