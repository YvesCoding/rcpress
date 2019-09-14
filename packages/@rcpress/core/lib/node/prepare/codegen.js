const path = require('path');

exports.genRoutesFile = async function({
  siteData: {
    pages,
    themeConfig: { docsDir }
  },
  pageFiles,
  sourceDir
}) {
  function genRoute({ path: pagePath }, index) {
    const file = pageFiles[index];
    const filePath = path.join(docsDir, file);
    let code = `
  {
    path: ${JSON.stringify(pagePath)},
    filePath: ${JSON.stringify(filePath)},
    markdown: loadable(() => import('${path.resolve(
      sourceDir,
      file
    )}')),
    name: '${pagePath}' ,
    route_component:ThemeLayout,
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
    route_component: ThemeNotFound 
  }`;

  return (
    `import loadable from '@loadable/component';\n` +
    `import React from 'react';\n` +
    `const ThemeLayout = loadable(() => import('@themeLayout'));\n` +
    `const ThemeNotFound = loadable(() => import('@themeNotFound'));\n` +
    `export const routes = [${pages
      .map(genRoute)
      .join(',')}${notFoundRoute}\n]`
  );
};

// TODO add global component.
// exports.genComponentRegistrationFile = async function ({ sourceDir }) {
//   function genImport(file) {
//     const name = fileToComponentName(file);
//     const baseDir = path.resolve(sourceDir, '.rcpress/components');
//     const absolutePath = path.resolve(baseDir, file);
//     const code = `Vue.component(${JSON.stringify(name)}, () => import(${JSON.stringify(
//       absolutePath
//     )}))`;
//     return code;
//   }

//   const components = (await resolveComponents(sourceDir)) || [];
//   return `import React from 'react'\n` + `import loadable from '@loadable/component'\n` + components.map(genImport).join('\n');
// };
