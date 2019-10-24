/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSiteContext } from '@rcpress/core';

const Features = () => {
  const {
    currentPageInfo: {
      frontMatter: { features }
    }
  } = useSiteContext();
  let children = [];

  features &&
    features.forEach((item, i) => {
      const child = (
        <li key={i.toString()}>
          <div className="page1-box">
            <h2
              dangerouslySetInnerHTML={{
                __html: item.title
              }}
            ></h2>
            <p
              dangerouslySetInnerHTML={{
                __html: item.details
              }}
            ></p>
          </div>
        </li>
      );

      const index = Math.floor(i / 3);
      if (!children[index]) {
        children[index] = [];
      }
      children[index].push(child);
    });

  children = children.map((item, i) => (
    <ul className="page1-box-wrapper" key={i.toString()}>
      {item}
    </ul>
  ));

  return (
    <div className="home-page page1">
      <div className="home-page-wrapper" id="page1-wrapper">
        {children}
      </div>
    </div>
  );
};

export default Features;
