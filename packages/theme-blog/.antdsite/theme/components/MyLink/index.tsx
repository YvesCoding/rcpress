import React from 'react';
import { Link } from 'gatsby';
import { Link as RouterLink } from '@reach/router';
import { PageContext } from 'antdsite/src/templates/PageContext';
import { resolvePathWithBase, normalize } from '../utils';
import NProgress from 'nprogress';

function handleLinkClick(from: string, to: string) {
  to = normalize(to);
  if (from == to) return;

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
  return (
    <PageContext.Consumer>
      {({ webConfig: { base, prefetch: globalPrefetch }, slug }) => {
        let clickMerged = () => {
          handleLinkClick(slug, to);
        };

        if (onClick) {
          clickMerged = (...args) => {
            onClick.apply(null, args);
            handleLinkClick(slug, to);
          };
        }

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
