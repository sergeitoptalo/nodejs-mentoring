import chalk from 'chalk';
import Parser from './argumentsParser';
import { config } from './config/optionsConfig';
import { IParsedArgs } from './models';

const getArgs = (argv: string[]) => {
    return argv.slice(2);
};

let args: IParsedArgs = new Parser(getArgs(process.argv)).parseArguments();

if (args.errors) {
    console.log(chalk.bgRed(args.errors.join('\n')));
} else {
    config.action.handler[args.action](args.text || args.file || args.path);
}

if (args.showHelp) {
    console.table(['reverse', 'reverse'], ['action', 'value']);
}
