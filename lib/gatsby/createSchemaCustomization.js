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
  
    type Mdx implements Node @infer {
      frontmatter: MdxFrontmatter
    }
    `;
  createTypes(typeDefs);
};
