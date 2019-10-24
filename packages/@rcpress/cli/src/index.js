const chalk = require('chalk');
const semver = require('semver');
const {
  engines: { node: requiredVersion },
  version
} = require('../package.json');
const path = require('path');
const { spa, ssr, eject } = require('@rcpress/core/lib/node');
const { logger } = require('@rcpress/util');

if (!semver.satisfies(process.version, requiredVersion)) {
  logger.error(
    `\n[rcpress] minimum Node version not met:` +
      `\nYou are using Node ${process.version}, but VuePress ` +
      `requires Node ${requiredVersion}.\nPlease upgrade your Node version.\n`
  );

  process.exit(1);
}

const program = require('commander');

program.version(version).usage('<command> [options]');

program
  .command('dev [targetDir]')
  .description('start a development singe-page-app server')
  .option('-p, --port <port>', 'use specified port (default: 8080)')
  .option('-h, --host <host>', 'use specified host (default: 0.0.0.0)')
  .option('--debug', 'start development server in debug mode')
  .action((dir = 'docs', { host, port, debug }) => {
    wrapCommand(spa)(path.resolve(dir), {
      host,
      port,
      debug
    });
  });

program
  .command('build [targetDir]')
  .description('build dir as singe-page-app static site')
  .option('-d, --dest <outDir>', 'specify build output dir (default: .rcpress/dist)')
  .option('--debug', 'build in development mode for debugging')
  .action((dir = 'docs', { debug, dest }) => {
    const outDir = dest ? path.resolve(dest) : null;
    wrapCommand(spa)(
      path.resolve(dir),
      {
        debug,
        outDir
      },
      true /* is production */
    );
  });

program
  .command('serve [targetDir]')
  .description('start a development server-side-render server')
  .option('-p, --port <port>', 'use specified port (default: 8080)')
  .option('-h, --host <host>', 'use specified host (default: 0.0.0.0)')
  .option('--debug', 'start development server in debug mode')
  .action((dir = 'docs', { host, port, debug }) => {
    wrapCommand(ssr)(path.resolve(dir), {
      host,
      port,
      debug
    });
  });

program
  .command('generate [targetDir]')
  .description('generate static html files from server side render.')
  .option('-d, --dest <outDir>', 'specify build output dir (default: .rcpress/dist)')
  .option('--debug', 'build in development mode for debugging')
  .action((dir = 'docs', { dest, debug }) => {
    wrapCommand(ssr)(
      path.resolve(dir),
      {
        dest,
        debug
      },
      true /* is production */
    );
  });

program
  .command('eject [targetDir]')
  .description('copy the default theme into .rcpress/theme for customization.')
  .action((dir = '.') => {
    wrapCommand(eject)(path.resolve(dir));
  });

// output help information on unknown commands
program.arguments('<command>').action(cmd => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
});

// add some useful info on help
program.on('--help', () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan(`rcpress <command> --help`)} for detailed usage of given command.`
  );
  console.log();
});

program.commands.forEach(c => c.on('--help', () => console.log()));

// enhance common error messages
const enhanceErrorMessages = (methodName, log) => {
  program.Command.prototype[methodName] = function(...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return;
    }
    this.outputHelp();
    console.log(`  ` + chalk.red(log(...args)));
    console.log();
    process.exit(1);
  };
};

enhanceErrorMessages('missingArgument', argName => {
  return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`;
});

enhanceErrorMessages('unknownOption', optionName => {
  return `Unknown option ${chalk.yellow(optionName)}.`;
});

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
  return (
    `Missing required argument for option ${chalk.yellow(option.flags)}` +
    (flag ? `, got ${chalk.yellow(flag)}` : ``)
  );
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

function wrapCommand(fn) {
  return (...args) => {
    return fn(...args).catch(err => {
      logger.error(err.stack);
      process.exitCode = 1;
    });
  };
}
