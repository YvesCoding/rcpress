import React from 'react';
import { Anchor } from 'antd';
import { useSiteContext } from '@rcpress/core';

const Link = Anchor.Link;

const Toc: React.FunctionComponent<{ affix?: boolean }> = ({ affix }) => {
  const getTocs = (toc: any): any => {
    return (
      <Link key={toc.url} href={toc.url} title={toc.title}>
        {toc.items && toc.items.map(getTocs)}
      </Link>
    );
  };

  const { currentPageInfo } = useSiteContext();

  return currentPageInfo.toc && currentPageInfo.toc.items && currentPageInfo.toc.items.length ? (
    <div className={` ${affix ? 'toc-affix' : 'toc-unfixed'}`}>
      <Anchor
        affix={affix}
        offsetTop={70}
        className={`toc ${affix ? 'toc-affix' : ''}`}
        targetOffset={0}
      >
        {currentPageInfo.toc.items.map(getTocs)}
      </Anchor>
    </div>
  ) : null;
};

export default Toc;
