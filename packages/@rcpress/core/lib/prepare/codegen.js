const path = require('path');
const { fileToComponentName, resolveComponents } = require('./util');

exports.genRoutesFile = async function ({ siteData: { pages }, sourceDir, pageFiles }) {
  function genRoute({ path: pagePath, key: componentName }, index) {
    const file = pageFiles[index];
    const filePath = path.resolve(sourceDir, file);
    let code = `
  {
    name: ${JSON.stringify(componentName)},
    path: ${JSON.stringify(pagePath)},
    filePath: ${JSON.stringify(filePath)},
    component: ThemeLayout
  }`;

    const dncodedPath = decodeURIComponent(pagePath);
    if (dncodedPath !== pagePath) {
      code += `,
  {
    path: ${JSON.stringify(dncodedPath)},
    redirect: ${JSON.stringify(pagePath)}
  }`;
    }

    if (/\/$/.test(pagePath)) {
      code += `,
  {
    path: ${JSON.stringify(pagePath + 'index.html')},
    redirect: ${JSON.stringify(pagePath)}
  }`;
    }

    return code;
  }

  const notFoundRoute = `,
  {
    path: '*',
    component: ThemeNotFound
  }`;

  return (
    `import loadable from '@loadable/component';\n` +
    `import React from 'react';\n` +
    `const ThemeLayout = loadable(() => import('@themeLayout'));\n` +
    `const ThemeNotFound = loadable(() => import('@themeNotFound'));\n` +
    `export const routes = [${pages.map(genRoute).join(',')}${notFoundRoute}\n]`
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
