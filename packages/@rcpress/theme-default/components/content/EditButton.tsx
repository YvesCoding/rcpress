import React from 'react';
import { Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const EditButton: React.SFC<{
  title: React.ReactNode;
  path: string;
}> = ({ title, path }) => {
  return (
    <Tooltip title={title}>
      <a className="edit-button" target="_blank" href={path}>
        <EditOutlined />
      </a>
    </Tooltip>
  );
};

export default EditButton;
