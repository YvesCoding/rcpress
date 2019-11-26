/* eslint-disable react/jsx-one-expression-per-line */
import React, { useRef, useEffect, useReducer } from 'react';
import Link from '../components/MyLink';
import * as utils from '../components/utils';
import { Row, Col, Icon, Menu, Button, Popover, Dropdown, Affix, Badge } from 'antd';
import { useSiteContext } from '@rcpress/core';
import SearchBox from '../components/search-box';
import SubMenu from 'antd/lib/menu/SubMenu';

type menuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';

interface HeaderProps {
  isMobile: boolean;
}
interface HeaderState {
  menuVisible: boolean;
  menuMode?: menuMode;
}

interface HeaderAction {
  type: 'menuVisible' | 'menuMode';
  payload: string | boolean;
}

const HeaderReducer = (state: HeaderState, action: HeaderAction): HeaderState => {
  switch (action.type) {
    case 'menuVisible':
      return {
        ...state,
        menuVisible: action.payload as boolean
      };

    case 'menuMode':
      if (state.menuMode != action.payload) {
        return {
          ...state,
          menuMode: action.payload as menuMode
        };
      }
  }

  return state;
};

const Header: React.FunctionComponent<HeaderProps> = ({ isMobile }) => {
  const [state, dispatch] = useReducer(HeaderReducer, {
    menuVisible: false,
    menuMode: 'horizontal'
  });
  const affix = useRef<Affix>(null);

  const {
    siteData,
    path,
    allPagesSidebarItems,
    currentLocate,
    currentLocaleSiteData: { themeConfig, title, base, logo }
  } = useSiteContext();

  useEffect(() => {
    dispatch({
      type: 'menuMode',
      payload: isMobile ? 'inline' : 'horizontal'
    });

    affix.current && affix.current.updatePosition();
  });

  const handleShowMenu = () => {
    dispatch({
      type: 'menuVisible',
      payload: true
    });
  };

  const onMenuVisibleChange = (visible: boolean) => {
    dispatch({
      type: 'menuVisible',
      payload: visible
    });
  };

  const setLocaleLinks = (localeLink: string, currentSlug: string, currentLocale: string) => {
    return currentSlug.replace(currentLocale, localeLink);
  };

  const renderNav = (item: any, index: number) => {
    return item.items && item.items.length ? (
      <Menu.SubMenu
        className="hide-in-home-page"
        key={index}
        title={<Badge dot={item.important}>{item.text}</Badge>}
      >
        {item.items.map((ch: any, index: number) => {
          return renderNav(ch, index);
        })}
      </Menu.SubMenu>
    ) : (
      <Menu.Item key={item.link || index}>
        {utils.isExternal(item.link) ? (
          <a href={item.link} target="_blank" className="menu-item-link-outside">
            <Badge dot={item.important}>{item.text}</Badge>
          </a>
        ) : (
          <Link to={item.link}>
            <Badge dot={item.important}>{item.text}</Badge>
          </Link>
        )}
      </Menu.Item>
    );
  };

  const { menuMode, menuVisible } = state;

  const { locales } = siteData.themeConfig;

  const { nav = [], search, searchMaxSuggestions } = themeConfig;

  const activeMenuItem = nav
    .filter((item: any) => {
      return item.link && path.startsWith(item.link);
    })
    .map(_ => _.link);
  const menu = (
    <>
      <Menu mode={menuMode} selectedKeys={activeMenuItem as any} id="nav" key="nav">
        {nav.map((item: any, index: number) => {
          return renderNav(item, index);
        })}
      </Menu>
      {menuMode === 'inline' && currentLocate ? (
        <Menu key="choose-lang" selectedKeys={[currentLocate || '']} mode={menuMode}>
          <SubMenu key="choose-lang" title={themeConfig.selectText}>
            {locales &&
              Object.keys(locales).map(item => {
                return (
                  <Menu.Item key={item}>
                    <Link to={setLocaleLinks(item, path, currentLocate as string)}>
                      {locales[item].label}
                    </Link>
                  </Menu.Item>
                );
              })}
          </SubMenu>
        </Menu>
      ) : null}
    </>
  );

  const chooseLanguage = currentLocate ? (
    <Menu selectedKeys={[currentLocate]}>
      {locales &&
        Object.keys(locales).map(item => {
          return (
            <Menu.Item key={item}>
              <Link to={setLocaleLinks(item, path, currentLocate as string)}>
                {locales[item].label}
              </Link>
            </Menu.Item>
          );
        })}
    </Menu>
  ) : null;

  return (
    <Affix style={{ width: '100%' }} ref={affix}>
      <div id="header" className="header">
        {menuMode === 'inline' ? (
          <>
            {search && allPagesSidebarItems.length ? (
              <SearchBox mobile datas={allPagesSidebarItems} max={searchMaxSuggestions || 5} />
            ) : null}
            <Popover
              overlayClassName="popover-menu"
              placement="bottomRight"
              content={menu}
              trigger="click"
              visible={menuVisible}
              arrowPointAtCenter
              onVisibleChange={onMenuVisibleChange}
            >
              <Icon className="nav-phone-icon" type="menu" onClick={handleShowMenu} />
            </Popover>
          </>
        ) : null}
        <Row>
          <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
            <Link id="site-logo" to={currentLocate || base}>
              {logo && (
                <img src={utils.resolvePathWithBase(logo, base || '/')} alt={title + '-logo'} />
              )}
              <span className="left-top-title">{title}</span>
            </Link>
          </Col>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
            {search && allPagesSidebarItems.length && menuMode !== 'inline' ? (
              <SearchBox datas={allPagesSidebarItems} max={searchMaxSuggestions || 5} />
            ) : null}
            <div className="header-meta">
              <div className="right-header">
                {currentLocate ? (
                  <Dropdown overlay={chooseLanguage} placement="bottomLeft">
                    <Button size="small">
                      {themeConfig.selectText} <Icon type="down" />
                    </Button>
                  </Dropdown>
                ) : null}
              </div>
              {menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
            </div>
          </Col>
        </Row>
      </div>
    </Affix>
  );
};

export default Header;
