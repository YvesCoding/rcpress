import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import store from './store';
import { routes } from '@temp/routes';
import { siteData } from '@temp/siteData';
// import enhanceApp from '@temp/enhanceApp';
// import themeEnhanceApp from '@temp/themeEnhanceApp';

// generated from user config
import('@temp/style.less');

// built-in components
// import Content from './components/Content';
// import OutboundLink from './components/OutboundLink.vue';
// import ClientOnly from './components/ClientOnly';

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
