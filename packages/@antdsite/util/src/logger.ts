const chalk = require('chalk');

interface LoggerFunction {
  (msg: string, log: boolean): string | void;
}

interface Logger {
  success: LoggerFunction;
  error: LoggerFunction;
  warn: LoggerFunction;
  tip: LoggerFunction;
  wait: LoggerFunction;
}

const logger: Logger = {} as Logger;

type LogTypes = {
  [key in keyof Logger]: {
    color: string;
    label: string;
  }
};

const logTypes: LogTypes = {
  success: {
    color: 'green',
    label: 'DONE'
  },
  error: {
    color: 'red',
    label: 'FAIL'
  },
  warn: {
    color: 'yellow',
    label: 'WARN'
  },
  tip: {
    color: 'cyan',
    label: 'TIP'
  },
  wait: {
    color: 'blue',
    label: 'WAIT'
  }
};

const getLoggerFn: (color: string, label: string) => LoggerFunction = (
  color: string,
  label: string
) => (msg: string, log = true) => {
  let newLine = false;
  if (msg.startsWith('\n')) {
    if (log) msg = msg.slice(1);
    newLine = true;
  }
  msg = chalk.reset.inverse.bold[color](` ${label} `) + ' ' + msg;
  if (log) {
    console.log(newLine ? '\n' + msg : msg);
  } else {
    return msg;
  }
};

let type: keyof Logger;
for (type in logTypes) {
  const { color, label } = logTypes[type];
  logger[type] = getLoggerFn(color, label);
}

module.exports = logger;
module.exports.getLoggerFn = getLoggerFn;
