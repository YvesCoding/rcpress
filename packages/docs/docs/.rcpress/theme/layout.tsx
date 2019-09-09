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
      currentLocaleWebConfig: siteData,
      slug,
      isWebsiteHome
    } = this.context;
    const { showBackToTop } = siteData.themeConfig;
    const { locales } = siteData;

    return (
      <div
        className={`page-wrapper ${((!locales &&
          slug == '/') ||
          (locales &&
            Object.keys(locales).includes(slug))) &&
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
    this.chekScrollPosition(this.context.slug);
  }

  componentDidUpdate() {
    this.chekScrollPosition(this.context.slug);
  }

  chekScrollPosition(slug?: string) {
    if (
      !window.location.hash &&
      slug &&
      slug !== this.preSlug
    ) {
      window.scrollTo(0, 0);
      this.preSlug = slug;
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
