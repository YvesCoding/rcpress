import React from 'react';
import Helmet from 'react-helmet';

const SEO = ({
  title,
  description,
  head,
  lang
}: {
  title: string;
  description: string;
  lang: string;
  head: Array<any>;
}) => {
  return (
    <React.Fragment>
      <Helmet
        htmlAttributes={{
          lang
        }}
      >
        {/* General tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {head.map((tag: any, index: number) => {
          return React.createElement(
            tag[0],
            {
              key: index,
              ...(tag[1] || {})
            },
            tag[2]
          );
        })}
      </Helmet>
    </React.Fragment>
  );
};

export default SEO;
