import React from 'react';
import ReactDom from 'react-dom';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Media from 'react-media';
import '../../static/style';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  pageContext: {
    webConfig: any;
    slug: string;
  };
  data: {
    mdx: {
      frontmatter: any;
    };
  };
  isMobile: boolean;
  children: React.ReactElement<LayoutProps>;
}

interface LayoutState {}

export class Layout extends React.Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);
  }

  render() {
    const {
      children,
      pageContext: { webConfig, slug },
      ...restProps
    } = this.props;

    const { locales } = webConfig;

    return (
      <LocaleProvider locale={enUS}>
        <div
          className={`page-wrapper ${((!locales && slug == '/') ||
            Object.keys(locales).includes(slug)) &&
            'index-page-wrapper'}`}
        >
          <Header pageContext={{ webConfig, slug }} {...restProps} ref="header" />
          {React.cloneElement(children, {
            ...children.props,
            isMobile: restProps.isMobile,
            ref: 'content',
          })}
          <Footer {...restProps} ref="footer" />
        </div>
      </LocaleProvider>
    );
  }

  componentDidMount() {
    this.ajustScrollbarHeight();
    window.addEventListener('resize', this.ajustScrollbarHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.ajustScrollbarHeight);
  }

  componentDidUpdate() {
    this.ajustScrollbarHeight();
  }

  ajustScrollbarHeight = () => {
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

  renderPanel = (props: any) => {
    const mergeProps = { ...props, id: 'layout-panel' };
    return <div {...mergeProps}></div>;
  };
}

const WrapperLayout = (props: LayoutProps) => (
  <Media query="(max-width: 996px)">
    {isMobile => {
      const isNode = typeof window === `undefined`;
      return <Layout {...props} isMobile={isMobile && !isNode} />;
    }}
  </Media>
);
export default WrapperLayout;
