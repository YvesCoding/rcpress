module.exports = async ({ page, actions }) => {
  const { createPage } = actions;
  return new Promise(resolvePromise => {
    if (page.path.includes('docs/error-decoder.html')) {
      page.context.path = 'docs/error-decoder.html';

      createPage(page);
    }
    resolvePromise();
  });
};
