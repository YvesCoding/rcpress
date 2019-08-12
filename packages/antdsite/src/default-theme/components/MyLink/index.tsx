import React from 'react';
import { Link } from 'gatsby';
import { Link as RouterLink } from '@reach/router';
import { PageContext } from 'antdsite/src/templates/PageContext';
import { resolvePathWithBase } from '../utils';
import NProgress from 'nprogress';

function handleLinkClick() {
  NProgress.start();
  NProgress.set(0.6);
}

const MyLink: React.SFC<any> = ({
  children,
  to,
  prefetch,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  to: string;
  prefetch: boolean;
  onClick: (e: any) => void;
}) => {
  let clickMerged = handleLinkClick;

  if (onClick) {
    clickMerged = (...args) => {
      onClick.apply(null, args);
      handleLinkClick();
    };
  }
  return (
    <PageContext.Consumer>
      {({ webConfig: { base, prefetch: globalPrefetch } }) => {
        if (!prefetch || !globalPrefetch) {
          return (
            <RouterLink onClick={clickMerged} to={resolvePathWithBase(to, base)} {...rest}>
              {children}
            </RouterLink>
          );
        }
        return (
          <Link onClick={clickMerged} to={to} {...rest}>
            {children}
          </Link>
        );
      }}
    </PageContext.Consumer>
  );
};

MyLink.defaultProps = {
  prefetch: true
};

export default MyLink;
