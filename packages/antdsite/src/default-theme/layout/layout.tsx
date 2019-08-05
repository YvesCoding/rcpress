import React from 'react';
import ReactDom from 'react-dom';
import '../assets/style';
import Header from 'antdsite-header';
import Footer from 'antdsite-footer';
import { BackTop } from 'antd';
import { IAllMdxData, IMdxData } from '../../templates';
import MainContent from 'antdsite-main-content';
import HomePage from 'antdsite-home';
import { PageContext } from 'antdsite';

export interface LayoutProps {
  pageContext: {
    webConfig: any;
    slug: string;
    isWebsiteHome: boolean;
  };
  data: {
    mdx: IMdxData;
    allMdx: IAllMdxData;
  };
  isMobile: boolean;
}

interface LayoutState {}

export default class Layout extends React.Component<LayoutProps, LayoutState> {
  static contextType = PageContext;

  constructor(props: LayoutProps) {
    super(props);
  }

  preSlug: String;

  render() {
    const { currentLocaleWebConfig: webConfig, slug, isWebsiteHome } = this.context;

    const { showBackToTop } = webConfig.themeConfig;
    const { locales, footer: footerText } = webConfig;

    const footer = <Footer footeText={footerText} ref="footer" />;

    return (
      <div
        className={`page-wrapper ${((!locales && slug == '/') ||
          (locales && Object.keys(locales).includes(slug))) &&
          'index-page-wrapper'}`}
      >
        <Header {...this.props} ref="header" />
        <div ref="content">
          {isWebsiteHome ? (
            <HomePage {...this.props} />
          ) : (
            <MainContent {...this.props} footer={footer} />
          )}
        </div>

        {isWebsiteHome ? footer : null}
        {showBackToTop ? <BackTop /> : null}
      </div>
    );
  }

  componentDidMount() {
    this.ajustContentHeight();
    this.chekScrollPosition(this.context.slug);
    window.addEventListener('resize', this.ajustContentHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.ajustContentHeight);
  }

  componentDidUpdate() {
    this.chekScrollPosition(this.context.slug);
    this.ajustContentHeight();
  }

  ajustContentHeight = () => {
    const contentDom = ReactDom.findDOMNode(this.refs.content) as HTMLDivElement;
    const header = ReactDom.findDOMNode(this.refs.header) as HTMLDivElement;
    const footer = ReactDom.findDOMNode(this.refs.footer) as HTMLDivElement;
    if (!contentDom) return;

    contentDom.style.minHeight =
      window.innerHeight -
      (header ? header.offsetHeight : 0) -
      (footer ? footer.offsetHeight : 0) +
      'px';
  };

  chekScrollPosition(slug?: string) {
    if (!window.location.hash && slug && slug !== this.preSlug) {
      window.scrollTo(0, 0);
      this.preSlug = slug;
    } else if (window.location.hash) {
      const element = document.getElementById(
        decodeURIComponent(window.location.hash.replace('#', ''))
      );
      setTimeout(() => {
        if (element) {
          element.scrollIntoView(true);
        }
      }, 100);
    }
  }
}
