const prepare = require('../../prepare/index');
const fs = require('fs-extra');
const { getSourceDirs } = require('@rcpress/test-util');
const getConfig = require('../../commands/ssr/getConfig');
const { Helmet } = require('react-helmet');
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
    const { getPageRender } = require('../../commands/ssr');
    await Promise.all(
      getSourceDirs(__dirname).map(async ({ name, docsPath, docsTempPath }) => {
        await fs.ensureDir(docsTempPath);
        const [ssrConfig, spaConfig, options] = await getConfig(docsPath, {}, true);
        const pagerender = await getPageRender(ssrConfig, spaConfig, options);
        const html = await pagerender.renderPage(
          options.siteData.pages[0],
          true /* only render html*/
        );
        expect(html).toMatchSnapshot();
      })
    );
  });
});
