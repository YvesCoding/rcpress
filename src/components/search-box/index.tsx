import React from 'react';
import { List, Input, Icon, Breadcrumb } from 'antd';
import styles from './index.module.less';

interface SearchState {
  isSearchListShow: boolean;
}

interface SearchProps {}

export default class Search extends React.Component<SearchProps, SearchState> {
  searchInput: Input | null | undefined;

  constructor(props: SearchProps) {
    super(props);

    this.state = {
      isSearchListShow: false,
    };
  }

  handleBlur = () => {
    this.setState({
      isSearchListShow: false,
    });
  };
  handleInput = () => {
    this.setState({
      isSearchListShow: true,
    });
  };

  render() {
    const data = Array(10)
      .fill(null)
      .map(() =>
        Math.random()
          .toString()
          .slice(2, 5)
      );

    return (
      <div id="search-box" className={styles.searchBox}>
        <div className={styles.searchInputComponent}>
          <Icon type="search" />
          <Input
            ref={ref => {
              this.searchInput = ref;
            }}
            onBlur={this.handleBlur}
            onInput={this.handleInput}
          />
        </div>

        <div className={styles.searchResultList}>
          {this.state.isSearchListShow ? (
            <List
              key="search-list"
              dataSource={data}
              renderItem={(item, index) => {
                return (
                  <List.Item>
                    <a href="www.baidu.com" className={styles.searchItem}>
                      <List.Item.Meta
                        description={
                          <Breadcrumb separator=">" className={styles.ellipsis}>
                            <Breadcrumb.Item>Guide</Breadcrumb.Item>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Application Center</Breadcrumb.Item>
                          </Breadcrumb>
                        }
                      />
                    </a>
                  </List.Item>
                );
              }}
              size="small"
              bordered
            />
          ) : null}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { searchInput } = this;
    document.addEventListener('keyup', event => {
      if (event.keyCode === 83 && event.target === document.body) {
        searchInput && searchInput.focus();
      }
    });
  }
}
