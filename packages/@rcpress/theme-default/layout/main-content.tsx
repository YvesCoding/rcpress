import React from 'react';
import { Row, Col } from 'antd';
import { PageContext } from '@app';
import HomePage from './home';
import LeftMenu from '../components/menu';
import Content from '../components/content';
import Footer from './footer';
import ReactDom from 'react-dom';

export interface MainContentProps {
  isMobile: boolean;
  isWebsiteHome: boolean;
  footer: any;
}

export interface MainContentState {
  prev: React.Component | null;
  next: React.Component | null;
}

export default class MainContent extends React.PureComponent<
  MainContentProps,
  MainContentState
> {
  static contextType = PageContext;

  constructor(props: MainContentProps) {
    super(props);

    this.state = {
      prev: null,
      next: null
    };
  }

  getFooterHeight = () => {
    const footer = this.refs.footer;
    if (!footer) return 0;

    const footerNode = ReactDom.findDOMNode(
      footer
    ) as HTMLDivElement;
    return footerNode.offsetHeight;
  };

  getPreAndNextMenu = (
    prev: React.Component,
    next: React.Component
  ) => {
    this.setState({
      prev,
      next
    });
  };

  render() {
    const { isMobile, isWebsiteHome } = this.props;
    const { prev, next } = this.state;
    const {
      currentPageSidebarItems: menuList,
      path,
      siteData: { footer: footerText }
    } = this.context;
    const enableMenu = !!(menuList && menuList.length);

    return (
      <Row className="main-wrapper">
        {enableMenu ? (
          <LeftMenu
            getPreAndNextMenu={this.getPreAndNextMenu}
            menuList={menuList}
            currentPath={path}
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
          <div>
            {isWebsiteHome ? (
              <HomePage />
            ) : (
              <div>
                <Content prev={prev} next={next} />
              </div>
            )}
          </div>
          {footerText && isWebsiteHome ? (
            <Footer footerText={footerText} ref="footer" />
          ) : null}
        </Col>
      </Row>
    );
  }
}
