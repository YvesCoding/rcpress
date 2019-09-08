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

// global helper for adding base path to absolute urlls
// Vue.prototype.$withBase = function(path) {
//   const base = this.$site.base;
//   if (path.charAt(0) === '/') {
//     return base + path.slice(1);
//   } else {
//     return path;
//   }
// };

export function createApp() {
  return (
    <Switch>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  );

  // const router = new Router({
  //   base: siteData.base,
  //   mode: 'history',
  //   fallback: false,
  //   routes,
  //   scrollBehavior: (to, from, saved) => {
  //     if (saved) {
  //       return saved;
  //     } else if (to.hash) {
  //       if (store.disableScrollBehavior) {
  //         return false;
  //       }
  //       return {
  //         selector: to.hash
  //       };
  //     } else {
  //       return { x: 0, y: 0 };
  //     }
  //   }
  // });
  // // redirect /foo to /foo/
  // router.beforeEach((to, from, next) => {
  //   if (!/(\/|\.html)$/.test(to.path)) {
  //     next(
  //       Object.assign({}, to, {
  //         path: to.path + '/'
  //       })
  //     );
  //   } else {
  //     next();
  //   }
  // });
  // const options = {};
  // // themeEnhanceApp({ Vue, options, router, siteData })
  // // enhanceApp({ Vue, options, router, siteData })
  // const app = new Vue(
  //   Object.assign(options, {
  //     router,
  //     render(h) {
  //       return h('div', { attrs: { id: 'app' } }, [
  //         h('router-view', { ref: 'layout' })
  //       ]);
  //     }
  //   })
  // );
}
