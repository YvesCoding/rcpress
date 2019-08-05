module.exports = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type HomeFeature {
      title: String
      details: String
    }

    type MdxFrontmatter @infer {
      type: String
      title: String
      subtitle: String
      disabled: Boolean
      link: String
      important: Boolean
      home: Boolean
      heroImage: String
      actionText: String
      actionLink: String
      showStar: Boolean
      features: [HomeFeature]
      maxTocDeep: Int
      editLink: String
    }

    type Avatar {
      href: String
      text: String
      src: String
    }

    type MdxFields @infer {
      avatarList: [Avatar]
    }
  
    type Mdx implements Node @infer {
      frontmatter: MdxFrontmatter
      fields: MdxFields
    }

    type SitePage implements Node @dontInfer {
      path: String
    }
    `;
  createTypes(typeDefs);
};
