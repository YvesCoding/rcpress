import React from 'react';
import { Link } from 'react-router-dom';
import NProgress from 'nprogress';

const MyLink: React.SFC<any> = ({
  children,
  to,
  ...rest
}: {
  children: React.ReactNode;
  to: string;
  onClick: (e: any) => void;
}) => {
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};

export default MyLink;
