import React from 'react';
import { graphql } from 'gatsby';
import { PageContext } from './PageContext';
import {
  getcurrentLocaleConfigBySlug,
  resolveSidebarItems,
} from '../default-theme/components/utils';
import Layout from 'antdsite-layout';

import Media from 'react-media';

export interface IGraphqlFrontmatterData {
  title: string;
  important?: boolean;
  disabled?: boolean;
  link?: string;
  subtitle?: string;
}

export interface IMarkDownFields {
  slug: string;
  path: string;
  modifiedTime: string;
  avatarList: Array<{
    href: string;
    text: string;
    src: string;
  }>;
}

export interface OneToc {
  url: string;
  title: string;
  items: OneToc[];
}

export interface Toc {
  items: OneToc[];
}

export interface IMdxData extends PageEdge {
  code: {
    body: string;
  };
}

export type Headings = Array<{
  depth: number;
  value: string;
}>;

export interface PageEdge {
  tableOfContents: Toc;
  frontmatter: IGraphqlFrontmatterData;
  fields: IMarkDownFields;
  headings: Headings;
}

export type Edges = Array<{
  node: PageEdge;
}>;

export interface IAllMdxData {
  edges: Edges;
}

export default function Template(props: {
  data: { mdx: IMdxData; allMdx: IAllMdxData };
  isMobile: boolean;
  location: {
    pathname: string;
  };
  pageContext: {
    webConfig: any;
    slug: string;
    isWebsiteHome: boolean;
  };
}) {
  const { pageContext } = props;
  const { currentLocaleWebConfig } = getcurrentLocaleConfigBySlug(
    pageContext.webConfig,
    pageContext.slug
  );

  const sidebarItems = resolveSidebarItems(
    props.data.allMdx,
    pageContext.webConfig,
    pageContext.slug
  );

  return (
    <PageContext.Provider
      value={{
        ...pageContext,
        currentLocaleWebConfig,
        ...sidebarItems,
        currentPageInfo: props.data.mdx,
      }}
    >
      <Media query="(max-width: 996px)">
        {isMobile => {
          const isNode = typeof window === `undefined`;
          return <Layout {...props} isMobile={isMobile && !isNode} />;
        }}
      </Media>
    </PageContext.Provider>
  );
}

export const pageQuery = graphql`
  query DocsQuery($slug: String!, $maxTocDeep: Int!) {
    allMdx {
      edges {
        node {
          tableOfContents(maxDepth: $maxTocDeep)
          headings {
            depth
            value
          }
          fields {
            slug
            path
          }
          frontmatter {
            title
            subtitle
            link
            important
            disabled
          }
          code {
            body
          }
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      tableOfContents(maxDepth: $maxTocDeep)
      headings {
        depth
        value
      }
      frontmatter {
        title
        heroImage
        actionText
        actionLink
        showStar
        footer
        features {
          details
          title
        }
      }
      fields {
        modifiedTime
        path
        slug
        avatarList {
          href
          text
          src
        }
      }
      code {
        body
      }
    }
  }
`;
