import('@temp/style.less');
import 'regenerator-runtime/runtime';
import 'core-js/stage/3';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

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

const PageContext = React.createContext({});
export { PageContext };

const components = React.createContext({});
export { components };

export function createApp() {
  console.log(routes);

  return (
    <PageContext.Provider
      value={{
        routes,
        siteData
      }}
    >
      <Switch>
        {routes.map(route => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
    </PageContext.Provider>
  );
}
