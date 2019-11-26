const path = require('path');
const fs = require('fs-extra');
const { getSourceDirs } = require('@rcpress/test-util');
const spa = require('../../commands/spa');
const ssr = require('../../commands/ssr');

describe('Commands', () => {
  test('dev', async () => {
    await Promise.all(
      getSourceDirs(__dirname).map(async ({ name, docsPath, docsTempPath }) => {
        await fs.ensureDir(docsTempPath);
        expect(() => {
          spa(docsPath);
        }).not.toThrow();
      })
    );
  });

  test('dev-prod', async () => {
    await Promise.all(
      getSourceDirs(__dirname).map(async ({ name, docsPath, docsTempPath }) => {
        await fs.ensureDir(docsTempPath);
        expect(() => {
          spa(docsPath, {}, true);
        }).not.toThrow();
      })
    );
  });

  test('ssr', async () => {
    await Promise.all(
      getSourceDirs(__dirname).map(async ({ name, docsPath, docsTempPath }) => {
        await fs.ensureDir(docsTempPath);
        expect(() => {
          ssr(docsPath);
        }).not.toThrow();
      })
    );
  });

  test('ssr-prod', async () => {
    await Promise.all(
      getSourceDirs(__dirname).map(async ({ name, docsPath, docsTempPath }) => {
        await fs.ensureDir(docsTempPath);
        expect(() => {
          ssr(docsPath, {}, true);
        }).not.toThrow();
      })
    );
  });
});
