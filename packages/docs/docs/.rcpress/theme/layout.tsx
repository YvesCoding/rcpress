import React from 'react';
import { BackTop } from 'antd';
import '@default-theme/assets/style';
import Header from '@default-theme/layout/header';
import MainContent from '@default-theme/layout/main-content';
import { PageContext } from '@app';
import './hide-statistical-script.less';

export interface LayoutProps {
  isMobile: boolean;
}

interface LayoutState {}

export default class Layout extends React.Component<
  LayoutProps,
  LayoutState
> {
  static contextType = PageContext;

  constructor(props: LayoutProps) {
    super(props);
  }

  preSlug: String;

  render() {
    const {
      currentLocaleSiteData: siteData,
      path,
      isWebsiteHome
    } = this.context;
    const { showBackToTop } = siteData.themeConfig;
    const { locales } = siteData;

    return (
      <div
        className={`page-wrapper ${((!locales &&
          path == '/') ||
          (locales &&
            Object.keys(locales).includes(path))) &&
          'index-page-wrapper'}`}
      >
        <Header {...this.props} />
        <MainContent
          {...this.props}
          isWebsiteHome={isWebsiteHome}
        />
        {showBackToTop ? <BackTop /> : null}
      </div>
    );
  }

  componentDidMount() {
    this.chekScrollPosition(this.context.path);
  }

  componentDidUpdate() {
    this.chekScrollPosition(this.context.path);
  }

  chekScrollPosition(path?: string) {
    if (
      !window.location.hash &&
      path &&
      path !== this.preSlug
    ) {
      window.scrollTo(0, 0);
      this.preSlug = path;
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
  }
}
