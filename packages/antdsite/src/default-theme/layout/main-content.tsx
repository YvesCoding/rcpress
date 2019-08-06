import React from 'react';
import { Row, Col } from 'antd';
import { PageContext } from 'antdsite';
import HomePage from 'antdsite-home';
import LeftMenu from '../components/menu';
import Content from '../components/content';
import PrevAndNext from '../components/prevAndNext';

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

  getContentWidth = (isEnableMenu: boolean, originWidth: number) => {
    return isEnableMenu ? originWidth : 24;
  };

  setContentHeight = () => {
    const { prev, next } = this.state;
    // header and footer height is 64px and
    // prev and next section height is 73px,
    // we should also add main-wrapper's paddingTop: 40opx
    const resetHeight = (this.props.footer ? 128 : 64) + 40 + (prev || next ? 73 : 0);

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
    const { isMobile, footer, isWebsiteHome } = this.props;
    const { prev, next, contentHeight } = this.state;
    const { currentPageSidebarItems: menuList, slug } = this.context;
    const enableMenu = !!(menuList && menuList.length);
    const getContentWidth = this.getContentWidth.bind(null, enableMenu);

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
          xxl={getContentWidth(20)}
          xl={getContentWidth(19)}
          lg={getContentWidth(18)}
          md={24}
          sm={24}
          xs={24}
        >
          <div
            style={{
              minHeight: contentHeight
            }}
          >
            {isWebsiteHome ? <HomePage /> : <Content />}
          </div>
          <PrevAndNext prev={prev} next={next} />
          {footer}
        </Col>
      </Row>
    );
  }
}
