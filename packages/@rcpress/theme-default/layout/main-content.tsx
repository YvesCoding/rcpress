import React, { FunctionComponent, useState } from 'react';
import { Row, Col } from 'antd';
import { useSiteContext } from '@rcpress/core';
import HomePage from './home';
import LeftMenu from '../components/menu';
import Content from '../components/content';
import Footer from './footer';

const MainContent: FunctionComponent<{
  isMobile: boolean;
}> = ({ isMobile }) => {
  const [prev, setPrev] = useState<React.Component | null>(null);
  const [next, setNext] = useState<React.Component | null>(null);

  const {
    currentPageInfo: { isWebsiteHome },
    currentPageSidebarItems: menuList,
    path,
    siteData: { footer: footerText }
  } = useSiteContext();

  const enableMenu = !!(menuList && menuList.length);

  function getPreAndNextMenu(prev: React.Component | null, next: React.Component | null) {
    setPrev(prev);
    setNext(next);
  }

  return (
    <Row className="main-wrapper">
      {enableMenu ? (
        <LeftMenu
          getPreAndNextMenu={getPreAndNextMenu}
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
              <Content isMoblie={isMobile} prev={prev} next={next} />
            </div>
          )}
        </div>
        {footerText && isWebsiteHome ? <Footer footerText={footerText} /> : null}
      </Col>
    </Row>
  );
};

export default MainContent;
