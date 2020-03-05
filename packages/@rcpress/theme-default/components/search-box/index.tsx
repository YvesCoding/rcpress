import React from 'react';
import { List, Input, Icon, Breadcrumb } from 'antd';
import { PageInfo } from '../utils';
import Link from '../MyLink';

type filterDatas = {
  title: string;
  important?: boolean;
  url?: string;
}[][];

interface SearchState {
  isSearchListShow: boolean;
  query: string;
  filterDatas: filterDatas;
  isFocus: boolean;
}

interface SearchProps {
  datas: Array<PageInfo>;
  max: number;
  mobile?: boolean;
}

function match(a: string, b: string) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return b && a.includes(b);
}

function flattenToc(items: any[]): any[] {
  return items
    ? items.reduce((pre, cur) => {
        return pre
          .concat(cur as any)
          .concat((cur.items && cur.items.length
            ? flattenToc(cur.items)
            : []) as any);
      }, [])
    : [];
}

export default class Search extends React.Component<
  SearchProps,
  SearchState
> {
  searchInput: Input | null | undefined;
  isClickLink: boolean = false;

  constructor(props: SearchProps) {
    super(props);

    this.state = {
      isSearchListShow: false,
      query: '',
      filterDatas: [],
      isFocus: false
    };
  }

  handleBlur = () => {
    if (this.isClickLink) {
      return;
    }

    this.setState(() => {
      return {
        isSearchListShow: false,
        isFocus: false
      };
    });
  };

  handleClickIcon = () => {
    return {
      isFocus: true
    };
  };

  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(
      {
        isSearchListShow: true,
        isFocus: true,
        query: e.currentTarget.value
      },
      () => {
        this.search();
      }
    );
  };

  search = () => {
    const { datas, max } = this.props;
    const query = this.state.query.trim();
    const results: filterDatas = [];

    function hightlightRes(res: string) {
      return res.replace(
        new RegExp('(' + query + ')', 'gi'),
        `<span class='hight-light'>$1</span>`
      );
    }

    function resolveOnePageItem(currentItem: PageInfo) {
      if (match(currentItem.title, query)) {
        results.push([
          {
            url: currentItem.path,
            title: hightlightRes(currentItem.title),
            important: currentItem.important
          }
        ]);
      } else if (
        currentItem.toc &&
        currentItem.toc.items &&
        currentItem.toc.items.length
      ) {
        let tocs = flattenToc(currentItem.toc.items);
        for (
          let i = 0;
          i < tocs.length && results.length < max;
          i++
        ) {
          let t = tocs[i];
          if (match(t.title, query)) {
            results.push([
              {
                title: currentItem.title,
                important: currentItem.important
              },
              {
                url: currentItem.path + t.url,
                title: hightlightRes(t.title)
              }
            ]);
          }
        }
      }
    }

    for (
      let i = 0;
      i < datas.length && results.length < max;
      i++
    ) {
      const currentItem = datas[i];
      if (currentItem.path) {
        resolveOnePageItem(currentItem);
      } else if (
        currentItem.children &&
        currentItem.children.length
      ) {
        for (
          let j = 0;
          j < currentItem.children.length;
          j++
        ) {
          resolveOnePageItem(currentItem.children[j]);
        }
      }
    }

    this.setState({
      filterDatas: results
    });
  };

  render() {
    const { filterDatas, isFocus } = this.state;
    const { mobile } = this.props;

    return (
      <div id="search-box" className="search-box">
        <div className="searchInput-component">
          <div className="icon-container">
            <Icon
              type="search"
              onClick={this.handleClickIcon}
            />
          </div>
          <Input
            ref={ref => {
              this.searchInput = ref;
            }}
            value={this.state.query}
            onBlur={this.handleBlur}
            onChange={this.handleInput}
            onFocus={this.handleInput}
            className={isFocus || !mobile ? '' : 'no-focus'}
          />
        </div>

        <div className="search-result-list">
          {this.state.isSearchListShow &&
          this.state.filterDatas.length ? (
            <List
              key="search-list"
              dataSource={filterDatas}
              renderItem={dataItem => {
                return (
                  <List.Item>
                    <Link
                      to={
                        dataItem[dataItem.length - 1]
                          .url as string
                      }
                      className="search-item "
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
                          <Breadcrumb
                            separator=">"
                            className="ellipsis"
                          >
                            {dataItem.map((item, index) => (
                              // <Badge dot={i.important}>
                              <Breadcrumb.Item key={index}>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: item.title
                                  }}
                                ></span>
                              </Breadcrumb.Item>
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
      if (
        event.keyCode === 83 &&
        event.target === document.body
      ) {
        searchInput && searchInput.focus();
      }
    });
  }
}
