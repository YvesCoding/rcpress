import React from 'react';
import { graphql } from 'gatsby';
import WrapperLayout from '../components/layout';
import MainContent from '../components/Content/MainContent';
import { resolveSidebarItems } from '../components/utils';

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

export interface IMdxData {
  code: {
    body: string;
  };
  tableOfContents: {
    items: Array<{
      url: string;
      title: string;
    }>;
  };
  frontmatter: IGraphqlFrontmatterData;
  fields: IMarkDownFields;
}

export type Edges = Array<{
  node: {
    frontmatter: IGraphqlFrontmatterData;
    fields: IMarkDownFields;
  };
}>;

export interface IAllMdxData {
  edges: Edges;
}

export default function Template({
  data,
  pageContext,
  ...rest
}: {
  data: { mdx: IMdxData; allMdx: IAllMdxData };
  isMobile: boolean;
  location: {
    pathname: string;
  };
  pageContext: {
    webConfig: any;
    slug: string;
  };
}) {
  const { mdx, allMdx } = data;
  const { frontmatter, fields, code, tableOfContents } = mdx;
  const menuList = resolveSidebarItems(allMdx, pageContext.webConfig, pageContext.slug);
  return (
    <WrapperLayout data={data} pageContext={pageContext} {...rest}>
      <MainContent
        {...rest}
        localizedPageData={{
          meta: {
            ...frontmatter,
            ...fields,
          },
          toc: tableOfContents,
          code,
        }}
        menuList={menuList}
      />
    </WrapperLayout>
  );
}

export const pageQuery = graphql`
  query DocsQuery($slug: String!) {
    allMdx {
      edges {
        node {
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
      tableOfContents
      frontmatter {
        title
      }
      fields {
        modifiedTime
        path
        slug
      }
      code {
        body
      }
    }
  }
`;
// avatarList {
//   href
//   text
//   src
// }
