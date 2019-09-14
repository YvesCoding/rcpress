import React, { useEffect } from 'react';
import { useSiteContext } from '@rcpress/core';

const homeRest = () => {
  // useEffect(() => {
  //   const container = this.refs['rest-content'];
  //   if (!container) return;

  //   const innerContent = container.querySelector(
  //     '.home-markdown.markdown'
  //   );
  //   if (!innerContent) return;

  //   if (innerContent.innerHTML === '') {
  //     container.style.display = 'none';
  //   } else {
  //     container.style.display = 'block';
  //   }
  // });
  const {
    currentPageInfo: { Markdown }
  } = useSiteContext();

  return (
    <div className="home-page page2">
      <div className="home-page-wrapper home-markdown markdown">
        <Markdown />
      </div>
    </div>
  );
};

export default homeRest;
