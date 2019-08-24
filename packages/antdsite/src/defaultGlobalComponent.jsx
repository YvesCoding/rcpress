import React from 'react';
import { Alert } from 'antd';
import { PageContext } from './templates/PageContext';

const MdAlert = props => {
  return <Alert className="md-alert" showIcon {...props} description={props.children} />;
};

export default { MdAlert: MdAlert, PageCustomer: PageContext.Consumer };
