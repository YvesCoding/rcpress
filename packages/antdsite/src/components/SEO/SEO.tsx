import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const SEO = ({ title, description }: { title: string; description: string }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            extraHead
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { extraHead },
      },
    }) => {
      return (
        <React.Fragment>
          <Helmet>
            {/* General tags */}
            <title>{title}</title>
            <meta name="description" content={description} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {JSON.parse(extraHead.replace(/\\|^"|"$/g, '')).map((tag: any, index: number) => {
              return React.createElement(
                tag[0],
                {
                  key: index,
                  ...(tag[1] || {}),
                },
                tag[2]
              );
            })}
          </Helmet>
        </React.Fragment>
      );
    }}
  />
);

export default SEO;
