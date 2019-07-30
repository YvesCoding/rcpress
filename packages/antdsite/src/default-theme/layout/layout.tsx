import React from 'react';
import ReactDom from 'react-dom';
import '../assets/style';
import Header from 'antdsite-header';
import Footer from 'antdsite-footer';
import { BackTop } from 'antd';
import { IAllMdxData, IMdxData } from '../../templates';
import MainContent from 'antdsite-main-content';
import HomePage from 'antdsite-home';

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
  constructor(props: LayoutProps) {
    super(props);
  }

  render() {
    const { children, pageContext, ...restProps } = this.props;
    const { webConfig, slug, isWebsiteHome } = pageContext;
    const { locales } = webConfig;
    const { showBackToTop } = webConfig.themeConfig;

    return (
      <div
        className={`page-wrapper ${((!locales && slug == '/') ||
          (locales && Object.keys(locales).includes(slug))) &&
          'index-page-wrapper'}`}
      >
        <Header {...restProps} ref="header" />
        <div ref="content">
          {isWebsiteHome ? <HomePage {...restProps} /> : <MainContent {...restProps} />}
        </div>

        <Footer {...restProps} ref="footer" />
        {showBackToTop ? <BackTop /> : null}
      </div>
    );
  }

  componentDidMount() {
    this.ajustContentHeight();
    window.addEventListener('resize', this.ajustContentHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.ajustContentHeight);
  }

  componentDidUpdate() {
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
}
