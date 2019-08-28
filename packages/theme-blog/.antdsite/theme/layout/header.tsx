/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Link from '../components/MyLink';
import * as utils from '../components/utils';
import { Row, Col, Icon, Input, Menu, Button, Popover, Dropdown, Affix, Badge } from 'antd';
import { PageContext } from 'antdsite';
import SearchBox from '../components/search-box';
import SubMenu from 'antd/lib/menu/SubMenu';

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
    menuMode: 'horizontal'
  };

  static contextType = PageContext;

  searchInput: Input | null | undefined;

  componentDidMount() {
    const { isMobile } = this.props;
    this.setMenuMode(isMobile);
  }

  setMenuMode = (isMobile: boolean) => {
    this.setState({ menuMode: isMobile ? 'inline' : 'horizontal' });
  };

  componentDidUpdate(preProps: HeaderProps) {
    const { isMobile } = this.props;
    if (isMobile !== preProps.isMobile) {
      this.setMenuMode(isMobile);
    }

    const affix = this.refs['header-affix'] as Affix;
    affix && affix.updatePosition();
  }

  handleShowMenu = () => {
    this.setState({
      menuVisible: true
    });
  };

  onMenuVisibleChange = (visible: boolean) => {
    this.setState({
      menuVisible: visible
    });
  };

  setLocaleLinks = (localeLink: string, currentSlug: string, currentLocale: string) => {
    return currentSlug.replace(currentLocale, localeLink);
  };

  renderNav = (item: any, index: number) => {
    return item.items && item.items.length ? (
      <Menu.SubMenu
        className="hide-in-home-page"
        key={index}
        title={<Badge dot={item.important}>{item.text}</Badge>}
      >
        {item.items.map((ch: any, index: number) => {
          return this.renderNav(ch, index);
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

  render() {
    const { menuMode, menuVisible } = this.state;
    const { webConfig, slug, allPagesSidebarItems } = this.context;
    let currentLocate = utils.getCurrentLoacle(webConfig, slug);
    let {
      currentLocaleWebConfig: { themeConfig, title, base, logo }
    } = utils.getcurrentLocaleConfigBySlug(webConfig, slug);
    const { locales } = webConfig.themeConfig;

    const { nav = [], search, searchMaxSuggestions } = themeConfig;
    const activeMenuItem = nav
      .filter((item: any) => {
        return item.link && slug.startsWith(item.link);
      })
      .map((_: string) => _.link);
    const menu = (
      <>
        <Menu mode={menuMode} selectedKeys={activeMenuItem} id="nav" key="nav">
          {nav.map((item: any, index: number) => {
            return this.renderNav(item, index);
          })}
        </Menu>
        {menuMode === 'inline' && currentLocate ? (
          <Menu key="choose-lang" selectedKeys={[currentLocate || '']} mode={menuMode}>
            <SubMenu key="choose-lang" title={themeConfig.selectText}>
              {Object.keys(locales).map(item => {
                return (
                  <Menu.Item key={item}>
                    <Link to={this.setLocaleLinks(item, slug, currentLocate as string)}>
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
      <Affix style={{ width: '100%' }} ref="header-affix">
        <div id="header" className="header">
          {menuMode === 'inline' ? (
            <>
              {search && allPagesSidebarItems.length ? (
                <SearchBox mobile datas={allPagesSidebarItems} max={searchMaxSuggestions} />
              ) : null}
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
            </>
          ) : null}
          <Row>
            <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
              <Link id="site-logo" to={currentLocate || base}>
                {logo && <img src={utils.resolvePathWithBase(logo, base)} alt={title + '-logo'} />}
                <span className="left-top-title">{title}</span>
              </Link>
            </Col>
            <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
              {search && allPagesSidebarItems.length ? (
                <SearchBox datas={allPagesSidebarItems} max={searchMaxSuggestions} />
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
  }
}

export default Header;
