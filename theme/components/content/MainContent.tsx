import React from 'react';
import { Link } from 'gatsby';
import { Badge, Row, Col, Menu, Icon } from 'antd';
import classNames from 'classnames';
import MobileMenu from 'rc-drawer-menu';
import Article from './Article';
import { IGraphqlFrontmatterData, IMarkDownFields } from '../../templates/docs';

const { SubMenu } = Menu;

function getFlatMenuList(menuList: MenuDataItem[]): MenuDataItem[] {
  return menuList.reduce((pre, cur) => {
    return (cur.children && cur.children.length
      ? getFlatMenuList(cur.children).concat(cur)
      : [cur]
    ).concat(pre);
  }, []);
}

function getActiveMenuItem(props: MainContentProps): string | undefined {
  const newMenusList = getFlatMenuList(props.menuList);
  const activeMenu = newMenusList.find(menu => menu.slug == props.localizedPageData.meta.slug);
  if (!activeMenu) return '';

  return activeMenu.slug;
}

export interface MenuDataItem extends IGraphqlFrontmatterData {
  slug?: string;
  collapsable?: boolean;
  children: MenuDataItem[];
}

export interface MainContentProps {
  isMobile: boolean;
  location: {
    pathname: string;
  };
  menuList: MenuDataItem[];
  localizedPageData: {
    meta: IGraphqlFrontmatterData & IMarkDownFields;
    toc: {
      items: Array<{
        url: string;
        title: string;
      }>;
    };
    code: {
      body: string;
    };
  };
}

interface MainContentState {
  openKeys: string[];
}
export default class MainContent extends React.PureComponent<MainContentProps, MainContentState> {
  constructor(props: MainContentProps) {
    super(props);
    this.state = {
      openKeys: (this.getSideBarOpenKeys(props) || []) as Array<string>,
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentWillReceiveProps(nextProps: MainContentProps) {
    const openKeys = this.getSideBarOpenKeys(nextProps) as Array<string>;
    if (openKeys) {
      this.setState({
        openKeys,
      });
    }
  }
  timer: number;
  componentDidUpdate() {
    if (!window.location.hash) {
      return;
    }
    const element = document.getElementById(
      decodeURIComponent(window.location.hash.replace('#', ''))
    );
    setTimeout(() => {
      if (element) {
        element.scrollIntoView(true);
      }
    }, 100);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleMenuOpenChange = (openKeys: string[]) => {
    this.setState({
      openKeys,
    });
  };
  getSideBarOpenKeys(nextProps: MainContentProps) {
    const { menuList } = nextProps;
    const newMenusList = getFlatMenuList(menuList);
    return newMenusList.filter(menu => !menu.collapsable).map(menu => menu.title);
  }

  generateMenuItem = ({ before = null, after = null }, item: MenuDataItem) => {
    if (!item.title) {
      return;
    }

    const text = [
      <span key="english">{item.title}</span>,
      <span className="chinese" key="chinese">
        {item.subtitle}
      </span>,
    ];

    const disabled = item.disabled;

    const child = !item.link ? (
      <Link to={item.slug || ''}>
        {before}
        {text}
        {after}
      </Link>
    ) : (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="menu-item-link-outside"
      >
        {before}
        {text} <Icon type="export" />
        {after}
      </a>
    );
    return (
      <Menu.Item key={item.slug || item.link} disabled={disabled}>
        {item.important ? <Badge dot={item.important}>{child}</Badge> : child}
      </Menu.Item>
    );
  };

  generateSubMenuItems = (menus?: MenuDataItem[], footerNavIcons = {}) => {
    if (!menus) return [];
    const generateMenuItem = this.generateMenuItem.bind(this, footerNavIcons);
    const itemGroups = menus.map(menu => {
      if (!menu.children || !menu.children.length) {
        return generateMenuItem(menu);
      }

      const groupItems = menu.children.map(this.generateMenuItem.bind(this, footerNavIcons));
      return (
        <SubMenu title={menu.title} key={menu.title}>
          {groupItems}
        </SubMenu>
      );
    });
    return itemGroups;
  };

  getMenuItems = (footerNavIcons = {}) => {
    const moduleData = this.props.menuList;

    return this.generateSubMenuItems(moduleData, footerNavIcons);
  };

  getPreAndNext = (menuItems: any) => {
    const {
      localizedPageData: {
        meta: { slug },
      },
    } = this.props;

    const list =
      menuItems.length && !menuItems[0].props.children.length
        ? menuItems
        : Object.keys(menuItems).reduce((pre, key) => {
            return pre.concat(menuItems[key].props.children);
          }, []);

    const index = list.findIndex((item: any) => {
      return item.key === slug;
    });

    if (index === -1) {
      return {};
    }
    return {
      prev: list[index - 1],
      next: list[index + 1],
    };
  };

  render() {
    const { localizedPageData, isMobile } = this.props;

    const activeMenuItem = getActiveMenuItem(this.props) as string;
    const menuItems = this.getMenuItems();
    const { prev, next } = this.getPreAndNext(menuItems);
    const mainContainerClass = classNames('main-container', {});
    const { openKeys } = this.state;
    const menuChild = (
      <Menu
        inlineIndent={16}
        className="aside-container"
        mode="inline"
        openKeys={openKeys}
        selectedKeys={[activeMenuItem]}
        onOpenChange={this.handleMenuOpenChange}
      >
        {menuItems}
      </Menu>
    );
    return (
      <div className="main-wrapper">
        <Row>
          {isMobile ? (
            <MobileMenu
              iconChild={[<Icon type="menu-unfold" />, <Icon type="menu-fold" />]}
              key="mobile-menu"
              wrapperClassName="drawer-wrapper"
            >
              {menuChild}
            </MobileMenu>
          ) : (
            <Col xxl={4} xl={5} lg={6} md={24} sm={24} xs={24} className="main-menu">
              {menuChild}
            </Col>
          )}
          <Col xxl={20} xl={19} lg={18} md={24} sm={24} xs={24}>
            <div className={mainContainerClass}>
              <Article {...this.props} content={localizedPageData} />
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={{ span: 20, offset: 4 }} md={24} sm={24} xs={24}>
            <section className="prev-next-nav">
              {prev ? (
                <div className="prev-page">
                  <Icon className="footer-nav-icon-before" type="left" />
                  {prev.props.children}
                </div>
              ) : null}
              {next ? (
                <div className="next-page">
                  {next.props.children}
                  <Icon className="footer-nav-icon-after" type="right" />
                </div>
              ) : null}
            </section>
          </Col>
        </Row>
      </div>
    );
  }
}
