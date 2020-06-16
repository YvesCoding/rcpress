'use strict';

/**
 * Module dependencies.
 */

const Option = require('../abstract/Option');

// /**
//  * modifyTemplate option.
//  */

// function insertHead(inserted, tmpl) {
//   let headEndIndex = tmpl.indexOf('</head>');
//   tmpl.splice(headEndIndex, 0, inserted);
//   return tmpl;
// }

module.exports = class InjectTemplateOption extends Option {
  async apply(ctx) {
    super.syncApply();

    const vals = this.appliedValues;
    let heads = '';
    vals.forEach(val => {
      const { head } = val;
      heads += head;
    });

    ctx.setTmplArgs({ head: heads });
  }
};
