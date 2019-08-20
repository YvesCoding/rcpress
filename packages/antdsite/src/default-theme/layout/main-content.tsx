import React from 'react';
import { Row, Col } from 'antd';
import { PageContext } from 'antdsite';
import HomePage from 'antdsite-home';
import LeftMenu from '../components/menu';
import Content from '../components/content';
import PrevAndNext from '../components/prevAndNext';
import Footer from 'antdsite-footer';
import ReactDom from 'react-dom';

export interface MainContentProps {
  isMobile: boolean;
  isWebsiteHome: boolean;
  footer: any;
}

export interface MainContentState {
  prev: React.Component | null;
  next: React.Component | null;
  contentHeight: string;
}

export default class MainContent extends React.PureComponent<MainContentProps, MainContentState> {
  static contextType = PageContext;

  constructor(props: MainContentProps) {
    super(props);

    this.state = {
      prev: null,
      next: null,
      contentHeight: ''
    };
  }

  componentDidMount() {
    this.setContentHeight();
  }

  componentDidUpdate() {
    this.setContentHeight();
  }

  getFooterHeight = () => {
    const footer = this.refs.footer;
    if (!footer) return 0;

    const footerNode = ReactDom.findDOMNode(footer) as HTMLDivElement;
    return footerNode.offsetHeight;
  };

  setContentHeight = () => {
    const { prev, next } = this.state;
    // calc content's min-height
    // header's height is 64px and
    // prev and next button's height is 73px,
    // we should also add main-wrapper's paddingTop: 40opx
    const resetHeight =
      (this.refs.footer ? this.getFooterHeight() + 64 : 64) + 40 + (prev || next ? 73 : 0);

    this.setState({
      contentHeight: `calc(100vh - ${resetHeight}px)`
    });
  };

  getPreAndNextMenu = (prev: React.Component, next: React.Component) => {
    this.setState({
      prev,
      next
    });
  };

  render() {
    const { isMobile, isWebsiteHome } = this.props;
    const { prev, next, contentHeight } = this.state;
    const {
      currentPageSidebarItems: menuList,
      slug,
      webConfig: { footer: footerText }
    } = this.context;
    const enableMenu = !!(menuList && menuList.length);

    return (
      <Row className="main-wrapper">
        {enableMenu ? (
          <LeftMenu
            getPreAndNextMenu={this.getPreAndNextMenu}
            menuList={menuList}
            currentPath={slug}
            isMobile={isMobile}
          />
        ) : null}

        <Col
          xxl={enableMenu ? 20 : 24}
          xl={enableMenu ? 19 : 24}
          lg={enableMenu ? 18 : 24}
          md={24}
          sm={24}
          xs={24}
        >
          <div
            style={{
              minHeight: contentHeight
            }}
          >
            {isWebsiteHome ? (
              <HomePage />
            ) : (
              <div>
                <Content />
              </div>
            )}
          </div>
          <PrevAndNext prev={prev} next={next} />
          {footerText ? <Footer footerText={footerText} ref="footer" /> : null}
        </Col>
      </Row>
    );
  }
}
