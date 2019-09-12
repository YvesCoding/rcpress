import('@temp/style.less');
import 'regenerator-runtime/runtime';
import 'core-js/stage/3';
import {
  getcurrentLocaleConfigByPath,
  resolveSidebarItems
} from './util';

import React from 'react';
import {
  Route,
  Switch,
  withRouter,
  Redirect
} from 'react-router-dom';

import { routes } from '@temp/routes';
import { siteData } from '@temp/siteData';

// suggest dev server restart on base change
if (module.hot) {
  const prevBase = siteData.base;
  module.hot.accept('./.temp/siteData', () => {
    if (siteData.base !== prevBase) {
      window.alert(
        `[rcpress] Site base has changed. ` +
          `Please restart dev server to ensure correct asset paths.`
      );
    }
  });
}

const PageContext = React.createContext({
  siteData: {},
  path: '',
  currentLocaleSiteData: {},
  currentPageSidebarItems: {},
  allPagesSidebarItems: {},
  currentPageInfo: {},
  currentPageContent: {},
  isWebsiteHome: false
});
export { PageContext };

export function createApp() {
  return withRouter(props => {
    const path = props.match.path;
    const {
      currentLocaleSiteData
    } = getcurrentLocaleConfigByPath(siteData, path);

    const sidebarItems = resolveSidebarItems(
      siteData,
      path
    );

    return (
      <PageContext.Provider
        value={{
          siteData,
          path,
          currentLocaleSiteData,
          ...sidebarItems,
          currentPageInfo: {}
        }}
      >
        <Switch>
          {routes.map((route, index) => {
            if (route.redirect) {
              return (
                <Route
                  key={index}
                  {...route}
                  render={() => (
                    <Redirect to={route.redirect} />
                  )}
                />
              );
            }
            return <Route key={index} {...route} />;
          })}
        </Switch>
      </PageContext.Provider>
    );
  });
}

const components = React.createContext({});
export { components };
