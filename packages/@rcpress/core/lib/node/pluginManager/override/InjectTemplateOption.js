'use strict';

/**
 * Module dependencies.
 */

const AsyncOption = require('../abstract/AsyncOption');

// /**
//  * modifyTemplate option.
//  */

// function insertHead(inserted, tmpl) {
//   let headEndIndex = tmpl.indexOf('</head>');
//   tmpl.splice(headEndIndex, 0, inserted);
//   return tmpl;
// }

module.exports = class InjectTemplateOption extends AsyncOption {
  async apply(ctx) {
    await super.asyncApply(ctx);

    const vals = this.appliedValues;
    const res = {};
    vals.forEach(val => {
      Object.keys(val).forEach(key => {
        res[key] || (res[key] = '');
        res[key] += val[key];
      });
    });

    ctx.setTmplArgs(res);
  }
};
