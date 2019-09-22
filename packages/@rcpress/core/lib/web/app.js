import('@temp/style.less');
import 'regenerator-runtime/runtime';
import 'core-js/stage/3';
import { getcurrentLocaleConfigByPath, resolveSidebarItems, getCurrentPage } from './util';
import { MDXProvider } from '@mdx-js/react';
import globalComponent from '@globalComp';
import createInternalGlobalComponent from './internalGlobalComponent';

import React, { useContext, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { routes } from '@temp/routes';
import { siteData } from '@temp/siteData';

import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

// suggest dev server restart on base change
if (module.hot) {
  const prevBase = siteData.base;
  module.hot.accept('../../.temp/siteData', () => {
    if (siteData.base !== prevBase) {
      window.alert(
        `[rcpress] Site base has changed. ` +
          `Please restart dev server to ensure correct asset paths.`
      );
    }
  });
}

const SiteContext = React.createContext({
  siteData: {},
  path: '',
  currentLocate: undefined,
  currentLocaleSiteData: {},
  currentPageSidebarItems: {},
  allPagesSidebarItems: {},
  currentPageInfo: {}
});
export { SiteContext };

export function createApp(opts) {
  return () => {
    const [path, setPath] = useState('/');
    const { currentLocaleSiteData, targetLocale } = getcurrentLocaleConfigByPath(siteData, path);
    const sidebarItems = resolveSidebarItems(siteData, path);

    const currentPageInfo = getCurrentPage(siteData.pages, routes, path);

    return (
      <SiteContext.Provider
        value={{
          currentLocate: targetLocale,
          siteData,
          path,
          currentLocaleSiteData,
          ...sidebarItems,
          currentPageInfo
        }}
      >
        <MDXProvider
          components={{
            ...globalComponent,
            ...createInternalGlobalComponent(SiteContext)
          }}
        >
          <Switch>
            {routes.map((route, index) => {
              if (route.redirect) {
                return (
                  <Route key={index} {...route} render={() => <Redirect to={route.redirect} />} />
                );
              }
              const Comp = route.route_component;
              return (
                <Route
                  key={index}
                  {...route}
                  render={props => {
                    if (path != props.match.path) {
                      setPath(props.match.path);
                    }
                    return <Comp {...props} />;
                  }}
                />
              );
            })}
          </Switch>
        </MDXProvider>
      </SiteContext.Provider>
    );
  };
}

const components = React.createContext({});
export { components };

const useSiteContext = () => {
  return useContext(SiteContext);
};

export { useSiteContext };
