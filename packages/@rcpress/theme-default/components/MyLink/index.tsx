import React from 'react';
import { Link } from 'react-router-dom';
import { PageContext } from '@app';
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
      {({
        siteData: { base, prefetch: globalPrefetch },
        path
      }) => {
        let clickMerged = () => {
          handleLinkClick(path, to);
        };

        if (onClick) {
          clickMerged = (...args) => {
            onClick.apply(null, args);
            handleLinkClick(path, to);
          };
        }

        if (!prefetch || !globalPrefetch) {
          return (
            <Link
              onClick={clickMerged}
              to={resolvePathWithBase(to, base)}
              {...rest}
            >
              {children}
            </Link>
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
