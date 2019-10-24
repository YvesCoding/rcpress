import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteContext } from '@rcpress/core';
import NProgress from 'nprogress';

function handleLinkClick(from: string, to: string) {
  if (from == to) return;

  NProgress.start();
  NProgress.set(0.6);
}

const MyLink: React.SFC<any> = ({
  children,
  to,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  to: string;
  prefetch: boolean;
  onClick: (e: any) => void;
}) => {
  const { path } = useSiteContext();

  let clickMerged = () => {
    handleLinkClick(path, to);
  };

  if (onClick) {
    clickMerged = (...args) => {
      onClick.apply(null, args);
      handleLinkClick(path, to);
    };
  }
  return (
    <Link onClick={clickMerged} to={to} {...rest}>
      {children}
    </Link>
  );
};

export default MyLink;
