const path = require('path');
const fs = require('fs-extra');
const prepare = require('../../prepare/index');
const { getSourceDirs } = require('@rcpress/test-util');

describe('App', () => {
  test('should not throw error', async () => {
    await Promise.all(
      getSourceDirs(__dirname).map(async ({ name, docsPath, docsTempPath }) => {
        await fs.ensureDir(docsTempPath);
        const option = await prepare(docsPath);
        expect(option.sourceDir).toBe(docsPath);
      })
    );
  });
});
