/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'gatsby';
import * as utils from '../utils';
import { Row, Col, Icon, Select, Input, Menu, Button, Modal, Popover, Dropdown } from 'antd';
import { PageContext } from './PageContext';

interface HeaderProps {
  isMobile: boolean;
}
interface HeaderState {
  inputValue?: string;
  menuVisible: boolean;
  menuMode?: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';
  searchOption?: any[];
  searching?: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  state: HeaderState = {
    inputValue: undefined,
    menuVisible: false,
    menuMode: 'horizontal',
  };

  static contextType = PageContext;

  searchInput: Input | null | undefined;

  componentDidMount() {
    const { searchInput } = this;
    document.addEventListener('keyup', event => {
      if (event.keyCode === 83 && event.target === document.body) {
        searchInput && searchInput.focus();
      }
    });
  }

  setMenuMode = (isMobile: boolean) => {
    this.setState({ menuMode: isMobile ? 'inline' : 'horizontal' });
  };

  componentDidUpdate(preProps: HeaderProps) {
    const { isMobile } = this.props;
    if (isMobile !== preProps.isMobile) {
      this.setMenuMode(isMobile);
    }
  }

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  };

  onMenuVisibleChange = (visible: boolean) => {
    this.setState({
      menuVisible: visible,
    });
  };

  setLocaleLinks = (localeLink: string, currentSlug: string, currentLocale: string) => {
    return currentSlug.replace(currentLocale, localeLink);
  };

  render() {
    const { menuMode, menuVisible } = this.state;
    const { webConfig, slug } = this.context;

    let currentLocate = utils.getCurrentLoacle(webConfig, slug);
    let {
      currentLocaleWebConfig: { themeConfig, title, base },
    } = utils.getcurrentLocaleConfigBySlug(webConfig, slug);
    const { locales } = webConfig.themeConfig;

    const { nav = [] } = themeConfig;
    const activeMenuItem = nav
      .filter((item: any) => {
        return item.link && slug.startsWith(item.link);
      })
      .map((_: string) => _.link);

    const menu = [
      <Menu mode={menuMode} selectedKeys={activeMenuItem} id="nav" key="nav">
        {nav.map((item: any) => {
          return (
            <Menu.Item key={item.link}>
              {utils.isExternal(item.link) ? (
                <a href={item.link} target="_blank" className="menu-item-link-outside">
                  {item.text}
                </a>
              ) : (
                <Link to={item.link}>{item.text}</Link>
              )}
            </Menu.Item>
          );
        })}
      </Menu>,
    ];

    const chooseLanguage = currentLocate ? (
      <Menu selectedKeys={[currentLocate]}>
        {Object.keys(locales).map(item => {
          return (
            <Menu.Item key={item}>
              <Link to={this.setLocaleLinks(item, slug, currentLocate as string)}>
                {locales[item].label}
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    ) : null;

    return (
      <div id="header" className="header">
        {menuMode === 'inline' ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <Icon className="nav-phone-icon" type="menu" onClick={this.handleShowMenu} />
          </Popover>
        ) : null}
        <Row>
          <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
            <Link id="logo" to={utils.resolvePathWithBase(currentLocate || '/', base)}>
              {/* <img src={LOGO_URL} alt="logo" />
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/tNoOLUAkyuGLXoZvaibF.svg"
                alt="Ant Design Pro"
              /> */}
              {title}
            </Link>
          </Col>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
            <div id="search-box">
              <Icon type="search" className="search-icon" />
              <Input
                ref={ref => {
                  this.searchInput = ref;
                }}
              />
            </div>
            <div className="header-meta">
              <div className="right-header">
                {currentLocate ? (
                  <Dropdown overlay={chooseLanguage} placement="bottomLeft">
                    <Button size="small">{themeConfig.selectText}</Button>
                  </Dropdown>
                ) : null}
              </div>
              {menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

console.log([Header]);

export default Header;
