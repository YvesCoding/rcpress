const bundleLess = require('./build/buildLess');
const buildVars = require('./build/buildVars');
const path = require('path');
const { fs } = require('@rcpress/util');

function addToMainChunk(compilation, fileName, fileContent) {
  compilation.assets[fileName] = {
    source: function() {
      return fileContent;
    },
    size: function() {
      return fileContent.length;
    }
  };

  const appChunk = compilation.chunks.find(item => item.name === 'app');
  if (appChunk) {
    appChunk.files.push(fileName);
  }
}

const getFile = relatePath => fs.readFileSync(path.resolve(__dirname, relatePath), 'utf8');

class WebpackThemePlugin {
  apply(compiler) {
    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.emit.tapAsync('WebpackThemePlugin', (compilation, cb) => {
      // Create a header string for the generated file:
      if (this.isBunding) {
        cb();
        return;
      }

      this.isBunding = true;
      bundleLess().then(() => {
        buildVars();

        const lessStyle = getFile('./stylesheet/antd.less');
        const less = getFile('./assets/js/less.min.js');
        // // Loop through all compiled assets,
        // // adding a new line item for each filename.
        // for (let filename in compilation.assets) {
        //   filelist += '- ' + filename + '\n';
        // }

        // filelist += '`)';

        addToMainChunk(compilation, 'change-theme.less', lessStyle);
        addToMainChunk(compilation, 'less.min.js', less);

        cb();
      });
    });
  }
}

module.exports = WebpackThemePlugin;
