const path = require('path');

const genLoadableImportedCode = (name, path) => {
  return `const  ${name} = loadable(() => import(${path}));\n`;
};

exports.genRoutesFile = async function({
  siteData: {
    pages,
    themeConfig: { docsDir }
  },
  pageFiles,
  sourceDir
}) {
  function getImportedMakrdown({}, index) {
    const file = pageFiles[index];

    return genLoadableImportedCode(
      `AsyncMD$${index}`,
      JSON.stringify(path.resolve(sourceDir, file))
    );
  }

  function genRoute({ path: pagePath }, index) {
    const file = pageFiles[index];
    const filePath = path.join(docsDir, file);
    let code = `
  {
    path: ${JSON.stringify(pagePath)},
    filePath: ${JSON.stringify(filePath)},
    markdown: AsyncMD$${index},
    name: '${pagePath}' ,
    route_component: LayoutWrapper,
    exact: true
  }`;

    const dncodedPath = decodeURIComponent(pagePath);
    if (dncodedPath !== pagePath) {
      code += `,
  {
    path: ${JSON.stringify(dncodedPath)},
    redirect: ${JSON.stringify(pagePath)},
    exact: true
  }`;
    }

    if (/\/$/.test(pagePath)) {
      code += `,
  {
    path: ${JSON.stringify(pagePath + 'index.html')},
    redirect: ${JSON.stringify(pagePath)},
    exact: true
  }`;
    }

    return code;
  }

  const notFoundRoute = `,
  { 
    route_component: nNotFoundWrapper 
  }`;

  return (
    `import loadable from '@loadable/component';\n` +
    genLoadableImportedCode('LayoutWrapper', "'@rcpress/core/lib/web/wrappers/layoutHotWrapper'") +
    genLoadableImportedCode(
      'nNotFoundWrapper',
      "'@rcpress/core/lib/web/wrappers/notFoundHotWrapper'"
    ) +
    '\n' +
    `${pages.map(getImportedMakrdown).join('')}` +
    `export const routes = [${pages.map(genRoute).join(',')}${notFoundRoute}\n]`
  );
};
