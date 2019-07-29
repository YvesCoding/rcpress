import React from 'react';
import { List, Input, Icon, Breadcrumb } from 'antd';
import styles from './index.module.less';
import { PageInfo } from '../utils';
import { OneToc } from '../../templates/docs';
import { Link } from 'gatsby';

type filterDatas = {
  title: string;
  important?: boolean;
  url?: string;
}[][];

interface SearchState {
  isSearchListShow: boolean;
  query: string;
  filterDatas: filterDatas;
}

interface SearchProps {
  datas: Array<PageInfo>;
}

function match(a: string, b: string) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return b && a.includes(b);
}

function flattenToc(items: OneToc[]): OneToc[] {
  return items
    ? items.reduce((pre, cur) => {
        return pre
          .concat(cur as any)
          .concat((cur.items && cur.items.length ? flattenToc(cur.items) : []) as any);
      }, [])
    : [];
}

export default class Search extends React.Component<SearchProps, SearchState> {
  searchInput: Input | null | undefined;
  isClickLink: boolean = false;

  constructor(props: SearchProps) {
    super(props);

    this.state = {
      isSearchListShow: false,
      query: '',
      filterDatas: [],
    };
  }

  handleBlur = () => {
    if (this.isClickLink) {
      return;
    }

    this.setState(() => {
      return {
        isSearchListShow: false,
      };
    });
  };

  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(
      {
        isSearchListShow: true,
        query: e.currentTarget.value,
      },
      () => {
        this.search();
      }
    );
  };

  search = () => {
    const { datas } = this.props;
    const query = this.state.query.trim();
    const results: filterDatas = [];

    function resolveOnePageItem(currentItem: PageInfo) {
      if (match(currentItem.title, query)) {
        results.push([
          {
            url: currentItem.slug,
            title: currentItem.title,
            important: currentItem.important,
          },
        ]);
      } else if (currentItem.toc && currentItem.toc.items.length) {
        let tocs = flattenToc(currentItem.toc.items);
        tocs.forEach(t => {
          if (match(t.title, query)) {
            results.push([
              {
                title: currentItem.title,
                important: currentItem.important,
              },
              {
                url: currentItem.slug + t.url,
                title: t.title,
              },
            ]);
          }
        });
      }
    }

    for (let i = 0; i < datas.length; i++) {
      const currentItem = datas[i];
      if (currentItem.slug) {
        resolveOnePageItem(currentItem);
      } else if (currentItem.children && currentItem.children.length) {
        for (let j = 0; j < currentItem.children.length; j++) {
          resolveOnePageItem(currentItem.children[j]);
        }
      }
    }

    this.setState({
      filterDatas: results,
    });
  };

  render() {
    const { filterDatas } = this.state;

    return (
      <div id="search-box" className={styles.searchBox}>
        <div className={styles.searchInputComponent}>
          <Icon type="search" />
          <Input
            ref={ref => {
              this.searchInput = ref;
            }}
            value={this.state.query}
            onBlur={this.handleBlur}
            onChange={this.handleInput}
            onFocus={this.handleInput}
          />
        </div>

        <div className={styles.searchResultList}>
          {this.state.isSearchListShow && this.state.filterDatas.length ? (
            <List
              key="search-list"
              dataSource={filterDatas}
              renderItem={dataItem => {
                return (
                  <List.Item>
                    <Link
                      to={dataItem[dataItem.length - 1].url as string}
                      className={styles.searchItem}
                      onMouseDown={() => {
                        this.isClickLink = true;
                      }}
                      onClick={() => {
                        this.isClickLink = false;
                        this.handleBlur();
                      }}
                    >
                      <List.Item.Meta
                        description={
                          <Breadcrumb separator=">" className={styles.ellipsis}>
                            {dataItem.map((item, index) => (
                              // <Badge dot={i.important}>
                              <Breadcrumb.Item key={index}>{item.title}</Breadcrumb.Item>
                              // </Badge>
                            ))}
                          </Breadcrumb>
                        }
                      />
                    </Link>
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
