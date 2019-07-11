import React from 'react';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

export default function(props) {
  const {
    data: {
      mdx: { code },
    },
  } = props;

  const wrapper = _ => {
    return <div className="markdown home-markdown">{_.children}</div>;
  };

  return (
    <div className="home-page page2">
      <div className="home-page-wrapper">
        <MDXRenderer components={{ wrapper }}>{code.body}</MDXRenderer>
      </div>
    </div>
  );
}
