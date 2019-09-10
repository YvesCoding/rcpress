import('@temp/style.less');
import 'regenerator-runtime/runtime';
import 'core-js/stage/3';

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

const components = React.createContext({});
export { components };

export function createApp() {
  return withRouter(props => {
    console.log(siteData);

    return (
      <PageContext.Provider
        value={{
          siteData,
          path: props.match.path,
          currentLocaleSiteData: {},
          currentPageSidebarItems: {},
          allPagesSidebarItems: {},
          currentPageInfo: {},
          currentPageContent: {},
          isWebsiteHome: false
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
