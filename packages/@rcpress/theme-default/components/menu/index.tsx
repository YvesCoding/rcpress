import React from 'react';
import MobileMenu from 'rc-drawer';
import { Badge, Col, Menu, Icon, Affix, Divider } from 'antd';
import Link from '../MyLink';
import Toc from '../Toc';

const { SubMenu } = Menu;

function getFlatMenuList(menuList: any[]): any[] {
  return menuList.reduce((pre, cur) => {
    return (cur.children && cur.children.length
      ? getFlatMenuList(cur.children).concat(cur)
      : [cur]
    ).concat(pre);
  }, []);
}

function getActiveMenuItem(path: string, currentPageSidebarItems: any[]): any {
  const newMenusList = getFlatMenuList(currentPageSidebarItems);
  const activeMenu = newMenusList.find(menu => menu.path == path);
  if (!activeMenu) return { title: '', path: '', children: [] };

  return activeMenu;
}

interface MenuPros {
  menuList: any[];
  currentPath: string;
  isMobile: boolean;
  getPreAndNextMenu?(prev: React.Component | null, next: React.Component | null): void;
}

interface MenuState {
  openKeys: string[];
}

export default class LeftMenu extends React.PureComponent<MenuPros, MenuState> {
  constructor(props: MenuPros) {
    super(props);
    this.state = {
      openKeys: this.getSideBarOpenKeys()
    };
  }

  menuItems: Array<React.Component> = [];

  componentDidMount() {
    this.getPreAndNext();
  }

  componentWillReceiveProps() {
    const openKeys = this.getSideBarOpenKeys() as Array<string>;
    if (openKeys) {
      this.setState({
        openKeys
      });
    }
  }
  componentDidUpdate(prevProps: MenuPros) {
    if (prevProps.currentPath != this.props.currentPath) {
      this.getPreAndNext();
    }
  }

  getPreAndNext = () => {
    const { currentPath } = this.props || [];
    const menuItems = this.menuItems || [];

    function filterItem(items: any) {
      return items.length
        ? Object.keys(items).reduce((pre, key) => {
            const ch = items[key].props.children;
            return pre.concat(ch.length ? ch : items[key]);
          }, [])
        : items;
    }

    const list = filterItem(filterItem(menuItems));

    const index = list.findIndex((item: any) => {
      return item.key === currentPath;
    });

    if (index === -1) {
      return {};
    }

    const { getPreAndNextMenu } = this.props;
    getPreAndNextMenu && getPreAndNextMenu(list[index - 1], list[index + 1]);
  };

  handleMenuOpenChange = (openKeys: string[]) => {
    this.setState({
      openKeys
    });
  };

  getSideBarOpenKeys = () => {
    const { menuList } = this.props;
    const newMenusList = getFlatMenuList(menuList);
    return newMenusList.filter(menu => !menu.collapsable).map(menu => menu.title);
  };

  generateMenuItem = ({ before = null, after = null }, item: any) => {
    if (!item.title) {
      return;
    }

    const text = [
      <span key="english">{item.title}</span>,
      <span className="chinese" key="chinese">
        {item.subtitle}
      </span>
    ];

    const disabled = item.disabled;

    const child = !item.link ? (
      <Link to={item.path || ''}>
        <Badge dot={item.important}>
          {before}
          {text}
          {after}
        </Badge>
      </Link>
    ) : (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="menu-item-link-outside"
      >
        <Badge dot={item.important}>
          {before}
          {text} <Icon type="export" />
          {after}
        </Badge>
      </a>
    );
    return (
      <Menu.Item key={item.path || item.link} disabled={disabled}>
        {child}
      </Menu.Item>
    );
  };

  generaGroupItem = (footerNavIcons = {}, item: any) => {
    const generateMenuItem = this.generateMenuItem.bind(this, footerNavIcons);

    if (!item.children || !item.children.length) {
      return generateMenuItem(item);
    }

    return (
      <Menu.ItemGroup key={item.title} title={item.title}>
        {item.children.map(generateMenuItem)}
      </Menu.ItemGroup>
    );
  };

  generateSubMenuItems = (menus?: any[], footerNavIcons = {}) => {
    if (!menus) return [];
    const generateMenuItem = this.generateMenuItem.bind(this, footerNavIcons);
    const itemGroups = menus.map(menu => {
      if (!menu.children || !menu.children.length) {
        return generateMenuItem(menu);
      }

      const groupItems = menu.children.map((item: any) =>
        this.generaGroupItem(footerNavIcons, item)
      );
      return (
        <SubMenu title={menu.title} key={menu.title}>
          {groupItems}
        </SubMenu>
      );
    });
    return itemGroups;
  };

  getMenuItems = (footerNavIcons = {}) => {
    const { menuList } = this.props;
    return this.generateSubMenuItems(menuList, footerNavIcons);
  };

  render() {
    const { currentPath, menuList, isMobile } = this.props;
    const { openKeys } = this.state;
    const activeMenuItem = getActiveMenuItem(currentPath, menuList);
    this.menuItems = this.getMenuItems();

    const menuChild = (
      <Menu
        inlineIndent={40}
        className="aside-container"
        mode="inline"
        openKeys={openKeys}
        selectedKeys={[(activeMenuItem && activeMenuItem.path) || '/']}
        onOpenChange={this.handleMenuOpenChange}
      >
        {this.menuItems}
      </Menu>
    );

    return isMobile ? (
      <MobileMenu key="mobile-menu" wrapperClassName="drawer-wrapper">
        {menuChild}
        <Divider />
        <Toc />
      </MobileMenu>
    ) : (
      <Col xxl={4} xl={5} lg={6} md={24} sm={24} xs={24} className="main-menu">
        <Affix offsetTop={70}>
          <section className="main-menu-inner">{menuChild}</section>
        </Affix>
      </Col>
    );
  }
}
