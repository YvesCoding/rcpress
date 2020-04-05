const fs = require('fs-extra');
const { getSourceDirs } = require('@rcpress/test-util');
const { Helmet } = require('react-helmet');
const App = require('../../app');

jest.setTimeout(200000);
// Helmet.canUseDOM = false;
describe('ssr', () => {
  beforeEach(() => {
    Helmet.canUseDOM = false;
  });

  afterEach(() => {
    Helmet.canUseDOM = true;
  });
  test('pagerender', async () => {
    const getPageRenderer = require('../../app/getPageRenderer');
    await Promise.all(
      getSourceDirs(__dirname).map(async ({ name, docsPath, docsTempPath }) => {
        await fs.ensureDir(docsTempPath);
        const app = await new App(docsPath).process(true, true);
        const { clientWebpackConfig, serverWebpackConfig, options } = app;
        const pagerender = await getPageRenderer(serverWebpackConfig, clientWebpackConfig, options);
        const html = await pagerender.renderPage(
          options.siteData.pages[0],
          true /* only render html*/
        );
        expect(html).toMatchSnapshot();
      })
    );
  });
});
