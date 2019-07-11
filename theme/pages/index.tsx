import React from 'react';
import Media from 'react-media';

import Home from '../components/home/index.jsx';
import WrapperLayout from '../components/layout';
import { graphql } from 'gatsby';

const IndexPage = (props: any) => {
  const isNode = typeof window === `undefined`;
  return (
    <WrapperLayout {...props}>
      <Media query="(max-width: 599px)">
        {isMobile => <Home {...props} isMobile={isMobile && !isNode} />}
      </Media>
    </WrapperLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query queryHomeInfo($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        heroImage
        actionText
        actionLink
        featureText
        showStar
        footer
        features {
          details
          title
        }
      }
      code {
        body
      }
    }
  }
`;
