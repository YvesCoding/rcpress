module.exports = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MdxFrontmatter @infer {
      type: String
      title: String
      subtitle: String
      disabled: Boolean
      link: String
      important: Boolean
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
    `;
  createTypes(typeDefs);
};
