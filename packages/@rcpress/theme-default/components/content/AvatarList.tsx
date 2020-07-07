import React from 'react';
import { Avatar, Tooltip } from 'antd';

class AvatarList extends React.Component<{
  avatarList?: Array<{
    href: string;
    text: string;
    src: string;
  }>;
}> {
  main: HTMLDivElement | null;
  async componentDidMount() {}
  render() {
    const { avatarList = [] } = this.props;
    if (!avatarList) {
      return null;
    }
    return (
      <div className="doc-avatar-list">
        {avatarList.map((item, index) => {
          return (
            <a
              key={index}
              className="href-box"
              target="_blank"
              href={`http://github.com/${item.username}`}
            >
              <Tooltip title={item.username}>
                <Avatar
                  src={item.url}
                  alt={item.username}
                  size="small"
                />
              </Tooltip>
            </a>
          );
        })}
      </div>
    );
  }
}
export default AvatarList;
