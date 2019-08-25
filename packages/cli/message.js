const chalk = require('chalk');

var message = {
  warn(...args) {
    return chalk.keyword('orange').apply(null, args);
  },
  error(...args) {
    return chalk.red.apply(null, args);
  },
  keyword(...args) {
    return chalk.hex('#29CDFF').apply(null, args);
  },
  tip(...args) {
    return chalk.green.apply(null, args);
  }
};

module.exports = message;
