const fs = require('fs-extra');
const App = require('../../app');
const { getSourceDirs } = require('@rcpress/test-util');

describe('App', () => {
  test('should not throw error', async () => {
    await Promise.all(
      getSourceDirs(__dirname).map(async ({ name, docsPath, docsTempPath }) => {
        await fs.ensureDir(docsTempPath);
        const app = new App(docsPath);
        await app.prepare();
        expect(app.options.sourceDir).toBe(docsPath);
      })
    );
  });
});
