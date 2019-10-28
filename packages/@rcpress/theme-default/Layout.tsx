import React, { useEffect, useState } from 'react';
import './assets/style';
import Header from './layout/header';
import { BackTop } from 'antd';
import MainContent from './layout/main-content';
import { useSiteContext } from '@rcpress/core';
import Media from 'react-media';
import stepNProcess from './components/nprocess';
import NProgress from 'nprogress';
import { withRouter } from 'react-router';

const chekScrollPosition = (path: string, prePath: string, setPrePath: (path: string) => void) => {
  if (!window.location.hash && path && path !== prePath) {
    window.scrollTo(0, 0);
    setPrePath(path);

    return;
  }

  tryScrollToHash();
};

function tryScrollToHash() {
  if (!window.location.hash) return;
  setTimeout(() => {
    const element = document.getElementById(
      decodeURIComponent(window.location.hash.replace('#', ''))
    );
    if (element) {
      element.scrollIntoView(true);
    }
  }, 100);
}

const Layout = withRouter((props: any) => {
  const siteContext = useSiteContext();
  const { currentLocaleSiteData: siteData, path } = siteContext;

  const [prePath, setPrePath] = useState();

  const { showBackToTop } = siteData.themeConfig;
  const { locales } = siteData;

  useEffect(() => {
    function handeLocationChange({ pathname }: any) {
      if (pathname == path) {
        tryScrollToHash();
        return;
      }

      NProgress.start();
      NProgress.set(0.6);
    }

    chekScrollPosition(path, prePath, setPrePath);
    NProgress.done(true);

    return props.history.listen(handeLocationChange);
  }, [path]);

  stepNProcess();

  return (
    <Media query="(max-width: 996px)">
      {smallScreen => {
        const isMobile = smallScreen && typeof window !== `undefined`;
        return (
          <div
            className={`page-wrapper ${((!locales && path == '/') ||
              (locales && Object.keys(locales).includes(path))) &&
              'index-page-wrapper'}`}
          >
            <Header isMobile={isMobile} />
            <MainContent isMobile={isMobile} />
            {showBackToTop ? <BackTop /> : null}
          </div>
        );
      }}
    </Media>
  );
});

export default Layout;
