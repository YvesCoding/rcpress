const fs = require('fs');
// const readline = require("readline");
const vars = require('../vars');
const lessToJS = require('less-vars-to-js');
const path = require('path');

module.exports = function buildVals() {
  // Where your antd-custom.less file lives
  const varsObj = lessToJS(
    fs.readFileSync(require.resolve('antd/lib/style/themes/default.less'), 'utf8')
  );

  // const rl = readline.createInterface({
  //   input: fs.createReadStream(
  //     "./node_modules/antd/lib/style/themes/default.less"
  //   ),
  //   crlfDelay: Infinity,
  // });

  // rl.on("line", (line) => {
  //   // console.log(line);
  //   if (line.startsWith("@")) {
  //     const [name, value] = line.split(":");
  //     if (name && value) {
  //       if (name === "@input-padding-vertical-base") {
  //         debugger;
  //       }
  //       const temp = value.split("//")[0]; // 去掉行尾注释
  //       varsObj[name] = temp.replace(";", "").trimLeft();
  //     }
  //   }
  // });

  vars.forEach(group => {
    group.children.forEach(item => {
      const value = varsObj[item.name];
      if (value) {
        item.value = value;
      }
    });

    fs.writeFileSync(
      path.resolve(__dirname, '../vars.json'),
      JSON.stringify(vars, null, 2),
      'utf8'
    );
  });
};
