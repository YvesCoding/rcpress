import React from 'react';
import { Tooltip, Icon } from 'antd';

const EditButton: React.SFC<{
  title: React.ReactNode;
  path: string;
}> = ({ title, path }) => {
  return (
    <Tooltip title={title}>
      <a className="edit-button" target="_blank" href={path}>
        <Icon type="edit" />
      </a>
    </Tooltip>
  );
};

export default EditButton;
