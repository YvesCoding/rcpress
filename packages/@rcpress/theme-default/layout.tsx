import React, { useEffect, useState } from 'react';
import './assets/style';
import Header from './layout/header';
import { BackTop } from 'antd';
import MainContent from './layout/main-content';
import { useSiteContext } from '@rcpress/core';
import Media from 'react-media';

const chekScrollPosition = (
  path: string,
  prePath: string,
  setPath: (path: string) => void
) => {
  if (!window.location.hash && path && path !== prePath) {
    window.scrollTo(0, 0);
    setPath(path);
  } else if (window.location.hash) {
    const element = document.getElementById(
      decodeURIComponent(
        window.location.hash.replace('#', '')
      )
    );
    setTimeout(() => {
      if (element) {
        element.scrollIntoView(true);
      }
    }, 100);
  }
};

const Layout = () => {
  const siteContext = useSiteContext();
  const {
    currentLocaleSiteData: siteData,
    path
  } = siteContext;

  const [prePath, setPrePath] = useState();

  const { showBackToTop } = siteData.themeConfig;
  const { locales } = siteData;

  useEffect(() => {
    chekScrollPosition(path, prePath, setPrePath);
  }, [path]);

  return (
    <Media query="(max-width: 996px)">
      {smallScreen => {
        const isMobile =
          smallScreen && typeof window !== `undefined`;
        return (
          <div
            className={`page-wrapper ${((!locales &&
              path == '/') ||
              (locales &&
                Object.keys(locales).includes(path))) &&
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
};

export default Layout;
