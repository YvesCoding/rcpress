import React from 'react';
import { List, Input, Icon } from 'antd';
import styles from './index.module.less';

export default class Search extends React.Component {
  searchInput: Input | null | undefined;

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
          />
        </div>
        <div className={styles.searchResultList}>
          <List
            dataSource={data}
            renderItem={item => {
              return (
                <List.Item>
                  <div>
                    {item} > {item}
                  </div>
                </List.Item>
              );
            }}
            size="small"
            bordered
          />
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
