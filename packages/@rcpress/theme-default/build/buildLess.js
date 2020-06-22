const bundle = require('less-bundle-promise');
const path = require('path');

function resolve(name) {
  return path.resolve(__dirname, `../stylesheet/${name}.less`);
}
module.exports = async function buildLess() {
  await bundle({
    src: resolve('app'),
    dest: resolve('antd'),
    writeFile: true
  });
};
