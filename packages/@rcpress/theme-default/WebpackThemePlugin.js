class WebpackThemePlugin {
  apply(compiler) {
    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.emit.tapAsync('WebpackThemePlugin', (compilation, callback) => {
      // Create a header string for the generated file:
      let filelist = '.body{bg:red}';

      // // Loop through all compiled assets,
      // // adding a new line item for each filename.
      // for (let filename in compilation.assets) {
      //   filelist += '- ' + filename + '\n';
      // }

      // filelist += '`)';

      // Insert this list into the webpack build as a new file asset:
      compilation.assets['filelist.less'] = {
        source: function() {
          return filelist;
        },
        size: function() {
          return filelist.length;
        }
      };

      const appChunk = compilation.chunks.find(item => item.name === 'app');
      if (appChunk) {
        appChunk.files.push('filelist.less');
      }

      callback();
    });
  }
}

module.exports = WebpackThemePlugin;
