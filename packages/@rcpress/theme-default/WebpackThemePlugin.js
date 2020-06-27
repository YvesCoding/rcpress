const bundleLess = require('./build/buildLess');
const buildVars = require('./build/buildVars');
const path = require('path');
const { fs } = require('@rcpress/util');
class WebpackThemePlugin {
  apply(compiler) {
    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.emit.tapAsync('WebpackThemePlugin', (compilation, cb) => {
      // Create a header string for the generated file:

      bundleLess().then(() => {
        buildVars();

        let filelist = fs.readFileSync(path.resolve(__dirname, './stylesheet/antd.less'), 'utf8');

        // // Loop through all compiled assets,
        // // adding a new line item for each filename.
        // for (let filename in compilation.assets) {
        //   filelist += '- ' + filename + '\n';
        // }

        // filelist += '`)';

        // Insert this list into the webpack build as a new file asset:
        compilation.assets['change-theme.less'] = {
          source: function() {
            return filelist;
          },
          size: function() {
            return filelist.length;
          }
        };

        const appChunk = compilation.chunks.find(item => item.name === 'app');
        if (appChunk) {
          appChunk.files.push('change-theme.less');
        }

        cb();
      });
    });
  }
}

module.exports = WebpackThemePlugin;
